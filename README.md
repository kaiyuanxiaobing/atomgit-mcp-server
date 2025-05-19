# AtomGit MCP Server

AtomGit MCP 服务器是专门为 AtomGit 开源协作平台的模型上下文(MCP) 服务的实现。提供了一系列方法，允许 AI 管理 AtomGit 开源协作平台的仓库、issues、pull requests、branch、label等。


## 安装（npx启动跳过该步骤）

### 前提条件
- nodejs v18.20.2 或者更高版本
- pnpm 10.9.0
- 拥有 AtomGit 账户的访问令牌，[获取方式](https://docs.atomgit.com/user/pats)

### 从源代码构建

#### 克隆仓库
``` bash
git clone https://atomgit.com/atomgit-open-source-ecosystem/atomgit-mcp-server.git

cd mcp-server-atomgit
```

#### 构建项目
```bash
pnpm build
```

#### 查看构建位置
```bash
pwd
```

### MCP Hosts配置

#### claude 
##### 可执行文件启动
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

##### npx 启动
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
#### vscode

NPX
``` json
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


### 可用工具

mcp-server-atomgit 服务器提供了多种与 AtomGit 交互的工具，后续会不断完善：

| 工具                         | 类别           | 描述            |
|-----------------------------|-------------|------------------|
| **get_user_repository**     | repo         | 列出用户授权某个的仓库   |
| **get_user_repositories**   | repo         | 列出用户授权的所有仓库   |
| **get_org_repositories**    | repo         | 列出组织授权的所有仓库   |
| **create_issue**            | issue       | 为某个仓库创建issue     |
| **create_issue_comment**    | issue        | 为某条issue创建评论    |
| **delete_issue_comment**    | issue        | 删除某条issue的评论    |
| **get_issue_comment**       | issue        | 获取某条issue的评论    |
| **list_issue_comments**     | issue        | 列出某条issue的所有评论 |
| **list_issues**             | issue        | 列出某个仓库的所有issues |
| **get_issue**               | issue        | 获取某个issue的详细信息 |
| **set_assignees**           | issue        | 设置某个issue的负责人   |
| **list_issue_assignees**    | issue        | 列出某个issue的负责人   |
| **check_if_user_is_assignable** | issue    | 检查某用户是否可分配为issue负责人 |
| **create_pull_request**         | pull     | 创建一个新的变更请求            |
| **get_pull_request_details**    | pull     | 获取某个变更请求的详细信息      |
| **create_pull_request_comment** | pull     | 为某个变更请求创建评论          |
| **create_pull_request_reply**   | pull     | 回复某个变更请求的评论          |
| **get_pull_request_comment**    | pull     | 获取某个变更请求评论的详细信息  |
<!-- | **list_pull_request_comments**  | pull     | 列出某个变更请求的所有评论      | -->
| **list_repository_branches**    | branch   | 获取分支列表                 |
| **get_repository_branch_details** | branch  | 获取分支信息                 |
<!-- | **create_repository_label**       | label   | 创建仓库标签                 | -->
| **get_repository_labels**         |  label  | 获取仓库所有标签              |
| **create_issue_labels**           |  label  | 为issue添加标签              |
| **get_issue_labels**              | label   | 获取issue的所有标签           |
| **delete_issue_label**            |  label  | 从issue中移除标签             |
| **get_label_by_name**             |  label  | 根据名称获取仓库中的单个标签     |

### 贡献

我们欢迎热爱开源的开发者们的贡献！如果您想为这个项目做出贡献，请按照以下指南操作：

1. Fork 此仓库。
2. 为feature 或 bug 修复创建一个新分支。
3. 更改代码，并确保代码有良好的文档。
4. 提交一个 pull request，并附上清晰的更改描述。

有任何问题，请给我们提交[issue](https://atomgit.com/atomgit-open-source-ecosystem/atomgit-mcp-server/issues)，我们会及时查看反馈，并积极解决~

### 许可：木兰宽松许可证
[木兰宽松许可证](./license)