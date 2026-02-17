export interface Tree {
  id: string;
  name: string;
  id_parent: string;
  children?: Tree[];
  error?: string;
}