/**
 * Represents the payload for a task, encapsulating various components such as body, authentication, storage, and metadata.
 *
 * @class TaskPayload
 */
export class TaskPayload {
    /**
     * Initializes a new TaskPayload object.
     *
     * @constructor
     */
    constructor() {
        /**
         * The body of the task.
         * @type {Object}
         */
        this.body = {};

        /**
         * Authentication details for the task.
         * @type {Object}
         */
        this.authentication = {};

        /**
         * Authorization details for the task.
         * @type {Object}
         */
        this.authorization = {};

        /**
         * Storage-related details for the task.
         * @type {Object}
         */
        this.storage = {};

        /**
         * Additional metadata for the task.
         * @type {Object}
         */
        this.meta = {};

        /**
         * The version number of the payload.
         * @type {number}
         */
        this.version = 2;

        return this;
    }

    /**
     * Sets the body of the task.
     *
     * @param {Object} body - The data representing the body of the task.
     * @returns {TaskPayload} The updated TaskPayload instance.
     */
    setBody(body) {
        if (body) {
            this.body = body;
        }
        return this;
    }

    /**
     * Sets the authentication details for the task.
     * @deprecated Please transition to using setAuthorization instead. This method will be removed in version 2.0.0.
     * @param {Object} authentication - Authentication details required for the task.
     * @returns {TaskPayload} The updated TaskPayload instance.
     */
    setAuthentication(authentication) {
        console.warn(`Warning: Deprecated! Please transition to using setAuthorization instead. This method will be removed in version 2.0.0.`);
        if (authentication) {
            this.authentication = authentication;
        }
        this.setAuthorization(authentication);
        return this;
    }

    /**
     * Sets the authorization details for the task.
     *
     * @param {Object} authorization - Authorization details required for the task.
     * @returns {TaskPayload} The updated TaskPayload instance.
     */
    setAuthorization(authorization) {
        if (authorization) {
            this.authorization = authorization;
        }
        return this;
    }


    /**
     * Sets storage-related details for the task.
     *
     * @param {Object} storage - Storage-related details for the task.
     * @returns {TaskPayload} The updated TaskPayload instance.
     */
    setStorage(storage) {
        if (storage) {
            this.storage = storage;
        }
        return this;
    }

    /**
     * Sets additional metadata for the task.
     *
     * @param {Object} meta - Additional metadata for the task.
     * @returns {TaskPayload} The updated TaskPayload instance.
     */
    setMeta(meta) {
        if (meta) {
            this.meta = meta;
        }
        return this;
    }
}
