/**
 * Defines the parameters for searching linked test cases.
 * @interface GetLinkedTestCasesParams
 * @property {string} id - Jira Requirement Id
 * @property {string} [fields] - Fields to be fetched
 * @property {string} [sort] - Pattern fieldName:order, eg: key:asc
 * @property {number} [startAt] - default 0
 * @property {number} [maxResults] - Default 50, Max 100
 * @property {string} [filter] - Filter results by fields
 */
export interface GetLinkedTestCasesParams {
  id: string;
  fields?: string;
  sort?: string;
  startAt?: number;
  maxResults?: number;
  filter?: Record<string, unknown>;
}

/**
 * Defines the parameters for linking a requirement to a test case.
 * @interface LinkRequirementParams
 * @property {string} id - Test Case Id. Refer id from the response of API "Search Test Case".
 * @property {number} no - Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".
 * @property {number[]} requirementIds - List of JIRA Issue Id which want to link with given test case.
 */
export interface LinkRequirementParams {
  id: string;
  no: number;
  requirementIds: number[];
}

/**
 * Defines the parameters for unlinking a requirement from a test case.
 * @interface UnlinkRequirementParams
 * @property {string} id - Test Case Id. Refer id from the response of API "Search Test Case".
 * @property {number} no - Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".
 * @property {number[]} requirementIds - List of JIRA Issue Id which want to unlink from given test case.
 */
export interface UnlinkRequirementParams {
  id: string;
  no: number;
  requirementIds: number[];
}
