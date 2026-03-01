import type { Paper, PaperTopic } from './paper';

export type GraphEdgeKind = 'cites' | 'topic-overlap';

export interface GraphEdge {
  sourceId: string;
  targetId: string;
  kind: GraphEdgeKind;
  weight: number;
  sharedTopics?: PaperTopic[];
}

export interface GraphNode {
  paper: Paper;
  inCorpusCitations: number;
  outCorpusCitations: number;
  influenceScore: number;
  originScore: number;
}

export interface PaperGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  nodeById: Map<string, GraphNode>;
  inboundCitationById: Map<string, string[]>;
  outboundCitationById: Map<string, string[]>;
}
