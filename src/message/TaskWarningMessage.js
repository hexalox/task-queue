import { TaskMessage } from "./TaskMessage";

/**
 * Represents a task warning message, extending TaskMessage.
 */
export class TaskWarningMessage extends TaskMessage {
    /**
     * Creates an instance of TaskWarningMessage.
     * @param {string} message The warning message content.
     */
    constructor(message) {
        super(message, 'warning');
    }
}
