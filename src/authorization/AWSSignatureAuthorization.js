import { TaskAuthorizationMethod } from "../task/TaskAuthorizationMethod";

/**
 * Represents an AWS Signature authorization method, extending TaskAuthorizationMethod.
 */
export class AWSSignatureAuthorization extends TaskAuthorizationMethod {
    /**
     * Creates an instance of AWSSignatureAuthorization.
     * @param {Object} authorization The authorization details.
     * @param {string} authorization.accesskey The AWS access key.
     * @param {string} authorization.secretkey The AWS secret key.
     */
    constructor(authorization) {
        super(authorization, 'aws-signature');
    }

    /**
     * Validates the AWS Signature authorization method.
     * @throws {TaskValidationAuthError} When the access key or secret key is missing.
     * @returns {Object} The credentials object.
     */
    validate() {
        if (this.authorization.accesskey && this.authorization.secretkey) {
            this.credentials = this.authorization;
        } else {
            throw new TaskValidationAuthError(`AccessKey SecretKey format wrong!`);
        }
        return this.credentials;
    }
}
