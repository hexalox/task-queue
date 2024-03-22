import { v4 as uuid } from 'uuid';
import { TaskPayload } from './TaskPayload';

/**
 * Represents a task in a task management system.
 *
 * @class Task
 */
export class Task {
    /**
     * Creates a new SNTask instance.
     *
     * @constructor
     * @param {string} id - The unique identifier for the task. If not provided, a new UUID will be generated.
     * @param {Task[]} subtasks - An array of subtasks associated with this task.
     */
    constructor(id, subtasks = []) {
        /**
         * The unique identifier for the task.
         * @type {string}
         * @private
         */
        this._id = id ?? uuid();

        /**
         * The type of the task (e.g., 'main', 'subtask').
         * @type {string}
         */
        this.taskType = 'main';

        /**
         * The type of the task (e.g., 'main', 'subtask').
         * @type {string}
         */
        this.taskName = 'task';

        /**
         * The current status of the task (e.g., 'enqueued', 'in progress', 'completed').
         * @type {string}
         */
        this.status = 'enqueued';

        /**
         * An array of subtasks associated with this task.
         * @type {Task[]}
         */
        this.subtasks = subtasks;

        /**
         * An array of references to the subtasks (subtask IDs).
         * @type {string[]}
         */
        this.subtasksRef = [];

        /**
         * Indicates whether the task has subtasks.
         * @type {boolean}
         */
        this.hasChild = subtasks.length > 0;

        /**
         * The count of subtasks associated with this task.
         * @type {number}
         */
        this.subtaskCount = subtasks.length;

        /**
         * The payload associated with the task.
         * @type {TaskPayload}
         */
        this.payload = {};

        /**
         * Indicates whether the task is complete.
         * @type {boolean}
         */
        this.isComplete = false;

        /**
         * The progress of the task (percentage).
         * @type {number}
         */
        this.progress = 0;

        /**
         * The expiration date of the task.
         * @type {Date}
         */
        this.expires = null;

        /**
         * The maximum number of attempts for the task.
         * @type {number}
         */
        this.maxAttempts = 1;

        /**
         * The number of attempts made for the task.
         * @type {number}
         */
        this.attempts = 0;

        /**
         * The maximum number of concurrent tasks allowed.
         * @type {number}
         */
        this.maxConcurrency = 1;

        /**
         * The identifier of the parent task (if it is a subtask).
         * @type {string}
         */
        this.childTaskOf = null;

        /**
         * The creation timestamp of the task.
         * @type {Date}
         */
        this.createdAt = new Date();

        /**
         * The last update timestamp of the task.
         * @type {Date}
         */
        this.updatedAt = new Date();

        /**
         * Indicates whether the task should be executed immediately.
         * @type {boolean}
         */
        this.immediate = false;

        /**
         * The priority of the task.
         * @type {number}
         */
        this.priority = 1;

        /**
         * The dependencies of the task (array of task IDs).
         * @type {string[]}
         */
        this.dependencies = [];

        /**
         * The schedule for the task (cron expression for periodic tasks or null for single-run tasks).
         * @type {string|null}
         */
        this.schedule = null;

        /**
         * Additional metadata associated with the task.
         * @type {Object|null}
         */
        this.meta = null;

        /**
         * The timestamp when the task is scheduled to run.
         * @type {Date|null}
         */
        this.scheduledRunAt = null;

        /**
         * The timestamp when the task was cancelled.
         * @type {Date|null}
         */
        this.cancelledAt = null;

        /**
         * The timestamp when the task was enqueued.
         * @type {Date|null}
         */
        this.enqueuedAt = null;

        /**
         * The timestamp when the task started execution.
         * @type {Date|null}
         */
        this.startedAt = null;

        /**
         * The timestamp when the task completed execution.
         * @type {Date|null}
         */
        this.completedAt = null;

        return this;
    }

    /**
     * Sets the status of the task.
     *
     * @param {string} status - The status to set for the task.
     */
    setStatus(status) {
        this.status = status;
    }

    /**
     * Sets the type of the task.
     *
     * @param {string} taskType - The type to set for the task.
     * @returns {Task} The updated SNTask instance.
     */
    setTaskType(taskType) {
        this.taskType = taskType;
        return this;
    }

    setTaskName(taskName) {
        this.taskName = taskName;
    }

    /**
     * Sets the schedule for the task.
     *
     * @param {string|null} schedule - The schedule for the task (cron expression for periodic tasks or null for single-run tasks).
     * @returns {Task} The updated SNTask instance.
     */
    setSchedule(schedule) {
        this.schedule = schedule;
        return this;
    }

    /**
     * Sets the parent task for the current subtask.
     *
     * @param {string} id - The ID of the parent task.
     * @returns {Task} The updated SNTask instance.
     */
    setParentTask(id) {
        this.childTaskOf = id;
        return this;
    }

    /**
     * Adds a subtask to the current task.
     *
     * @param {Task} subtask - The subtask to be added.
     * @returns {Task} The updated SNTask instance.
     */
    addSubTask(subtask) {
        if (subtask instanceof Task) {
            subtask.setParentTask(this._id);
            this.subtasks.push(subtask);
            this.hasChild = true;
            this.subtaskCount = this.subtasks.length;
            this.subtasksRef.push(subtask._id);
        }
        return this;
    }

