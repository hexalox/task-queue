import { TaskValidationError } from "../errors";
import { Task } from "./Task";
import { TaskPayload } from "./TaskPayload";
import { TaskPayloadAuthorization } from "./TaskPayloadAuthorization";
import { TaskPayloadMeta } from "./TaskPayloadMeta";

/**
 * A class responsible for creating and managing tasks, with options for configuring task properties.
 *
 * @class TaskCreator
 */
export class TaskCreator {
    /**
     * Creates a new TaskCreator instance.
     *
     * @constructor
     * @param {Object} config - Configuration options for the task creator.
     */
    constructor(config) {
        this.TaskClass = Task;
        this._config = config || {};
        this._payload = config?.payload;
        this._validated = false;

        /**
         * The task instance being created.
         * @type {Task}
         */
        this.task = new this.TaskClass();
    }

    logMessage(message){
        return `${this.task.taskType ? `[${this.task.taskType}] ` : ''}${message}`
    }

    /**
     * Sets the payload for the task.
     *
     * @param {TaskPayload} payload - The payload for the task.
     */
    setPayload(payload) {
        this._payload = payload;
    }

    /**
     * Sets the type of the task.
     *
     * @param {string} taskType - The type of the task.
     * @returns {TaskCreator} The TaskCreator instance.
     */
    setTaskType(taskType) {
        this._config.taskType = taskType;
        return this;
    }

    /**
     * Sets the name of the task.
     *
     * @param {string} taskName - The name of the task.
     * @returns {TaskCreator} The TaskCreator instance.
     */
    setTaskName(taskName) {
        this._config.taskName = taskName;
        return this;
    }

    /**
     * Sets the maximum number of attempts for the task.
     *
     * @param {number} maxAttempts - The maximum number of attempts.
     * @returns {TaskCreator} The TaskCreator instance.
     */
    setMaxAttempts(maxAttempts = 3) {
        this._config.maxAttempts = maxAttempts;
        return this;
    }

    /**
     * Sets whether the task should be executed immediately.
     *
     * @param {boolean} immediate - Whether the task should be executed immediately.
     * @returns {TaskCreator} The TaskCreator instance.
     */
    setImmediate(immediate = true) {
        this._config.immediate = immediate;
        return this;
    }

    /**
     * Sets the priority of the task.
     *
     * @param {number} priority - The priority of the task.
     * @returns {TaskCreator} The TaskCreator instance.
     */
    setPriority(priority) {
        this._config.priority = priority;
        return this;
    }

    /**
     * Sets the expiration date for the task.
     *
     * @param {Date} expires - The expiration date for the task.
     * @returns {TaskCreator} The TaskCreator instance.
     */
    setExpires(expires) {
        this._config.expires = expires;
        return this;
    }

    /**
     * Sets the schedule for the task.
     *
     * @param {string} schedule - The schedule for the task.
     * @returns {TaskCreator} The TaskCreator instance.
     */
    setSchedule(schedule) {
        this._config.schedule = schedule;
        return this;
    }

    /**
     * Validates the task configuration.
     *
     * @async
     * @returns {Promise<void>} A Promise that resolves when validation is complete.
     * @throws {Error} If validation fails.
     */
    async validateTask() {
        const { taskType, taskName, immediate, expires, priority, maxAttempts, schedule } = this._config;
        if (!taskType) {
            throw new TaskValidationError(`Task Type is mandatory and missing from the request.`);
        }
        this.task.setTaskType(taskType);
        if (taskName) {
            this.task.setTaskName(taskName);
        }
        if (immediate !== undefined) {
            this.task.setImmediate(immediate);
        }
        if (expires) {
            this.task.setExpires(expires);
        }
        if (priority !== undefined) {
            this.task.setPriority(priority);
        }
        if (maxAttempts !== undefined) {
            this.task.setMaxAttempts(maxAttempts);
        }
        if (schedule) {
            this.task.setSchedule(schedule);
        }
    }

    /**
     * Adds a subtask to the main task
     *
     * @param {Task} task - The type of the subtask.
     */
    addSubTask(task) {
        if (task instanceof Task) {
            this.task.addSubTask(task);
        }
    }

    /**
     * Creates and saves the configured task to the database.
     *
     * @async
     * @returns {Promise<Task>} The created task.
     * @throws {Error} If there is an issue during the creation or saving of the task.
     */
    async create() {
        // Implement creation logic here
    }

    /**
     * Validates the authentication details for the task.
     *
     * @async
     * @returns {Promise<void>} A Promise that resolves when validation is complete.
     * @throws {Error} If there is an issue during the validation of the authentication details.
     */
    async validate() {
        if(!this._validated){
            await this.validateTask();
            if (this._payload) {
                await this.validatePayload();
            } else {
                throw new TaskValidationError(`Task Payload is missing from the request.`);
            }
            if (this.payload instanceof TaskPayload) {
                this.task.setPayload(this.payload);
            } else {
                throw new TaskValidationError(`Payload should be an instance of TaskPayload.`);
            }
            this._validated = true;
        }
        return this.task;
    }

    /**
     * Validates the task payload.
     *
     * @async
     * @returns {Promise<void>} A Promise that resolves when validation is complete.
     * @throws {Error} If validation fails.
     */
    async validatePayload() {
        this.payload = new TaskPayload();
        if (this._payload?.authorization instanceof TaskPayloadAuthorization) {
            if (this._payload.authorization.isValid()) {
                this.payload.setAuthorization(this._payload.authorization);
            }
        } else {        
            await this._validatePayloadAuthorization();
        }
        if (this._payload?.meta instanceof TaskPayloadMeta) {
            if (this._payload.meta.isValid()) {
                this.payload.setMeta(this._payload.meta);
            }
        } else {
            await this._validatePayloadMeta();
        }
        await this._validatePayloadStorage();
        await this._validatePayloadBody();
    }

    /**
     * Validates the payload body.
     *
     * @async
     * @returns {Promise<void>} A Promise that resolves when validation is complete.
     * @throws {Error} If validation fails.
     */
    async _validatePayloadBody() {
        if (this._payload?.body) {
            return this.payload.setBody(this._payload?.body);
        } else {
            throw new TaskValidationError(`Payload body is missing. A valid payload body is required to create a task.`);
        }
    }

    /**
  * Validates the payload authorization.
  *
  * @async
  * @returns {Promise<void>} A Promise that resolves when validation is complete.
  * @throws {Error} If validation fails.
  */
    async _validatePayloadAuthorization() {
        if (this._payload?.authorization) {
            return this.payload.setAuthorization(this._payload.authorization);
        }
        return {};
    }

    /**
     * Validates the payload meta.
     *
     * @async
     * @returns {Promise<void>} A Promise that resolves when validation is complete.
     * @throws {Error} If validation fails.
     */
    async _validatePayloadMeta() {
        if (this._payload?.meta) {
            return this.payload.setMeta(this._payload.meta);
        }
        return {};
    }

    /**
     * Validates the payload storage.
     *
     * @async
     * @returns {Promise<void>} A Promise that resolves when validation is complete.
     * @throws {Error} If validation fails.
     */
    async _validatePayloadStorage() {
        if (this._payload?.storage) {
            return this.payload.setStorage(this._payload.storage);
        }
        return {};
    }
}
