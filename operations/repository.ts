import { z } from "zod";
import { atomGitRequest } from "../common/utils.js";
import {
  AtomGitGetUserRepositorySchema,
  AtomGitGetUserRepositoriesSchema,
  AtomGitGetOrgRepositoriesSchema,
} from "../common/types.js";


export const getUserRepositorySchema = z.object({
  owner: z.string().describe("Search query owner"),
  repo: z.string().describe("Search query repo"),
});

export const getUserRepositoriesSchema = z.object({
  username: z.string().describe("Search query username"),
  per_page: z.number().optional().describe("Page number for pagination (default: 1)"),
  page: z.number().optional().describe("Number of results per page (default: 10)"),
  search: z.string().optional().describe("Search query content"),
});

export const getOrgRepositoriesSchema = z.object({
  orgPath: z.string().describe("Search query org name"),
  per_page: z.number().optional().describe("Page number for pagination (default: 1)"),
  page: z.number().optional().describe("Number of results per page (default: 10)"),
  search: z.string().optional().describe("Search query content"),
});


// 获取个人账户下代码库信息
export async function getUserRepository(
  owner: string = '',
  repo: string = ''
) {
  const url = `https://api.atomgit.com/repos/${encodeURIComponent(owner.toString())}/${encodeURIComponent(repo.toString())}`;

  const response = await atomGitRequest(url.toString());
  console.log("API Response:", JSON.stringify(response, null, 2));
  return AtomGitGetUserRepositorySchema.parse(response);
}

// 获取个人账户下代码库信息
export async function getUserRepositories(
  username: string,
  per_page: number = 10,
  page: number = 1,
  search?: string
) {
  let url = `https://api.atomgit.com/users/${encodeURIComponent(username)}/repos`;

  const params = new URLSearchParams();
  if (per_page) params.append('per_page', per_page.toString());
  if (page) params.append('page', page.toString());
  if (search) params.append('search', search);

  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  const response = await atomGitRequest(url.toString());
  return AtomGitGetUserRepositoriesSchema.parse(response);
}


// 获取组织下代码库信息
export async function getOrgRepositories(
  orgPath: string,
  per_page: number = 10,
  page: number = 1,
  search?: string
) {
  let url = `https://api.atomgit.com/orgs/${encodeURIComponent(orgPath)}/repos`;

  const params = new URLSearchParams();
  if (per_page) params.append('per_page', per_page.toString());
  if (page) params.append('page', page.toString());
  if (search) params.append('search', search);

  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  const response = await atomGitRequest(url.toString());
  return AtomGitGetOrgRepositoriesSchema.parse(response);
}
