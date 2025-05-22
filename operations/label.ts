import { z } from "zod";
import { atomGitRequest } from "../common/utils.js";

// Label-related Schema definitions
export const CreateLabelSchema = z.object({
  owner: z.string().describe("Repository owner, typically referred to as 'username'. Case-insensitive."),
  repo: z.string().describe("Repository name. Case-insensitive."),
  name: z.string().describe("Label name"),
  color: z.string().describe("Label color. A 6-character string, e.g: #ED4014"),
  description: z.string().optional().describe("Label description"),
});

export const GetLabelsSchema = z.object({
  owner: z.string().describe("Repository owner, typically referred to as 'username'. Case-insensitive."),
  repo: z.string().describe("Repository name. Case-insensitive."),
});

export const CreateIssueLabelsSchema = z.object({
  owner: z.string().describe("Repository owner, typically referred to as 'username'. Case-insensitive."),
  repo: z.string().describe("Repository name. Case-insensitive."),
  issue_number: z.number().describe("Issue number"),
  labels: z.array(z.string()).describe("Array of label names"),
});

export const GetIssueLabelsSchema = z.object({
  owner: z.string().describe("Repository owner, typically referred to as 'username'. Case-insensitive."),
  repo: z.string().describe("Repository name. Case-insensitive."),
  issue_number: z.number().describe("Issue number"),
});

export const DeleteIssueLabelSchema = z.object({
  owner: z.string().describe("Repository owner, typically referred to as 'username'. Case-insensitive."),
  repo: z.string().describe("Repository name. Case-insensitive."),
  issue_number: z.number().describe("Issue number"),
  name: z.string().describe("Label name"),
});

export const GetLabelByNameSchema = z.object({
  owner: z.string().describe("Repository owner, typically referred to as 'username'. Case-insensitive."),
  repo: z.string().describe("Repository name. Case-insensitive."),
  name: z.string().describe("Label name"),
});

/**
 * Create a repository label
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param name - Label name
 * @param color - Label color, a 6-character string, e.g: #ED4014
 * @param description - Label description (optional)
 */
export async function createLabel(
  owner: string,
  repo: string,
  name: string,
  color: string,
  description?: string
) {
  // ① Create URLSearchParams
  const params = new URLSearchParams({
    name,
    color,
  });
  if (description) {
    params.append('description', description);
  }

  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/labels`,
    {
      method: "POST",
      body: params.toString(),
    }
  );
}

/**
 * Get all labels for a repository
 * @param owner - Repository owner
 * @param repo - Repository name
 */
export async function getLabels(
  owner: string,
  repo: string
) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/labels`,
    {
      method: "GET",
    }
  );
}

/**
 * Create issue labels
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param issue_number - Issue number
 * @param labels - Array of label names
 */
export async function createIssueLabels(
  owner: string,
  repo: string,
  issue_number: number,
  labels: string[]
) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues/${encodeURIComponent(issue_number)}/labels`,
    {
      method: "POST",
      body: labels,
    }
  );
}

/**
 * Get all labels for an issue
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param issue_number - Issue number
 */
export async function getIssueLabels(
  owner: string,
  repo: string,
  issue_number: number
) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues/${encodeURIComponent(issue_number)}/labels`,
    {
      method: "GET",
    }
  );
}

/**
 * Delete issue label
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param issue_number - Issue number
 * @param name - Label name
 */
export async function deleteIssueLabel(
  owner: string,
  repo: string,
  issue_number: number,
  name: string
) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues/${encodeURIComponent(issue_number)}/labels/${encodeURIComponent(name)}`,
    {
      method: "DELETE",
    }
  );
}

/**
 * Get a single label by name
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param name - Label name
 */
export async function getLabelByName(
  owner: string,
  repo: string,
  name: string
) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/labels/${encodeURIComponent(name)}`,
    {
      method: "GET",
    }
  );
}
