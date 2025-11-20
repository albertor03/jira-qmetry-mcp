import { z } from 'zod';
import { getQmetryLinkedTestCases } from '../api/qmetry-test-cycle-executions.js';
import { GetLinkedTestCasesParams } from '../interfaces/qmetry-test-cycle-executions.js';
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
          .record(z.unknown())
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
];
