/**
 * Represents a task authorization method.
 */
export class TaskAuthorizationMethod {
    /**
     * Creates an instance of TaskAuthorizationMethod.
     * @param {string} authorization The authorization method.
     * @param {string|null} method The authorization method details.
     */
    constructor(authorization, method = null){
        /**
         * The authorization method details.
         * @type {string|null}
         */
        this.method = method;

        /**
         * The authorization method.
         * @type {string}
         */
        this.authorization = authorization;
    }

    /**
     * Validates the task authorization method.
     */
    validate() { }

    /**
     * Saves the task authorization method.
     */
    save() { }
}
