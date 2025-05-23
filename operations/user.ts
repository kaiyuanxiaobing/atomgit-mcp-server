import { z } from 'zod';
import { atomGitRequest } from "../common/utils.js";
/**
 * Zod schema for validating and describing user data structure
 * Contains all possible user fields with their types and descriptions
 */
export const AtomGitUserInfoSchema = z.object({
  login: z.string().optional().describe("Username"),
  id: z.string().optional().describe("User ID"),
  url: z.string().optional().describe("API path to get user info by username"),
  name: z.string().optional().describe("Nickname"),
  company: z.string().optional().describe("Company"),
  blog: z.string().optional().describe("Blog"),
  location: z.string().optional().describe("Location"),
  phone: z.string().optional().describe("Phone number"),
  hide_email: z.number().describe("Whether to hide email, 1-hide/0-show"),
  email: z.string().optional().describe("Email"),
  bio: z.string().optional().describe("Bio"),
  avatar_url: z.string().describe("Avatar URL"),
  html_url: z.string().optional().describe("Profile URL"),
  followers: z.number().optional().describe("Followers count"),
  following: z.number().optional().describe("Following count"),
  total_repos: z.number().optional().describe("Total repositories count"),
  created_at: z.string().optional().describe("Registration time"),
  updated_at: z.string().optional().describe("Last update time")
})

/**
 * Fetches user information from AtomGit API
 * @returns {Promise<Object>} A promise that resolves to the user data object
 */
export async function getUserInfo() {
  const url = "https://api.atomgit.com/user";
  const response = await atomGitRequest(url.toString());
  return AtomGitUserInfoSchema.parse(response);
}
