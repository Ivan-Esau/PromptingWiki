import { createPaperGraph } from '../../domain/services/buildPaperGraph';
import type { Paper, PaperTopic } from '../../domain/models/paper';
import type { GraphEdgeKind } from '../../domain/models/graph';

export type TopicFilter = PaperTopic | 'all';
export type RelationFilter = 'citations' | 'all';

export interface AtlasFilters {
  query: string;
  topic: TopicFilter;
  relation: RelationFilter;
  selectedPaperId?: string;
}

export interface AtlasNodeViewModel {
  id: string;
  title: string;
  year: number;
  x: number;
  y: number;
  radius: number;
  influenceScore: number;
  originScore: number;
  topics: PaperTopic[];
}

export interface AtlasEdgeViewModel {
  sourceId: string;
  targetId: string;
  kind: GraphEdgeKind;
  weight: number;
}

export interface AtlasTimelinePaper {
  id: string;
  title: string;
  venue: string;
  topics: PaperTopic[];
  influenceScore: number;
  summary: string;
}

export interface AtlasTimelineGroup {
  year: number;
  papers: AtlasTimelinePaper[];
}

export interface AtlasTopicStat {
  topic: PaperTopic;
  count: number;
}

export interface AtlasBridge {
  left: PaperTopic;
  right: PaperTopic;
  count: number;
}

export interface AtlasPaperDetail {
  id: string;
  title: string;
  year: number;
  venue: string;
  url: string;
  doi?: string;
  authors: string[];
  summary: string;
  topics: PaperTopic[];
  influenceScore: number;
  originScore: number;
  references: AtlasTimelinePaper[];
  citedBy: AtlasTimelinePaper[];
}

export interface AtlasSnapshot {
  availableTopics: AtlasTopicStat[];
  timeline: AtlasTimelineGroup[];
  graphNodes: AtlasNodeViewModel[];
  graphEdges: AtlasEdgeViewModel[];
  topicBridges: AtlasBridge[];
  selectedPaper?: AtlasPaperDetail;
  stats: {
    totalPapers: number;
    visiblePapers: number;
    citationEdges: number;
    topicEdges: number;
    yearStart: number;
    yearEnd: number;
  };
}

