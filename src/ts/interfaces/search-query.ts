export interface SearchQuery {
  query(searchTerm: string): Promise<any>;
}
