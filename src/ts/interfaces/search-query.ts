export interface SearchQuery {
  query(searchStatus: string): Promise<any>;
}
