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

/**
 * Interface for getting defects linked on test cycle executions.
 * @interface GetDefectsParams
 * @property {string} id - Refer keyId from the response of API "Get Test Cycle".
 * @property {number} [startAt] - Refer Parameters.
 * @property {number} [maxResults] - Refer Parameters.
 * @property {string} [fields] - Refer Parameters.
 * @property {string} [sort] - Refer Parameters.
 * @property {Record<string, unknown>} filter - User can filter data using following fields.
 */
export interface GetDefectsParams {
  id: string;
  startAt?: number;
  maxResults?: number;
  fields?: string;
  sort?: string;
  filter: Record<string, unknown>;
}
