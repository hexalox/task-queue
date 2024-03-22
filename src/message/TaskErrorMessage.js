import { TaskMessage } from "./TaskMessage";

/**
 * Represents a task error message, extending TaskMessage.
 */
export class TaskErrorMessage extends TaskMessage {
    /**
     * Creates an instance of TaskErrorMessage.
     * @param {string} message The error message content.
     */
    constructor(message) {
        super(message, 'error');
    }
}
