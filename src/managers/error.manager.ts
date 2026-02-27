export class BadRequestError extends Error {
  statusCode: number;
  constructor(message = "request failed") {
    super(message);
    this.statusCode = 400;
  }
}

export class NotFoundError extends Error {
  statusCode: number;
  constructor(message = "Not found") {
    super(message);
    this.statusCode = 404;
  }
}

export class ConflictError extends Error {
  statusCode: number;
  constructor(message = "Conflict Detected") {
    super(message);
    this.statusCode = 409;
  }
}

export class ProviderError extends Error {
  statusCode: number;
  constructor(message = "Provider Error") {
    super(message);
    this.statusCode = 500;
  }
}

export class DatabaseError extends Error {
  statusCode: number;
  constructor(message = "Database Operation failed") {
    super(message);
    this.statusCode = 500;
  }
}

export class AuthenticationError extends Error {
  statusCode: number;
  constructor(message = "User unauthorized") {
    super(message);
    this.statusCode = 401;
  }
}

export class AuthorizationError extends Error {
  statusCode: number;
  constructor(message = "User forbidden from accessing resource") {
    super(message);
    this.statusCode = 403;
  }
}

export class ValidationError extends Error {
  statusCode: number;
  constructor(message = "Validation failed") {
    super(message);
    this.statusCode = 400;
  }
}
