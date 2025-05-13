export class AtomGitError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly response: unknown
  ) {
    super(message);
    this.name = "AtomGitError";
  }
}

export class AtomGitValidationError extends AtomGitError {
  constructor(message: string, status: number, response: unknown) {
    super(message, status, response);
    this.name = "AtomGitValidationError";
  }
}

export class AtomGitResourceNotFoundError extends AtomGitError {
  constructor(resource: string) {
    super(`Resource not found: ${resource}`, 404, { message: `${resource} not found` });
    this.name = "AtomGitResourceNotFoundError";
  }
}

export class AtomGitAuthenticationError extends AtomGitError {
  constructor(message = "Authentication failed") {
    super(message, 401, { message });
    this.name = "AtomGitAuthenticationError";
  }
}

export class AtomGitPermissionError extends AtomGitError {
  constructor(message = "Insufficient permissions") {
    super(message, 403, { message });
    this.name = "AtomGitPermissionError";
  }
}

export class AtomGitRateLimitError extends AtomGitError {
  constructor(
    message = "Rate limit exceeded",
    public readonly resetAt: Date
  ) {
    super(message, 429, { message, reset_at: resetAt.toISOString() });
    this.name = "AtomGitRateLimitError";
  }
}

export class AtomGitConflictError extends AtomGitError {
  constructor(message: string) {
    super(message, 409, { message });
    this.name = "AtomGitConflictError";
  }
}

export function isAtomGitError(error: unknown): error is AtomGitError {
  return error instanceof AtomGitError;
}

export function createAtomGitError(status: number, response: any): AtomGitError {
  switch (status) {
    case 401:
      return new AtomGitAuthenticationError(response?.message);
    case 403:
      return new AtomGitPermissionError(response?.message);
    case 404:
      return new AtomGitResourceNotFoundError(response?.message || "Resource");
    case 409:
      return new AtomGitConflictError(response?.message || "Conflict occurred");
    case 422:
      return new AtomGitValidationError(
        response?.message || "Validation failed",
        status,
        response
      );
    case 429:
      return new AtomGitRateLimitError(
        response?.message,
        new Date(response?.reset_at || Date.now() + 60000)
      );
    default:
      return new AtomGitError(
        response?.message || "AtomGit API error",
        status,
        response
      );
  }
}