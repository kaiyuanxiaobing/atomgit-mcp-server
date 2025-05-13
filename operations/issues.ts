import { z } from "zod";
import { atomGitRequest } from "../common/utils.js";

export const CreateIssueOptionsSchema = z.object({
  title: z.string().describe("issue 标题"),
  body: z.string().describe("issue 内容（使用MD格式编写内容）"),
  assignees: z.array(z.string()).optional(),
  milestone: z.number().optional(),
  labels: z.array(z.string()).optional(),
});

export const CreateIssueSchema = z.object({
  owner: z.string().describe("代码仓库的所有者，一般称之为'用户名（owner）’。该名称不区分大小写。"),
  repo: z.string().describe("代码仓库的名称。该名称不区分大小写。"),
  ...CreateIssueOptionsSchema.shape,
});


export const AssignIssueSchema = z.object({
  owner: z.string().describe("代码仓库的所有者"),
  repo: z.string().describe("代码仓库的名称"),
  issue_number: z.number().describe("issue 的编号"),
  assignee: z.string().describe("要分配的负责人列表"),
});

export const CreateIssueCommentSchema = z.object({
  owner: z.string().describe("代码仓库的所有者，一般称之为'用户名（owner）’。该名称不区分大小写。"),
  repo: z.string().describe("代码仓库的名称。该名称不区分大小写。"),
  issue_number: z.number().describe("issue 的编号"),
  body: z.string().describe("issue 评论内容（使用MD格式编写内容）"),
});


export const DeleteIssueCommentSchema = z.object({
  owner: z.string().describe("代码仓库的所有者"),
  repo: z.string().describe("代码仓库的名称"),
  comment_id: z.number().describe("评论的ID"),
});

export const GetIssueCommentSchema = z.object({
  owner: z.string().describe("代码仓库的所有者"),
  repo: z.string().describe("代码仓库的名称"),
  comment_id: z.number().describe("评论的ID"),
});

export const ListIssueCommentsSchema = z.object({
  owner: z.string().describe("代码仓库的所有者"),
  repo: z.string().describe("代码仓库的名称"),
  issue_number: z.number().describe("issue 的编号"),
});

export const GetIssueSchema = z.object({
  owner: z.string().describe("代码仓库的所有者"),
  repo: z.string().describe("代码仓库的名称"),
  issue_number: z.number().describe("issue 的编号"),
});

export const ListAssigneesSchema = z.object({
  owner: z.string().describe("代码仓库的所有者"),
  repo: z.string().describe("代码仓库的名称"),
});

export const CheckAssigneeSchema = z.object({
  owner: z.string().describe("代码仓库的所有者"),
  repo: z.string().describe("代码仓库的名称"),
  assignee: z.string().describe("被检查的用户名"),
});


export const ListIssuesSchema = z.object({
  owner: z.string().describe("代码仓库的所有者"),
  repo: z.string().describe("代码仓库的名称"),
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
