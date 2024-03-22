/**
 * Represents a task message.
 */
export class TaskMessage {
    /**
     * Creates an instance of TaskMessage.
     * @param {string} message The message content.
     * @param {string|null} type The type of message (optional).
     */
    constructor(message, type = null) {
        /**
         * The message content.
         * @type {string}
         */
        this.message = message;

        /**
         * The identifier of the message.
         * @type {string}
         */
        this.identifier = 'message';

        /**
         * A boolean indicating whether the message is from CZTR.
         * @type {boolean}
         */
        this.cztr = true;

        if (type) {
            /**
             * The type of message.
             * @type {string}
             */
            this.type = type;
        }

        return this;
    }

    /**
     * Sets additional metadata for the message.
     * @param {Object} meta The metadata object.
     * @returns {TaskMessage} The TaskMessage instance with updated metadata.
     */
    setMeta(meta) {
        /**
         * Additional metadata for the message.
         * @type {Object}
         */
        this.meta = meta;
        return this;
    }
}
