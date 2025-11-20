import { z } from 'zod';
import {
  getQmetryLinkedTestCases,
  getQmetryLinkedDefects,
} from '../api/qmetry-test-cycle-executions.js';
import {
  GetLinkedTestCasesParams,
  GetDefectsParams,
} from '../interfaces/qmetry-test-cycle-executions.js';
import { ToolDefinition } from '../interfaces/index.js';

export const testCycleExecutionTools: Array<ToolDefinition> = [
  {
    name: 'get-qmetry-test-cycle-linked-test-cases',
    definition: {
      title: 'Get linked Test Cases of Test Cycle',
      description:
        'Get test cases that are linked to a specific test cycle with pagination and filtering support',
      inputSchema: {
        id: z
          .string()
          .describe('Test Cycle Id - Refer id from Search Test Cycles'),
        startAt: z.number().default(0).describe('Default 0').optional(),
        maxResults: z
          .number()
          .default(100)
          .describe('Default 100, Max 100')
          .optional(),
        fields: z
          .string()
          .describe('Comma separated field names to be fetched')
          .default(
            'id, key, summary, description, executionResult, status, priority, environment'
          )
          .optional(),
        sort: z
          .string()
          .describe('Pattern fieldName:Order example id:asc')
          .default('key:asc')
          .optional(),
        filter: z
          .record(z.string(), z.unknown())
          .describe('Filter by fields to filter search results')
          .optional(),
      },
    },
    handler: async (params: GetLinkedTestCasesParams) => {
      const result = await getQmetryLinkedTestCases(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'get-qmetry-test-cycle-linked-defects',
    definition: {
      title: 'Get Defects linked on Test Cycle executions',
      description:
        'Get all defects linked to test cycle executions with pagination and filtering support',
      inputSchema: {
        id: z
          .string()
          .describe('Refer keyId from the response of API "Get Test Cycle"'),
        startAt: z.number().describe('Refer Parameters').optional(),
        maxResults: z.number().describe('Refer Parameters').optional(),
        fields: z.string().describe('Refer Parameters').optional(),
        sort: z.string().describe('Refer Parameters').optional(),
        filter: z
          .record(z.string(), z.unknown())
          .default({})
          .describe(
            'Filter defects using fields: searchText (text in summary/issue key), status (defect status name), priority (defect priority name), testCaseKey (from Search Test Cases), environment (from Get environment), executionResult (from Get execution result), build (execution build name), removeDuplicates (true to get unique defects), linkedBetweenDates (two comma separated dates in dd/MM/yyyy,dd/MM/yyyy format), executionLevel (TEST_STEP_EXECUTION, TEST_CASE_EXECUTION, ALL)'
          ),
      },
    },
    handler: async (params: GetDefectsParams) => {
      const result = await getQmetryLinkedDefects(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
