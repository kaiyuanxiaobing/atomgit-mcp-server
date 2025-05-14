import { z } from "zod";
import { atomGitRequest } from "../common/utils.js";

// 标签相关的Schema定义
export const CreateLabelSchema = z.object({
  owner: z.string().describe("代码仓库的所有者，一般称之为'用户名（username）'。该名称不区分大小写。"),
  repo: z.string().describe("代码仓库名称（该名称不区分大小写）"),
  name: z.string().describe("标签名称"),
  color: z.string().describe("标签颜色。为6位的字符串，如: #ED4014"),
  description: z.string().optional().describe("标签描述"),
});

export const GetLabelsSchema = z.object({
  owner: z.string().describe("代码仓库的所有者，一般称之为'用户名（username）'。该名称不区分大小写。"),
  repo: z.string().describe("代码仓库名称（该名称不区分大小写）"),
});

export const CreateIssueLabelsSchema = z.object({
  owner: z.string().describe("代码仓库的所有者，一般称之为'用户名（username）'。该名称不区分大小写。"),
  repo: z.string().describe("代码仓库名称（该名称不区分大小写）"),
  issue_number: z.number().describe("issue编号"),
  labels: z.array(z.string()).describe("标签名称数组"),
});

export const GetIssueLabelsSchema = z.object({
  owner: z.string().describe("代码仓库的所有者，一般称之为'用户名（username）'。该名称不区分大小写。"),
  repo: z.string().describe("代码仓库名称（该名称不区分大小写）"),
  issue_number: z.number().describe("issue的编号"),
});

export const DeleteIssueLabelSchema = z.object({
  owner: z.string().describe("代码仓库的所有者，一般称之为'用户名（username）'。该名称不区分大小写。"),
  repo: z.string().describe("代码仓库名称（该名称不区分大小写）"),
  issue_number: z.number().describe("issue编号"),
  name: z.string().describe("标签名称"),
});

export const GetLabelByNameSchema = z.object({
  owner: z.string().describe("代码仓库的所有者，一般称之为'用户名（username）'。该名称不区分大小写。"),
  repo: z.string().describe("代码仓库名称（该名称不区分大小写）"),
  name: z.string().describe("标签名称"),
});

/**
 * 创建仓库标签
 * @param owner - 代码仓库的所有者
 * @param repo - 代码仓库名称
 * @param name - 标签名称
 * @param color - 标签颜色，为6位的字符串，如: #ED4014
 * @param description - 标签描述（可选）
 */
export async function createLabel(
  owner: string,
  repo: string,
  name: string,
  color: string,
  description?: string
) {
  const data: { name: string; color: string; description?: string } = {
    name,
    color,
  };

  if (description) {
    data.description = description;
  }

  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/labels`,
    {
      method: "POST",
      body: {
        data
      },
    }
  );
}

/**
 * 获取仓库所有标签
 * @param owner - 代码仓库的所有者
 * @param repo - 代码仓库名称
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
 * 创建Issue标签
 * @param owner - 代码仓库的所有者
 * @param repo - 代码仓库名称
 * @param issue_number - issue编号
 * @param labels - 标签名称数组
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
 * 获取issue的所有标签
 * @param owner - 代码仓库的所有者
 * @param repo - 代码仓库名称
 * @param issue_number - issue的编号
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
 * 删除Issue标签
 * @param owner - 代码仓库的所有者
 * @param repo - 代码仓库名称
 * @param issue_number - issue编号
 * @param name - 标签名称
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
 * 根据标签名称获取单个标签
 * @param owner - 代码仓库的所有者
 * @param repo - 代码仓库名称
 * @param name - 标签名称
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