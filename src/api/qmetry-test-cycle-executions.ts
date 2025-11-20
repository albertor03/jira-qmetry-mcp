import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  GetLinkedTestCasesParams,
  GetDefectsParams,
} from '../interfaces/qmetry-test-cycle-executions.js';
import { logger } from '../utils/logger.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

/**
 * Get linked test cases of a test cycle
 * @param params The parameters for getting linked test cases
 * @returns {Promise<{ content: [{ type: string; text: string }] }>} The response from the API
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
    const url = new URL(
      `${qmetry_api_url}testcycles/${params.id}/testcases/search`
    );

    // Add query parameters if they exist
    if (params.startAt !== undefined) {
      url.searchParams.append('startAt', params.startAt.toString());
    }
    if (params.maxResults !== undefined) {
      url.searchParams.append('maxResults', params.maxResults.toString());
    }
    if (params.fields) {
      url.searchParams.append('fields', params.fields);
    }
    if (params.sort) {
      url.searchParams.append('sort', params.sort);
    }

    const body = {
      filter: params.filter,
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
        `Error getting linked test cases: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error(
      'Error in getQmetryLinkedTestCases',
      error,
      'getQmetryLinkedTestCases'
    );
    throw error;
  }
}

/**
 * Get defects linked on test cycle executions
 * @param params The parameters for getting linked defects
 * @returns {Promise<{ content: [{ type: string; text: string }] }>} The response from the API
 */
export async function getQmetryLinkedDefects(
  params: GetDefectsParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}testcycles/${params.id}/defects/search`
    );

    // Add query parameters if they exist
    if (params.startAt !== undefined) {
      url.searchParams.append('startAt', params.startAt.toString());
    }
    if (params.maxResults !== undefined) {
      url.searchParams.append('maxResults', params.maxResults.toString());
    }
    if (params.fields) {
      url.searchParams.append('fields', params.fields);
    }
    if (params.sort) {
      url.searchParams.append('sort', params.sort);
    }

    const body = {
      filter: params.filter,
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
        `Error getting linked defects: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error(
      'Error in getQmetryLinkedDefects',
      error,
      'getQmetryLinkedDefects'
    );
    throw error;
  }
}
