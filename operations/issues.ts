import { z } from "zod";
import { atomGitRequest } from "../common/utils.js";

export const CreateIssueOptionsSchema = z.object({
  title: z.string().describe("Issue title"),
  body: z.string().describe("Issue content (in Markdown format)"),
  assignees: z.array(z.string()).optional(),
  milestone: z.number().optional(),
  labels: z.array(z.string()).optional(),
});

export const CreateIssueSchema = z.object({
  owner: z.string().describe("Repository owner, typically referred to as 'username (owner)'. Case-insensitive."),
  repo: z.string().describe("Repository name. Case-insensitive."),
  ...CreateIssueOptionsSchema.shape,
});


export const AssignIssueSchema = z.object({
  owner: z.string().describe("Repository owner"),
  repo: z.string().describe("Repository name"),
  issue_number: z.number().describe("Issue number"),
  assignee: z.string().describe("List of assignees to be assigned"),
});

export const CreateIssueCommentSchema = z.object({
  owner: z.string().describe("Repository owner, typically referred to as 'username (owner)'. Case-insensitive."),
  repo: z.string().describe("Repository name. Case-insensitive."),
  issue_number: z.number().describe("Issue number"),
  body: z.string().describe("Issue comment content (in Markdown format)"),
});


export const DeleteIssueCommentSchema = z.object({
  owner: z.string().describe("Repository owner"),
  repo: z.string().describe("Repository name"),
  comment_id: z.number().describe("Comment ID"),
});

export const GetIssueCommentSchema = z.object({
  owner: z.string().describe("Repository owner"),
  repo: z.string().describe("Repository name"),
  comment_id: z.number().describe("Comment ID"),
});

export const ListIssueCommentsSchema = z.object({
  owner: z.string().describe("Repository owner"),
  repo: z.string().describe("Repository name"),
  issue_number: z.number().describe("Issue number"),
});

export const GetIssueSchema = z.object({
  owner: z.string().describe("Repository owner"),
  repo: z.string().describe("Repository name"),
  issue_number: z.number().describe("Issue number"),
});

export const ListAssigneesSchema = z.object({
  owner: z.string().describe("Repository owner"),
  repo: z.string().describe("Repository name"),
});

export const CheckAssigneeSchema = z.object({
  owner: z.string().describe("Repository owner"),
  repo: z.string().describe("Repository name"),
  assignee: z.string().describe("Username to be checked"),
});


export const ListIssuesSchema = z.object({
  owner: z.string().describe("Repository owner"),
  repo: z.string().describe("Repository name"),
});



export async function createIssue(
  owner: string,
  repo: string,
  options: z.infer<typeof CreateIssueOptionsSchema>
) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues`,
    {
      method: "POST",
      body: options,
    },
  );
}

/**
 * Deletes a specific issue comment.
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param comment_id - ID of the comment to delete
 */
export async function deleteIssueComment(
  owner: string,
  repo: string,
  comment_id: number
) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues/comments/${encodeURIComponent(comment_id)}`,
    {
      method: "DELETE",
    }
  );
}

/**
 * Retrieves details of a specific issue comment.
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param comment_id - ID of the comment to retrieve
 */
export async function getIssueComment(
  owner: string,
  repo: string,
  comment_id: number
) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues/comments/${encodeURIComponent(comment_id)}`,
    {
      method: "GET",
    }
  );
}

/**
 * Lists all comments for a specific issue.
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param issue_number - Issue number
 */
export async function listIssueComments(
  owner: string,
  repo: string,
  issue_number: number
) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues/${encodeURIComponent(issue_number)}/comments`,
    {
      method: "GET",
    }
  );
}

/**
 * Lists all issues in a repository.
 * @param owner - Repository owner
 * @param repo - Repository name
 */
export async function listIssues(owner: string, repo: string) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues`,
    {
      method: "GET",
    }
  );
}

/**
 * Retrieves details of a specific issue.
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param issue_number - Issue number
 */
export async function getIssue(
  owner: string,
  repo: string,
  issue_number: number
) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues/${encodeURIComponent(issue_number)}`,
    {
      method: "GET",
    }
  );
}


/**
 * Sets assignees for a specific issue.
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param issue_number - Issue number
 * @param assignees - List of assignees
 */
export async function setAssignee(
  owner: string,
  repo: string,
  issue_number: number,
  assignee: string
) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues/${encodeURIComponent(issue_number)}/assignees`,
    {
      method: "POST",
      body: {
        assignee,
      },
    }
  );
}


export async function listIssueAssignees(
  owner: string,
  repo: string
) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/assignees`,
    {
      method: "GET",
    }
  );
}

export async function checkIfUserIsAssignable(
  owner: string,
  repo: string,
  assignee: string
) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/assignees/${encodeURIComponent(assignee)}`,
    {
      method: "GET",
    }
  );
}

export async function createIssueComment(
  owner: string,
  repo: string,
  issue_number: number,
  body: string
) {
  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues/${encodeURIComponent(issue_number)}/comments`,
    {
      method: "POST",
      body: {
        body
      },
    }
  );
}
