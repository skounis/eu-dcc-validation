/**
 * Tree data with nested structure.
 * Each node has a title and an optional list of children.
 */
export interface TreeNode {
  title: string;
  children?: TreeNode[];
}

/** Flat node with expandable and level information */
export interface FlatNode {
  expandable: boolean;
  title: string;
  level: number;
}