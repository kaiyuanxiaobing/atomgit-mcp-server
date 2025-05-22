import { z } from 'zod';
import { atomGitRequest } from "../common/utils.js";

// Schemas for input validation
export const CreatePullRequestSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  body: z.object({
    title: z.string(), // Pull request title
    body: z.string(),  // Pull request description
    head: z.string(),  // Source branch
    base: z.string(),  // Target branch
    draft: z.boolean().default(false), // Draft status
  }),
});

export const GetPullRequestDetailsSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  pull_number: z.number(),
});

export const CreatePullRequestCommentSchema = z.object({
  repoOwner: z.string(),
  repo: z.string(),
  pull_number: z.number(),
  body: z.string(),
});

export const CreatePullRequestReplySchema = z.object({
  owner: z.string(),
  repo: z.string(),
  pull_number: z.number(),
  comment_id: z.string(),
  body: z.string(),
});

export const GetPullRequestCommentSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  pull_number: z.number(),
  comment_id: z.number(),
});

export const ListPullRequestCommentsSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  pull_number: z.number(),
  page: z.number().optional(),
  per_page: z.number().optional(),
});

// API implementations
export async function createPullRequest(
  owner: string,
  repo: string,
  body: { title: string; body: string; head: string; base: string; draft: boolean }
) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/pulls`,
    {
      method: "POST",
      body,
    }
  );
}

export async function getPullRequestDetails(owner: string, repo: string, pull_number: number) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/pulls/${encodeURIComponent(pull_number)}`,
    {
      method: "GET",
    }
  );
}

export async function createPullRequestComment(repoOwner: string, repo: string, pull_number: number, body: string) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(repoOwner)}/${encodeURIComponent(repo)}/pulls/${encodeURIComponent(pull_number)}/comments`,
    {
      method: "POST",
      body: { body },
    }
  );
}

export async function createPullRequestReply(owner: string, repo: string, pull_number: number, comment_id: string, body: string) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/pulls/${encodeURIComponent(pull_number)}/comments/${encodeURIComponent(comment_id)}/replies`,
    {
      method: "POST",
      body,
    }
  );
}

export async function getPullRequestComment(owner: string, repo: string, pull_number: number, comment_id: number) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/pulls/${encodeURIComponent(pull_number)}/comments/${encodeURIComponent(comment_id)}`,
    {
      method: "GET",
    }
  );
}

export async function listPullRequestComments(owner: string, repo: string, pull_number: number, page?: number, per_page?: number) {
  const query = new URLSearchParams();
  if (page) query.append("page", page.toString());
  if (per_page) query.append("per_page", per_page.toString());

  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/pulls/${encodeURIComponent(pull_number)}/comments?${query.toString()}`,
    {
      method: "GET",
    }
  );
}
