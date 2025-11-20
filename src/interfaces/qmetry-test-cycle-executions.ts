/**
 * Interface for getting linked test cases of a test cycle.
 * @interface GetLinkedTestCasesParams
 * @property {string} id - Test Cycle Id - Refer id from Search Test Cycles.
 * @property {number} [startAt] - Default 0.
 * @property {number} [maxResults] - Default 0, Max 100.
 * @property {string} [fields] - Comma separated field names to be fetched.
 * @property {string} [sort] - Pattern fieldName:Order example id:asc.
 * @property {Record<string, unknown>} filter - Filter by fields to filter search results.
 */
export interface GetLinkedTestCasesParams {
  id: string;
  startAt?: number;
  maxResults?: number;
  fields?: string;
  sort?: string;
  filter: Record<string, unknown>;
}
