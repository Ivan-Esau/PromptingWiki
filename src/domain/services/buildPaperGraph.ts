import type { GraphEdge, GraphNode, PaperGraph } from '../models/graph';
import type { Paper, PaperTopic } from '../models/paper';

function createCitationEdges(papers: Paper[], paperIds: Set<string>): GraphEdge[] {
  const edges: GraphEdge[] = [];

  for (const paper of papers) {
    for (const referenceId of paper.references) {
      if (!paperIds.has(referenceId) || referenceId === paper.id) {
        continue;
      }

      edges.push({
        sourceId: paper.id,
        targetId: referenceId,
        kind: 'cites',
        weight: 1
      });
    }
  }

  return edges;
}

function sharedTopics(left: Paper, right: Paper): PaperTopic[] {
  const rightTopics = new Set(right.topics);
  return left.topics.filter((topic) => rightTopics.has(topic));
}

function createTopicOverlapEdges(papers: Paper[]): GraphEdge[] {
  const edges: GraphEdge[] = [];
  const seen = new Set<string>();

  for (let index = 0; index < papers.length; index += 1) {
    const left = papers[index];

    for (let inner = index + 1; inner < papers.length; inner += 1) {
      const right = papers[inner];
      const overlap = sharedTopics(left, right);
      if (overlap.length === 0) {
        continue;
      }

      const source = left.year > right.year ? left : right;
      const target = source.id === left.id ? right : left;
      const key = `${source.id}::${target.id}`;

      if (seen.has(key)) {
        continue;
      }

      seen.add(key);
      edges.push({
        sourceId: source.id,
        targetId: target.id,
        kind: 'topic-overlap',
        weight: overlap.length,
        sharedTopics: overlap
      });
    }
  }

  return edges;
}

function normalizeScores(nodes: GraphNode[]): GraphNode[] {
  const maxInfluence = Math.max(...nodes.map((node) => node.influenceScore), 1);
  const maxOrigin = Math.max(...nodes.map((node) => node.originScore), 1);

  return nodes.map((node) => ({
    ...node,
    influenceScore: Number((node.influenceScore / maxInfluence).toFixed(3)),
    originScore: Number((node.originScore / maxOrigin).toFixed(3))
  }));
}

export function createPaperGraph(papers: Paper[]): PaperGraph {
  const paperById = new Map(papers.map((paper) => [paper.id, paper]));
  const paperIds = new Set(paperById.keys());
  const citationEdges = createCitationEdges(papers, paperIds);
  const topicEdges = createTopicOverlapEdges(papers);

  const inboundCitationById = new Map<string, string[]>();
  const outboundCitationById = new Map<string, string[]>();

  for (const paper of papers) {
    inboundCitationById.set(paper.id, []);
    outboundCitationById.set(paper.id, []);
  }

  for (const edge of citationEdges) {
    inboundCitationById.get(edge.targetId)?.push(edge.sourceId);
    outboundCitationById.get(edge.sourceId)?.push(edge.targetId);
  }

  const minYear = Math.min(...papers.map((paper) => paper.year));
  const maxYear = Math.max(...papers.map((paper) => paper.year));
  const yearRange = Math.max(maxYear - minYear, 1);

  const rawNodes: GraphNode[] = papers.map((paper) => {
    const inbound = inboundCitationById.get(paper.id)?.length ?? 0;
    const outbound = outboundCitationById.get(paper.id)?.length ?? 0;
    const ageBoost = (maxYear - paper.year) / yearRange;
    const influenceScore = inbound * 0.75 + outbound * 0.2 + ageBoost * 0.05;
    const originScore = ageBoost * 0.8 + Math.min(outbound / 4, 1) * 0.2;

    return {
      paper,
      inCorpusCitations: inbound,
      outCorpusCitations: outbound,
      influenceScore,
      originScore
    };
  });

  const nodes = normalizeScores(rawNodes);
  const nodeById = new Map(nodes.map((node) => [node.paper.id, node]));

  return {
    nodes,
    edges: [...citationEdges, ...topicEdges],
    nodeById,
    inboundCitationById,
    outboundCitationById
  };
}
