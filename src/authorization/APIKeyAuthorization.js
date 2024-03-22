import { TaskAuthorizationMethod } from "../task/TaskAuthorizationMethod";

/**
 * Represents an API key authorization method, extending TaskAuthorizationMethod.
 */
export class APIKeyAuthorization extends TaskAuthorizationMethod {
    /**
     * Creates an instance of APIKeyAuthorization.
     * @param {Object} authorization The authorization details.
     * @param {string} authorization.key The API key.
     * @param {string} authorization.value The value associated with the API key.
     */
    constructor(authorization) {
        super(authorization, 'api-key');
    }

    /**
     * Validates the API key authorization method.
     * @throws {TaskValidationAuthError} When the API key format is incorrect.
     * @returns {Object} The credentials object.
     */
    validate() {
        if (this.authorization.key && this.authorization.value) {
            this.credentials = {
                ...this.authorization,
                addTo: this.authorization?.addTo ?? 'header',
            };
        } else {
            throw new TaskValidationAuthError(`API Key format wrong!`);
        }
        return this.credentials;
    }
}
