import fetch from 'node-fetch';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'path';
import {
  GetLinkedTestCasesParams,
  LinkRequirementParams,
  UnlinkRequirementParams,
} from '../interfaces/qmetry-linked-requirements.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

/**
 * Get linked test cases for a specific requirement in Qmetry.
 * @param params - The search parameters including requirementId and optional filters.
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function getQmetryLinkedTestCases(
  params: GetLinkedTestCasesParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const { id, fields, sort, startAt, maxResults, filter } = params;
    const url = new URL(`${qmetry_api_url}requirements/${id}/testcases`);

    // Add query parameters if provided
    if (fields !== undefined) {
      url.searchParams.append('fields', fields);
    }
    if (sort !== undefined) {
      url.searchParams.append('sort', sort);
    }
    if (startAt !== undefined) {
      url.searchParams.append('startAt', startAt.toString());
    }
    if (maxResults !== undefined) {
      url.searchParams.append('maxResults', maxResults.toString());
    }

    const requestBody = filter ? { filter } : {};

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error getting linked test cases: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in getQmetryLinkedTestCases: ${error}\n`);
    throw error;
  }
}

/**
 * Link requirements to a test case in Qmetry.
 * @param params - The parameters including testcaseId and requirementIds array.
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function linkQmetryRequirements(
  params: LinkRequirementParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const { id, no, requirementIds } = params;
    const url = new URL(
      `${qmetry_api_url}testcases/${id}/version/${no}/requirements/link`
    );

    const body = {
      filter: {
        jql: 'order by key DESC',
      },
      requirementIds,
    };

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error linking requirements: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in linkQmetryRequirements: ${error}\n`);
    throw error;
  }
}

/**
 * Unlink requirements from a test case in Qmetry.
 * @param params - The parameters including testcaseId and requirementIds array.
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function unlinkQmetryRequirements(
  params: UnlinkRequirementParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const { id, no, requirementIds } = params;
    const url = new URL(
      `${qmetry_api_url}testcases/${id}/versions/${no}/requirements/unlink`
    );

    const body = {
      unLinkAll: false,
      requirementIds,
    };

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error unlinking requirements: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in unlinkQmetryRequirements: ${error}\n`);
    throw error;
  }
}
