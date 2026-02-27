import { Response } from "express";
import { ErrorResponse, SuccessResponse } from "./types/response";
import {
  BadRequestError,
  AuthorizationError,
  ConflictError,
  DatabaseError,
  NotFoundError,
  ProviderError,
  ValidationError,
} from "./error.manager";

export class ResponseManager {
  success(
    res: Response,
    data: Array<any> | object,
    message = "Operation Successful",
    statusCode = 200,
  ) {
    const response: SuccessResponse = {
      success: true,
      statusCode,
      message,
      data,
    };

    res.status(statusCode).json(response);
  }

  error(
    res: Response,
    errors: string | Array<any> | object,
    message = "Operation Failed",
    statusCode = 400,
  ) {
    const response: ErrorResponse = {
      success: false,
      statusCode,
      errors,
      message,
    };
    res.status(statusCode).json(response);
  }

  notFound(
    res: Response,
    errors: string | Array<any> | object,
    statusCode = 404,
    message = "Resource Not Found",
  ) {
    const response: ErrorResponse = {
      success: false,
      statusCode,
      errors,
      message,
    };
    res.status(statusCode).json(response);
  }

  conflict(res: Response, message = "Conflict detected", statusCode = 409) {
    const response: ErrorResponse = {
      success: false,
      statusCode,
      message,
      errors: message,
    };
    res.status(statusCode).json(response);
  }

  internalError(
    res: Response,
    errors: string | Array<any> | object,
    message = "Internal server error",
    statusCode = 500,
  ) {
    const response: ErrorResponse = {
      success: false,
      errors,
      message,
      statusCode,
    };
    res.status(statusCode).json(response);
  }

  validationError(
    res: Response,
    errors: string | Array<any> | {},
    message = "Validaion Failed",
    statusCode = 400,
  ) {
    const response: ErrorResponse = {
      success: false,
      errors,
      message,
      statusCode,
    };
    res.status(statusCode).json(response);
  }

  authorizationError(
    res: Response,
    errors: string | Array<any> | {},
    message = "Authorization Failed",
    statusCode = 403,
  ) {
    const response: ErrorResponse = {
      success: false,
      errors,
      message,
      statusCode,
    };
    res.status(statusCode).json(response);
  }

  providerError(
    res: Response,
    errors: string | Array<any> | {},
    message = "Provider Error",
    statusCode = 500,
  ) {
    const response: ErrorResponse = {
      success: false,
      errors,
      message,
      statusCode,
    };
    res.status(statusCode).json(response);
  }

  authenticationError(
    res: Response,
    errors: string | Array<any> | {},
    message = "Authorization Failed",
    statusCode = 403,
  ) {
    const response: ErrorResponse = {
      success: false,
      errors,
      message,
      statusCode,
    };

    res.status(statusCode).json(response);
  }

  handleError(res: Response, error: Error) {
    if (error instanceof ConflictError) {
      return this.conflict(res, error.message);
    } else if (error instanceof NotFoundError) {
      return this.notFound(res, error.message);
    } else if (error instanceof DatabaseError)
      return this.internalError(res, error.message);
    else if (error instanceof ValidationError) {
      return this.validationError(res, error.message);
    } else if (error instanceof ProviderError) {
      return this.providerError(res, error.message);
    } else if (error instanceof AuthorizationError) {
      return this.authorizationError(res, error.message);
    } else {
      return this.internalError(res, error.message);
    }
  }
}
