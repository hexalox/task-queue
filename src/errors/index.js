import { HTTP_STATUS_CODES } from "@simple-node/http-status-codes";

/**
 * Custom error class for task validation errors.
 */
export class TaskValidationError extends Error {
    /**
     * Creates an instance of TaskValidationError.
     * @param {string} message The error message.
     */
    constructor(message) {
        super(message);
        this.name = 'TaskValidationError'; // Set the name of the error
        this.code = HTTP_STATUS_CODES.BAD_REQUEST; // Set a custom error code
    }
}

/**
 * Custom error class for task validation authentication errors.
 */
export class TaskValidationAuthError extends Error {
    /**
     * Creates an instance of TaskValidationAuthError.
     * @param {string} message The error message.
     */
    constructor(message) {
        super(message);
        this.name = 'TaskValidationAuthError'; // Set the name of the error
        this.code = HTTP_STATUS_CODES.UNAUTHORIZED; // Set a custom error code
    }
}

/**
 * Custom error class for bad requests.
 */
export class BadRequestError extends Error {
    /**
     * Creates an instance of BadRequestError.
     * @param {string} message The error message.
     */
    constructor(message) {
        super(message);
        this.name = 'BadRequestError'; // Set the name of the error
        this.code = HTTP_STATUS_CODES.BAD_REQUEST; // Set a custom error code
    }
}
