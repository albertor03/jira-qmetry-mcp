import { z } from 'zod';
import { ToolDefinition } from '../interfaces/index.js';
import {
  getQmetryLinkedTestCases,
  linkQmetryRequirements,
  unlinkQmetryRequirements,
} from '../api/qmetry-linked-requirements.js';
import {
  GetLinkedTestCasesParams,
  LinkRequirementParams,
  UnlinkRequirementParams,
} from '../interfaces/qmetry-linked-requirements.js';

export const linkedRequirementsTools: Array<ToolDefinition> = [
  {
    name: 'get-qmetry-linked-test-cases',
    definition: {
      title: 'Get linked test cases for a requirement',
      description:
        'Get all test cases linked to a specific requirement (Jira issue) in Qmetry',
      inputSchema: {
        id: z.string().describe('Jira Requirement Id. Example: "10000"'),
        fields: z
          .string()
          .optional()
          .default('summary,priority,status')
          .describe(
            'Fields to be fetched. Multiple comma separated values also possible. Example: "fixVersions"'
          ),
        sort: z
          .string()
          .optional()
          .describe('Pattern fieldName:order, eg: key:asc'),
        startAt: z.number().optional().describe('default 0'),
        maxResults: z.number().optional().describe('Default 50, Max 100'),
        filter: z
          .record(z.string(), z.any())
          .optional()
          .describe('Filter results by fields'),
      },
    },
    handler: async (params: GetLinkedTestCasesParams) => {
      const linkedTestCases = await getQmetryLinkedTestCases(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(linkedTestCases, null, 2) },
        ],
      };
    },
  },
  {
    name: 'link-qmetry-requirements',
    definition: {
      title: 'Link requirements to a test case',
      description:
        'Link one or more requirements (Jira issues) to a specific test case in Qmetry',
      inputSchema: {
        id: z
          .string()
          .describe(
            'The ID of the test case to link requirements to. Refer id from the response of API "Search Test Case".'
          ),
        no: z
          .number()
          .describe(
            'Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".'
          ),
        requirementIds: z
          .array(z.number())
          .describe(
            'List of JIRA Issue Id which want to link with given test case. Example: [123, 456]'
          ),
      },
    },
    handler: async (params: LinkRequirementParams) => {
      const result = await linkQmetryRequirements(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'unlink-qmetry-requirements',
    definition: {
      title: 'Unlink requirements from a test case',
      description:
        'Unlink one or more requirements (Jira issues) from a specific test case in Qmetry',
      inputSchema: {
        id: z
          .string()
          .describe(
            'The ID of the test case to unlink requirements from. Refer id from the response of API "Search Test Case".'
          ),
        no: z
          .number()
          .describe(
            'Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".'
          ),
        requirementIds: z
          .array(z.number())
          .describe(
            'List of JIRA Issue Id which want to unlink from given test case. Example: [123, 456]'
          ),
      },
    },
    handler: async (params: UnlinkRequirementParams) => {
      const result = await unlinkQmetryRequirements(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
