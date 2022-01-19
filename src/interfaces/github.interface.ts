export interface RepositoryContent {
  sha: string;
  url: string;
  tree: Array<RepositoryContentItem>;
  truncated: boolean;
}

export interface RepositoryContentItem {
  path: string;
  mode: string;
  type: string;
  size: number;
  url: string;
}

export interface RepositoryNode {
  sha: string;
  node_id: string;
  size: number;
  content: string;
  encoding: string;
}