# AtomGit MCP Server
[![smithery badge](https://smithery.ai/badge/@kaiyuanxiaobing/atomgit-mcp-server)](https://smithery.ai/server/@kaiyuanxiaobing/atomgit-mcp-server)

[English](./README_EN.md) | [中文](./README.md)

The AtomGit MCP Server is a specialized implementation of the Model Context Protocol (MCP) service for the AtomGit open-source collaboration platform. It provides a series of methods that enable AI to manage repositories, issues, pull requests, branches, labels, and other features on the AtomGit open-source collaboration platform.

## Installation and Usage

### Building from Source Code

#### Prerequisites (Skip this step for NPX startup)
- nodejs v18.20.2 or higher
- pnpm 10.9.0
- AtomGit account access token, [how to obtain](https://docs.atomgit.com/user/pats)

#### Clone Repository
```bash
git clone https://atomgit.com/atomgit-open-source-ecosystem/atomgit-mcp-server.git

cd mcp-server-atomgit
```

#### Build Project
```bash
pnpm build
```

#### Check Build Location
```bash
pwd
```

#### Claude Executable Startup
stdio mode:
```json
{
  "mcpServers": {
    "command": "node",
    "args": [
      "/home/user/work/mcp-server-atomgit/dist/index.js"
    ],
    "env": {
      "ATOMGIT_PERSONAL_ACCESS_TOKEN": "<your-atomgit-api-key-here>"
    },
  }
}
```

### MCP Hosts Configuration

#### Claude
##### NPX Startup
```json
{
  "mcpServers": {
    "atomgit-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "atomgit-mcp-server@latest"
      ],
      "env": {
        "ATOMGIT_PERSONAL_ACCESS_TOKEN": "<your-atomgit-api-key-here>"
      }
    }
  }
}
```

#### VSCode

NPX
```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "your-atomgit-api-key",
        "description": "AtomGit Personal Access Token",
        "password": true
      }
    ],
    "servers": {
      "atomgit-mcp-server": {
        "command": "npx",
        "args": [
          "-y",
          "atomgit-mcp-server@latest"
        ],
        "env": {
          "ATOMGIT_PERSONAL_ACCESS_TOKEN": "<your-atomgit-api-key-here>"
        }
      }
    }
  }
}
```

### Available Tools

The mcp-server-atomgit server provides various tools for interacting with AtomGit, which will be continuously improved:

| Tool                          | Category | Description                                       |
|------------------------------|----------|---------------------------------------------------|
| **get_user_repository**      | repo     | List authorized repository for a user             |
| **get_user_repositories**    | repo     | List all authorized repositories for a user       |
| **get_org_repositories**     | repo     | List all authorized repositories for an organization |
| **create_issue**             | issue    | Create an issue for a repository                  |
| **create_issue_comment**     | issue    | Create a comment for an issue                     |
| **delete_issue_comment**     | issue    | Delete a comment from an issue                    |
| **get_issue_comment**        | issue    | Get a comment from an issue                       |
| **list_issue_comments**      | issue    | List all comments for an issue                    |
| **list_issues**              | issue    | List all issues for a repository                  |
| **get_issue**                | issue    | Get detailed information about an issue           |
| **set_assignees**            | issue    | Set assignees for an issue                        |
| **list_issue_assignees**     | issue    | List assignees for an issue                       |
| **check_if_user_is_assignable** | issue | Check if a user can be assigned to an issue       |
| **create_pull_request**      | pull     | Create a new pull request                         |
| **get_pull_request_details** | pull     | Get detailed information about a pull request     |
| **create_pull_request_comment** | pull  | Create a comment for a pull request               |
| **create_pull_request_reply** | pull    | Reply to a pull request comment                   |
| **get_pull_request_comment** | pull     | Get detailed information about a pull request comment |
| **list_repository_branches** | branch   | Get list of branches                              |
| **get_repository_branch_details** | branch | Get branch information                         |
| **get_repository_labels**    | label    | Get all labels for a repository                   |
| **create_issue_labels**      | label    | Add labels to an issue                           |
| **get_issue_labels**         | label    | Get all labels for an issue                      |
| **delete_issue_label**       | label    | Remove a label from an issue                     |
| **get_label_by_name**        | label    | Get a single label by name from a repository     |

### Contributing

We welcome contributions from developers who love open source! If you'd like to contribute to this project, please follow these guidelines:

1. Visit the repository [https://atomgit.com/atomgit-open-source-ecosystem/atomgit-mcp-server](https://atomgit.com/atomgit-open-source-ecosystem/atomgit-mcp-server)
2. Fork this [repository](https://atomgit.com/atomgit-open-source-ecosystem/atomgit-mcp-server)
3. Create a new branch for your feature or bug fix
4. Make changes to the code and ensure it is well-documented
5. Submit a pull request with a clear description of your changes

If you have any questions, please submit an [issue](https://atomgit.com/atomgit-open-source-ecosystem/atomgit-mcp-server/issues) to us. We will review and respond promptly, and actively work to resolve it.

### License: Mulan PSL v2
[Mulan Permissive Software License，Version 2](./license)
