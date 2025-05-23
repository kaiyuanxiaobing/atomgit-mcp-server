#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import fetch, { Request, Response } from 'node-fetch';

import * as repository from './operations/repository.js';
import * as issues from './operations/issues.js';
import * as pull from './operations/pull.js';
import * as branch from './operations/branch.js';
import * as label from './operations/label.js';
import * as user from './operations/user.js';


import {
  AtomGitError,
  AtomGitValidationError,
  AtomGitResourceNotFoundError,
  AtomGitAuthenticationError,
  AtomGitPermissionError,
  AtomGitRateLimitError,
  AtomGitConflictError,
  isAtomGitError,
} from './common/errors.js';
import { VERSION } from "./common/version.js";

// If fetch doesn't exist in global scope, add it
if (!globalThis.fetch) {
  globalThis.fetch = fetch as unknown as typeof global.fetch;
}

const server = new Server(
  {
    name: "atomgit-mcp-server",
    version: VERSION,
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

function formatAtomGitError(error: AtomGitError): string {
  let message = `AtomGit API Error: ${error.message}`;

  if (error instanceof AtomGitValidationError) {
    message = `Validation Error: ${error.message}`;
    if (error.response) {
      message += `\nDetails: ${JSON.stringify(error.response)}`;
    }
  } else if (error instanceof AtomGitResourceNotFoundError) {
    message = `Not Found: ${error.message}`;
  } else if (error instanceof AtomGitAuthenticationError) {
    message = `Authentication Failed: ${error.message}`;
  } else if (error instanceof AtomGitPermissionError) {
    message = `Permission Denied: ${error.message}`;
  } else if (error instanceof AtomGitRateLimitError) {
    message = `Rate Limit Exceeded: ${error.message}\nResets at: ${error.resetAt.toISOString()}`;
  } else if (error instanceof AtomGitConflictError) {
    message = `Conflict: ${error.message}`;
  }

  return message;
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // {
      //   name: "get_user_Info",
      //   description: "Get AtomGit user information for subsequent operations",
      // },
      {
        name: "get_user_repository",
        description: "Search for AtomGit user repository",
        inputSchema: zodToJsonSchema(repository.getUserRepositorySchema),
      },
      {
        name: "assign_issue",
        description: "Assign users to an issue in a AtomGit repository",
        inputSchema: zodToJsonSchema(issues.AssignIssueSchema),
      },
      {
        name: "list_repository_issues",
        description: "List issues in a AtomGit repository",
        inputSchema: zodToJsonSchema(issues.ListIssuesSchema),
      },
      {
        name: "get_issue_details",
        description: "Get details of a specific issue in a AtomGit repository",
        inputSchema: zodToJsonSchema(issues.GetIssueSchema),
      },
      {
        name: "list_issue_assignees",
        description: "List assignees for a specific issue in a AtomGit repository",
        inputSchema: zodToJsonSchema(issues.ListAssigneesSchema),
      },
      {
        name: "check_if_user_is_assignable",
        description: "Check if a user can be assigned to an issue in a AtomGit repository",
        inputSchema: zodToJsonSchema(issues.CheckAssigneeSchema),
      },
      {
        name: "get_user_repositories",
        description: "Search for AtomGit user repositories",
        inputSchema: zodToJsonSchema(repository.getUserRepositoriesSchema),
      },
      {
        name: "get_org_repositories",
        description: "Search for AtomGit org repositories",
        inputSchema: zodToJsonSchema(repository.getOrgRepositoriesSchema),
      },
      {
        name: "create_issue",
        description: "Create a new issue in a AtomGit repository",
        inputSchema: zodToJsonSchema(issues.CreateIssueSchema),
      },
      {
        name: "create_issue_comment",
        description: "Create an issue comment in a AtomGit repository issue",
        inputSchema: zodToJsonSchema(issues.CreateIssueCommentSchema),
      },

      {
        name: "create_pull_request",
        description: "Create a new pull request in a repository",
        inputSchema: zodToJsonSchema(pull.CreatePullRequestSchema),
      },
      {
        name: "get_pull_request_details",
        description: "Get details of a specific pull request",
        inputSchema: zodToJsonSchema(pull.GetPullRequestDetailsSchema),
      },
      {
        name: "create_pull_request_comment",
        description: "Create a comment on a pull request",
        inputSchema: zodToJsonSchema(pull.CreatePullRequestCommentSchema),
      },
      {
        name: "create_pull_request_reply",
        description: "Reply to a comment on a pull request",
        inputSchema: zodToJsonSchema(pull.CreatePullRequestReplySchema),
      },
      {
        name: "get_pull_request_comment",
        description: "Get details of a specific pull request comment",
        inputSchema: zodToJsonSchema(pull.GetPullRequestCommentSchema),
      },
      // {
      //   name: "list_pull_request_comments",
      //   description: "List comments on a pull request",
      //   inputSchema: zodToJsonSchema(pull.ListPullRequestCommentsSchema),
      // },
      {
        name: "list_repository_branches",
        description: "List branches in a repository",
        inputSchema: zodToJsonSchema(branch.ListBranchListSchema),
      },
      {
        name: "get_repository_branch_details",
        description: "Get details of a specific branch in a repository",
        inputSchema: zodToJsonSchema(branch.ListBranchDetailSchema),
      },
      // {
      //   name: "create_repository_label",
      //   description: "Create a new label in a repository",
      //   inputSchema: zodToJsonSchema(label.CreateLabelSchema),
      // },
      {
        name: "get_repository_labels",
        description: "Get all labels in a repository",
        inputSchema: zodToJsonSchema(label.GetLabelsSchema),
      },
      {
        name: "create_issue_labels",
        description: "Add labels to an issue in a repository",
        inputSchema: zodToJsonSchema(label.CreateIssueLabelsSchema),
      },
      {
        name: "get_issue_labels",
        description: "Get all labels for an issue in a repository",
        inputSchema: zodToJsonSchema(label.GetIssueLabelsSchema),
      },
      {
        name: "delete_issue_label",
        description: "Remove a label from an issue in a repository",
        inputSchema: zodToJsonSchema(label.DeleteIssueLabelSchema),
      },
      {
        name: "get_label_by_name",
        description: "Get a single label by name from a repository",
        inputSchema: zodToJsonSchema(label.GetLabelByNameSchema),
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (!request.params.arguments) {
      throw new Error("Arguments are required");
    }

    switch (request.params.name) {

      // case "get_user_Info": {
      //   const result = await user.getUserInfo();
      //   return {
      //     content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      //   };
      // }
      case "get_user_repository": {
        const args = repository.getUserRepositorySchema.parse(request.params.arguments);
        const results = await repository.getUserRepository(
          args.owner,
          args.repo,
        );
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      }

      case "get_user_repositories": {
        const args = repository.getUserRepositoriesSchema.parse(request.params.arguments);
        const results = await repository.getUserRepositories(
          args.username,
          args.per_page,
          args.page,
          args.search,
        );
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      }

      case "get_org_repositories": {
        const args = repository.getOrgRepositoriesSchema.parse(request.params.arguments);
        const results = await repository.getOrgRepositories(
          args.orgPath,
          args.per_page,
          args.page,
          args.search,
        );
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      }

      case "create_issue": {
        const args = issues.CreateIssueSchema.parse(request.params.arguments);
        const { owner, repo, ...options } = args;

        try {
          console.error(`[DEBUG] Attempting to create issue in ${owner}/${repo}`);
          console.error(`[DEBUG] Issue options:`, JSON.stringify(options, null, 2));

          const issue = await issues.createIssue(owner, repo, options);

          console.error(`[DEBUG] Issue created successfully`);
          return {
            content: [{ type: "text", text: JSON.stringify(issue, null, 2) }],
          };
        } catch (err) {
          // Type guard for Error objects
          const error = err instanceof Error ? err : new Error(String(err));

          console.error(`[ERROR] Failed to create issue:`, error);

          if (error instanceof AtomGitResourceNotFoundError) {
            throw new Error(
              `Repository '${owner}/${repo}' not found. Please verify:\n` +
              `1. The repository exists\n` +
              `2. You have correct access permissions\n` +
              `3. The owner and repository names are spelled correctly`
            );
          }

          // Safely access error properties
          throw new Error(
            `Failed to create issue: ${error.message}${error.stack ? `\nStack: ${error.stack}` : ''
            }`
          );
        }
      }

      case "create_issue_comment": {
        const args = issues.CreateIssueCommentSchema.parse(request.params.arguments);
        const { owner, repo, issue_number, body } = args;

        try {
          console.error(`[DEBUG] Attempting to create issue comment in ${owner}/${repo}`);

          const issue = await issues.createIssueComment(owner, repo, issue_number, body);

          return {
            content: [{ type: "text", text: JSON.stringify(issue, null, 2) }],
          };
        } catch (err) {
          // Type guard for Error objects
          const error = err instanceof Error ? err : new Error(String(err));

          console.error(`[ERROR] Failed to create issue:`, error);

          if (error instanceof AtomGitResourceNotFoundError) {
            throw new Error(
              `Repository '${owner}/${repo}' not found. Please verify:\n` +
              `1. The repository exists\n` +
              `2. You have correct access permissions\n` +
              `3. The owner and repository names are spelled correctly`
            );
          }

          // Safely access error properties
          throw new Error(
            `Failed to create issue comment: ${error.message}${error.stack ? `\nStack: ${error.stack}` : ''
            }`
          );
        }
      }



      case "assign_issue": {
        const args = issues.AssignIssueSchema.parse(request.params.arguments);
        const { owner, repo, issue_number, assignee } = args;

        const result = await issues.setAssignee(owner, repo, issue_number, assignee);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "list_repository_issues": {
        const args = issues.ListIssuesSchema.parse(request.params.arguments);
        const { owner, repo } = args;

        const result = await issues.listIssues(owner, repo);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "get_issue_details": {
        const args = issues.GetIssueSchema.parse(request.params.arguments);
        const { owner, repo, issue_number } = args;

        const result = await issues.getIssue(owner, repo, issue_number);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "list_issue_assignees": {
        const args = issues.ListAssigneesSchema.parse(request.params.arguments);
        const { owner, repo } = args;

        const result = await issues.listIssueAssignees(owner, repo);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "check_if_user_is_assignable": {
        const args = issues.CheckAssigneeSchema.parse(request.params.arguments);
        const { owner, repo, assignee } = args;

        const result = await issues.checkIfUserIsAssignable(owner, repo, assignee);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "create_pull_request": {
        const args = pull.CreatePullRequestSchema.parse(request.params.arguments);
        const result = await pull.createPullRequest(args.owner, args.repo, args.body);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "get_pull_request_details": {
        const args = pull.GetPullRequestDetailsSchema.parse(request.params.arguments);
        const result = await pull.getPullRequestDetails(args.owner, args.repo, args.pull_number);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "create_pull_request_comment": {
        const args = pull.CreatePullRequestCommentSchema.parse(request.params.arguments);
        const result = await pull.createPullRequestComment(args.repoOwner, args.repo, args.pull_number, args.body);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "create_pull_request_reply": {
        const args = pull.CreatePullRequestReplySchema.parse(request.params.arguments);
        const result = await pull.createPullRequestReply(args.owner, args.repo, args.pull_number, args.comment_id, args.body);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "get_pull_request_comment": {
        const args = pull.GetPullRequestCommentSchema.parse(request.params.arguments);
        const result = await pull.getPullRequestComment(args.owner, args.repo, args.pull_number, args.comment_id);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      // case "list_pull_request_comments": {
      //   const args = pull.ListPullRequestCommentsSchema.parse(request.params.arguments);
      //   const result = await pull.listPullRequestComments(args.owner, args.repo, args.pull_number, args.page, args.per_page);
      //   return {
      //     content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      //   };
      // }

      case "list_repository_branches": {
        const args = branch.ListBranchListSchema.parse(request.params.arguments);
        const result = await branch.getBranchList(args.owner, args.repo, args.page, args.per_page);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "get_repository_branch_details": {
        const args = branch.ListBranchDetailSchema.parse(request.params.arguments);
        const result = await branch.getBranchDetail(args.owner, args.repo, args.branch);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      // case "create_repository_label": {
      //   const args = label.CreateLabelSchema.parse(request.params.arguments);
      //   const { owner, repo, name, color, description } = args;

      //   const result = await label.createLabel(owner, repo, name, color, description);
      //   return {
      //     content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      //   };
      // }

      case "get_repository_labels": {
        const args = label.GetLabelsSchema.parse(request.params.arguments);
        const { owner, repo } = args;

        const result = await label.getLabels(owner, repo);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "create_issue_labels": {
        const args = label.CreateIssueLabelsSchema.parse(request.params.arguments);
        const { owner, repo, issue_number, labels } = args;

        const result = await label.createIssueLabels(owner, repo, issue_number, labels);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "get_issue_labels": {
        const args = label.GetIssueLabelsSchema.parse(request.params.arguments);
        const { owner, repo, issue_number } = args;

        const result = await label.getIssueLabels(owner, repo, issue_number);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "delete_issue_label": {
        const args = label.DeleteIssueLabelSchema.parse(request.params.arguments);
        const { owner, repo, issue_number, name } = args;

        const result = await label.deleteIssueLabel(owner, repo, issue_number, name);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "get_label_by_name": {
        const args = label.GetLabelByNameSchema.parse(request.params.arguments);
        const { owner, repo, name } = args;

        const result = await label.getLabelByName(owner, repo, name);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${request.params.name}`);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid input: ${JSON.stringify(error.errors)}`);
    }
    if (isAtomGitError(error)) {
      throw new Error(formatAtomGitError(error));
    }
    throw error;
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("AtomGit MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
