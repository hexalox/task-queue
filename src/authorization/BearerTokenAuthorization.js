import { TaskValidationAuthError } from "../errors";
import { TaskAuthorizationMethod } from "../task/TaskAuthorizationMethod";
import { TokenSet } from "openid-client";

/**
 * Represents a Bearer token authorization method, extending TaskAuthorizationMethod.
 */
export class BearerTokenAuthorization extends TaskAuthorizationMethod {
    /**
     * Creates an instance of BearerTokenAuthorization.
     * @param {Object} authorization The authorization details.
     * @param {string} authorization.access_token The bearer access token.
     * @param {number} [authorization.expires_at] The expiration timestamp of the token (default: 30 minutes from now).
     * @param {string} [authorization.token_type] The type of token (default: 'Bearer').
     */
    constructor(authorization) {
        super(authorization, 'bearer-token');
    }

    /**
     * Validates the Bearer token authorization method.
     * @throws {TaskValidationAuthError} When the access token is missing or expired.
     * @returns {TokenSet} The token set object.
     */
    validate() {
        if (this.authorization?.access_token) {
            this.credentials = {
                ...this.authorization,
                access_token: this.authorization?.access_token,
                expires_at: this.authorization?.expires_at ?? Math.floor((Date.now() / 1000) + (30 * 60)),
                token_type: this.authorization?.token_type ?? 'Bearer'
            };
            this.credentials = new TokenSet(this.credentials);
            if (this.credentials.expired()) {
                throw new TaskValidationAuthError(`TokenSet Expired: The authentication token associated with your request has expired. 
                    Please reauthenticate to continue using the service. Make sure to obtain a fresh token before attempting to access protected resources.`);
            }
        } else {
            throw new TaskValidationAuthError(`Valid access token missing!`);
        }
        return this.credentials;
    }
}
