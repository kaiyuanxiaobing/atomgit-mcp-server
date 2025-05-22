import { z } from "zod";
import { atomGitRequest } from "../common/utils.js";

export const ListBranchListSchema = z.object({
  owner: z.string().describe("Repository owner, typically referred to as 'username'. Case-insensitive."),
  repo: z.string().describe("Repository name. Case-insensitive."),
  per_page: z.number().describe("Number of results per page").optional(),
  page: z.number().describe("Page number").optional(),
});

export const ListBranchDetailSchema = z.object({
  owner: z.string().describe("Repository owner, typically referred to as 'username'. Case-insensitive."),
  repo: z.string().describe("Repository name. Case-insensitive."),
  branch: z.string().describe("Branch name, cannot contain wildcards."),
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
