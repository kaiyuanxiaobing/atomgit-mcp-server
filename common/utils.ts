import { getUserAgent } from "universal-user-agent";
import { VERSION } from "./version.js";
import { createAtomGitError } from "./errors.js";

const USER_AGENT = `modelcontextprotocol/servers/atomgit/v${VERSION} ${getUserAgent()}`;


type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}


async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return response.json();
  }
  return response.text();
}


export async function atomGitRequest(
  url: string,
  options: RequestOptions = {}
): Promise<unknown> {
  const headers: Record<string, string> = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "User-Agent": USER_AGENT,
    ...options.headers,
  };

  if (process.env.ATOMGIT_PERSONAL_ACCESS_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.ATOMGIT_PERSONAL_ACCESS_TOKEN}`;
  }

  const response = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    throw createAtomGitError(response.status, responseBody);
  }

  return responseBody;
}