function matchesQuery(paper: Paper, query: string): boolean {
  if (!query) {
    return true;
  }

  const haystack = [
    paper.title,
    paper.venue,
    paper.summary,
    ...paper.authors,
    ...paper.topics
  ].join(' ').toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function matchesTopic(paper: Paper, topic: TopicFilter): boolean {
  if (topic === 'all') {
    return true;
  }

  return paper.topics.includes(topic);
}

function buildTopicStats(papers: Paper[]): AtlasTopicStat[] {
  const topicCounts = new Map<PaperTopic, number>();

  for (const paper of papers) {
    for (const topic of paper.topics) {
      topicCounts.set(topic, (topicCounts.get(topic) ?? 0) + 1);
    }
  }

  return [...topicCounts.entries()]
    .map(([topic, count]) => ({ topic, count }))
    .sort((left, right) => right.count - left.count || left.topic.localeCompare(right.topic));
}

function buildTopicBridges(papers: Paper[]): AtlasBridge[] {
  const counts = new Map<string, number>();

  for (const paper of papers) {
    const topics = [...new Set(paper.topics)].sort();
    for (let outer = 0; outer < topics.length; outer += 1) {
      for (let inner = outer + 1; inner < topics.length; inner += 1) {
        const left = topics[outer];
        const right = topics[inner];
        const key = `${left}::${right}`;
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
  }

  return [...counts.entries()]
    .map(([key, count]) => {
      const [left, right] = key.split('::') as [PaperTopic, PaperTopic];
      return { left, right, count };
    })
    .sort((left, right) => right.count - left.count || left.left.localeCompare(right.left))
    .slice(0, 8);
}

function layoutNodes(
  nodes: Array<{ id: string; year: number; influenceScore: number }>
): Map<string, { x: number; y: number; radius: number }> {
  const years = [...new Set(nodes.map((node) => node.year))].sort((left, right) => left - right);
  const yearIndexByValue = new Map(years.map((year, index) => [year, index]));
  const buckets = new Map<number, Array<{ id: string; influenceScore: number }>>();

  for (const node of nodes) {
    const bucket = buckets.get(node.year) ?? [];
    bucket.push({ id: node.id, influenceScore: node.influenceScore });
    buckets.set(node.year, bucket);
  }

  for (const bucket of buckets.values()) {
    bucket.sort((left, right) => right.influenceScore - left.influenceScore);
  }

  const width = 1120;
  const height = 560;
  const paddingX = 70;
  const paddingY = 50;
  const yearSpan = Math.max(years.length - 1, 1);
  const layout = new Map<string, { x: number; y: number; radius: number }>();

  for (const [year, bucket] of buckets.entries()) {
    const index = yearIndexByValue.get(year) ?? 0;
    const x = paddingX + (index / yearSpan) * (width - paddingX * 2);

    for (let position = 0; position < bucket.length; position += 1) {
      const item = bucket[position];
      const y = paddingY + ((position + 1) / (bucket.length + 1)) * (height - paddingY * 2);
      const radius = 8 + item.influenceScore * 10;

      layout.set(item.id, {
        x: Number(x.toFixed(1)),
        y: Number(y.toFixed(1)),
        radius: Number(radius.toFixed(2))
      });
    }
  }

  return layout;
}

function mapTimelinePaper(
  paper: Paper,
  influenceScore: number
): AtlasTimelinePaper {
  return {
    id: paper.id,
    title: paper.title,
    venue: paper.venue,
    topics: paper.topics,
    influenceScore,
    summary: paper.summary
  };
}

export function buildAtlasSnapshot(papers: Paper[], filters: AtlasFilters): AtlasSnapshot {
  const graph = createPaperGraph(papers);
  const availableTopics = buildTopicStats(papers);
  const topicBridges = buildTopicBridges(papers);
  const yearStart = Math.min(...papers.map((paper) => paper.year));
  const yearEnd = Math.max(...papers.map((paper) => paper.year));

  const visibleIds = new Set(
    papers
      .filter((paper) => matchesQuery(paper, filters.query) && matchesTopic(paper, filters.topic))
      .map((paper) => paper.id)
  );

  const visibleNodes = graph.nodes.filter((node) => visibleIds.has(node.paper.id));
  const layout = layoutNodes(
    visibleNodes.map((node) => ({
      id: node.paper.id,
      year: node.paper.year,
      influenceScore: node.influenceScore
    }))
  );

  const graphNodes: AtlasNodeViewModel[] = visibleNodes.map((node) => {
    const point = layout.get(node.paper.id);

    return {
      id: node.paper.id,
      title: node.paper.title,
      year: node.paper.year,
      x: point?.x ?? 0,
      y: point?.y ?? 0,
      radius: point?.radius ?? 8,
      influenceScore: node.influenceScore,
      originScore: node.originScore,
      topics: node.paper.topics
    };
  });

  const graphEdges = graph.edges
    .filter((edge) => visibleIds.has(edge.sourceId) && visibleIds.has(edge.targetId))
    .filter((edge) => (filters.relation === 'citations' ? edge.kind === 'cites' : true))
    .map((edge) => ({
      sourceId: edge.sourceId,
      targetId: edge.targetId,
      kind: edge.kind,
      weight: edge.weight
    }));

  const timelineByYear = new Map<number, AtlasTimelinePaper[]>();

  for (const node of visibleNodes) {
    const timelinePaper = mapTimelinePaper(node.paper, node.influenceScore);
    const group = timelineByYear.get(node.paper.year) ?? [];
    group.push(timelinePaper);
    timelineByYear.set(node.paper.year, group);
  }

  const timeline = [...timelineByYear.entries()]
    .sort((left, right) => right[0] - left[0])
    .map(([year, yearPapers]) => ({
      year,
      papers: yearPapers.sort((left, right) => right.influenceScore - left.influenceScore)
    }));

  const firstVisiblePaper = timeline[0]?.papers[0]?.id;
  const selectedPaperId =
    filters.selectedPaperId && visibleIds.has(filters.selectedPaperId)
      ? filters.selectedPaperId
      : firstVisiblePaper;

  const selectedNode = selectedPaperId ? graph.nodeById.get(selectedPaperId) : undefined;
  const selectedPaper = selectedNode?.paper;

  const references = selectedPaper
    ? selectedPaper.references
        .map((referenceId) => graph.nodeById.get(referenceId))
        .filter((node): node is NonNullable<typeof node> => Boolean(node))
        .map((node) => mapTimelinePaper(node.paper, node.influenceScore))
    : [];

  const citedBy = selectedPaper
    ? (graph.inboundCitationById.get(selectedPaper.id) ?? [])
        .map((paperId) => graph.nodeById.get(paperId))
        .filter((node): node is NonNullable<typeof node> => Boolean(node))
        .map((node) => mapTimelinePaper(node.paper, node.influenceScore))
    : [];

  const selectedPaperDetail =
    selectedNode && selectedPaper
      ? {
          id: selectedPaper.id,
          title: selectedPaper.title,
          year: selectedPaper.year,
          venue: selectedPaper.venue,
          url: selectedPaper.url,
          doi: selectedPaper.doi,
          authors: selectedPaper.authors,
          summary: selectedPaper.summary,
          topics: selectedPaper.topics,
          influenceScore: selectedNode.influenceScore,
          originScore: selectedNode.originScore,
          references,
          citedBy
        }
      : undefined;

  const citationEdges = graph.edges.filter((edge) => edge.kind === 'cites').length;
  const topicEdges = graph.edges.filter((edge) => edge.kind === 'topic-overlap').length;

  return {
    availableTopics,
    timeline,
    graphNodes,
    graphEdges,
    topicBridges,
    selectedPaper: selectedPaperDetail,
    stats: {
      totalPapers: papers.length,
      visiblePapers: visibleNodes.length,
      citationEdges,
      topicEdges,
      yearStart,
      yearEnd
    }
  };
}
