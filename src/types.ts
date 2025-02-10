export interface MindMapNode {
  id: string;
  content: string;
  children: string[];
  parent: string | null;
}

export interface Position {
  x: number;
  y: number;
}

export interface NodePosition {
  [key: string]: Position;
} 