    /**
     * Sets the payload for the task.
     *
     * @param {TaskPayload} payload - The payload data to be set.
     * @returns {Task} The updated SNTask instance.
     */
    setPayload(payload) {
        if(payload instanceof TaskPayload){
            this.payload = JSON.parse(JSON.stringify(payload));
        }
        return this;
    }

    /**
     * Retrieves the payload of the task.
     *
     * @returns {TaskPayload} The payload of the task.
     */
    getPayload() {
        return this.payload;
    }

    /**
     * Marks the task as complete.
     *
     * @returns {Task} The updated SNTask instance.
     */
    setComplete() {
        this.isComplete = true;
        this.status = 'completed';
        this.progress = 100;
        this.completedAt = new Date();
        return this;
    }

    /**
     * Sets the immediate flag for the task.
     *
     * @param {boolean} flag - The flag indicating whether the task should be executed immediately.
     * @returns {Task} The updated SNTask instance.
     */
    setImmediate(flag = true) {
        this.immediate = flag;
        return this;
    }

    /**
     * Sets additional metadata for the task.
     *
     * @param {Object} meta - Additional metadata for the task.
     */
    setMeta(meta) {
        this.meta = meta;
    }

    /**
     * Marks the task as cancelled and sets the cancellation timestamp.
     *
     * @returns {Task} The updated SNTask instance.
     */
    cancel() {
        this.status = 'cancelled';
        this.cancelledAt = new Date();
        return this;
    }

     /**
     * Sets the priority of the task.
     *
     * @param {number} priority - The priority value to set for the task.
     * @returns {Task} The updated Task instance.
     * @throws {Error} If the provided priority is not a number or is less than 1.
     */
     setPriority(priority) {
        if (typeof priority === 'number' && priority >= 1) {
            this.priority = priority;
        } else {
            throw new Error("Priority must be a number greater than or equal to 1.");
        }
        return this;
    }

    /**
     * Sets the expiration date of the task.
     *
     * @param {Date} expires - The expiration date to set for the task.
     * @returns {Task} The updated Task instance.
     * @throws {Error} If the provided expires value is not a valid Date object.
     */
    setExpires(expires) {
        if (expires instanceof Date) {
            this.expires = expires;
        } else {
            throw new Error("Expires must be a valid Date object.");
        }
        return this;
    }

    /**
     * Sets the maximum number of attempts for the task.
     *
     * @param {number} maxAttempts - The maximum number of attempts to set for the task.
     * @returns {Task} The updated Task instance.
     * @throws {Error} If the provided maxAttempts value is not a number or is less than 1.
     */
    setMaxAttempts(maxAttempts) {
        if (typeof maxAttempts === 'number' && maxAttempts >= 1) {
            this.maxAttempts = maxAttempts;
        } else {
            throw new Error("MaxAttempts must be a number greater than or equal to 1.");
        }
        return this;
    }

    /**
     * Creates a new SNTask instance from a JSON object.
     *
     * @static
     * @param {Object} json - The JSON object representing the task.
     * @returns {Task} The created SNTask instance.
     */
    static fromJSON(json) {
        const task = new Task();

        task._id = json._id || uuid();
        task.taskType = json.taskType || 'main';
        task.taskName = json.taskName || 'task';
        task.status = json.status || 'enqueued';
        task.subtasks = json.subtasks ? json.subtasks.map(subtaskJson => Task.fromJSON(subtaskJson)) : [];
        task.subtasksRef = json.subtasksRef || [];
        task.hasChild = json.hasChild || task.subtasks.length > 0;
        task.subtaskCount = json.subtaskCount || task.subtasks.length;
        task.payload = json.payload ? new TaskPayload().setBody(json.payload?.body ?? {})
                                                      .setAuthentication(json.payload?.authentication ?? {})
                                                      .setStorage(json.payload?.storage ?? {})
                                                      .setMeta(json.payload?.meta ?? {}) : new TaskPayload();
        task.isComplete = json.isComplete || false;
        task.progress = json.progress || 0;
        task.expires = json.expires ? new Date(json.expires) : null;
        task.maxAttempts = json.maxAttempts || 1;
        task.attempts = json.attempts || 0;
        task.maxConcurrency = json.maxConcurrency || 1;
        task.childTaskOf = json.childTaskOf || null;
        task.createdAt = json.createdAt ? new Date(json.createdAt) : new Date();
        task.updatedAt = json.updatedAt ? new Date(json.updatedAt) : new Date();
        task.immediate = json.immediate || false;
        task.priority = json.priority || 1;
        task.dependencies = json.dependencies || [];
        task.schedule = json.schedule || null;
        task.meta = json.meta || null;
        task.scheduledRunAt = json.scheduledRunAt ? new Date(json.scheduledRunAt) : null;
        task.cancelledAt = json.cancelledAt ? new Date(json.cancelledAt) : null;
        task.enqueuedAt = json.enqueuedAt ? new Date(json.enqueuedAt) : null;
        task.startedAt = json.startedAt ? new Date(json.startedAt) : null;
        task.completedAt = json.completedAt ? new Date(json.completedAt) : null;
        return task;
    }

    /**
     * Completes the task and all its subtasks recursively.
     *
     * @async
     */
    async complete() {
        // Implementation details...
    }
}



