import { TaskValidationAuthError } from "../errors";
import { TaskAuthorizationMethod } from "../task/TaskAuthorizationMethod";

/**
 * Represents a Client Credentials authorization method, extending TaskAuthorizationMethod.
 */
export class ClientCredentialsAuthorization extends TaskAuthorizationMethod {
    /**
     * Creates an instance of ClientCredentialsAuthorization.
     * @param {Object} authorization The authorization details.
     * @param {string} authorization.client_id The client ID.
     * @param {string} authorization.token_endpoint The token endpoint URL.
     * @param {string} [authorization.client_assertion] The client assertion (JWT).
     * @param {string} [authorization.client_secret] The client secret.
     * @param {string} [authorization.private_key_path] The path to the private key.
     * @param {number} [authorization.expires_in] The expiration time in seconds for the private key (default: 300 seconds).
     */
    constructor(authorization) {
        super(authorization, 'client-credentials');
        return this;
    }

    /**
     * Validates the Client Credentials authorization method.
     * @throws {TaskValidationAuthError} When required parameters are missing.
     * @returns {Object} The credentials object.
     */
    validate() {
        if (!this.authorization?.client_id) {
            throw new TaskValidationAuthError(`Client ID Missing: The required client ID is not provided. Please include the client ID to authenticate and proceed with the operation.`);
        } else {
            this.credentials = {};
            this.credentials['client_id'] = this.authorization?.client_id;
        }
        if (this.authorization?.scope) {
            this.credentials['scope'] = this.authorization.scope;
        }
        if (this.authorization?.additional_parameters) {
            this.credentials['additional_parameters'] = this.authorization.additional_parameters;
        }
        if (!this.authorization?.token_endpoint) {
            throw new TaskValidationAuthError(`Token Endpoint Missing: The required Token Endpoint is not provided. Please include the Token Endpoint to authenticate and proceed with the operation.`);
        } else {
            this.credentials['token_endpoint'] = this.authorization?.token_endpoint;
        }
        if (this.authorization?.client_assertion) {
            this.credentials['client_assertion'] = this.authorization.client_assertion;
            this.credentials['client_assertion_type'] = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';
        } else if (this.authorization?.client_secret) {
            this.credentials['client_secret'] = this.authorization.client_secret;
        } else if (this.authorization?.private_key_path) {
            this.credentials['private_key_path'] = this.authorization.private_key_path;
            this.credentials['expires_in'] = this.authorization?.expires_in || 300;
        } else {
            throw new TaskValidationAuthError(`"Client Secret, Client Assertion, or Private Key Path Needed: To authenticate and access the requested resource, you need to provide either a valid client secret, a client assertion, or the path to a private key."`);
        }
        return this.credentials;
    }
}
