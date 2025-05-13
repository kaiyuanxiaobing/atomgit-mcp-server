import { z } from "zod";
import { atomGitRequest } from "../common/utils.js";

export const ListBranchListSchema = z.object({
  owner: z.string().describe("代码仓库的所有者，一般称之为'用户名（username）'。该名称不区分大小写。"),
  repo: z.string().describe("代码仓库名称。该名称不区分大小写。"),
  per_page: z.number().describe("分页结果数").optional(),
  page: z.number().describe("分页页码").optional(),
});

export const ListBranchDetailSchema = z.object({
  owner: z.string().describe("代码仓库的所有者，一般称之为'用户名（username）'。该名称不区分大小写。"),
  repo: z.string().describe("代码仓库名称。该名称不区分大小写。"),
  branch: z.string().describe("分支名称，不能包含通配符。"),
});

/**
 * Retrieves lists of all branches of a repo.
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param per_page - Number of items per page
 * @param page - Page number
 */
export async function getBranchList(
  owner: string,
  repo: string,
  page?: number,
  per_page?: number
) {

  const query = new URLSearchParams();
  if (page) query.append("page", page.toString());
  if (per_page) query.append("per_page", per_page.toString());

  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/branches?${query.toString()}`,
    {
      method: "GET",
    }
  );
}


/**
 * Retrieves details of a branch.
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param branch - Branch name
 */
export async function getBranchDetail(
  owner: string,
  repo: string,
  branch: string
) {


  return atomGitRequest(
    `https://api.atomgit.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/branches/${encodeURIComponent(branch)}`,
    {
      method: "GET",
    }
  );
}