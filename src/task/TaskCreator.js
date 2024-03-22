import { Task } from "./Task";
import { TaskPayload } from "./TaskPayload";

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
        this.taskInstance = Task;
        let { payload, taskType, taskName, immediate, expires, priority, maxAttempts, schedule } = config;

        this._payload = payload;
        /**
         * The task instance being created.
         * @type {Task}
         */
        this.task = new this.taskInstance();
        if (!taskType) {
            throw new Error("Task Type is mandatory and missing from the request.");
        }
        task.setTaskType(taskType);
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
     * Adds a subtask to the main task with the specified task type and payload.
     *
     * @param {string} taskType - The type of the subtask.
     * @param {TaskPayload} payload - The payload for the subtask.
     */
    addSubTask(taskType, payload) {
        if (payload instanceof TaskPayload) {
            this.task.addSubTask(new this.taskInstance().setPayload(payload).setTaskType(taskType));
        }
    }


    /**
     * Creates and saves the configured task to the database.
     *
     * @async
     * @function create
     * @returns {Task} The created task.
     * @throws {Error} If there is an issue during the creation or saving of the task.
     */
    async create() {

    }

    /**
     * Validates the authentication details for the task.
     *
     * @async
     * @function validate
     * @throws {Error} If there is an issue during the validation of the authentication details.
     */
    async validate() {
        if (this._payload) {
            this.payload = new TaskPayload();
            await this.validatePayload();
        } else {
            throw new Error("Task Payload is missing from the request.");
        }
    }

    async validatePayload() {
        await this.validatePayloadBody();
        await this.validatePayloadAuthorization();
        await this.validatePayloadMeta();
        await this.validatePayloadStorage();
    }

    async validatePayloadBody() {
        if (this._payload?.body) {
            return this.payload.setBody(this._payload?.body);
        } else {
            throw new Error("Payload body is missing. A valid payload body is required to create a task.");
        }
    }

    async validatePayloadAuthorization() {
        if (this._payload?.authorization) {
            return this.payload.setAuthorization(this._payload.authorization);
        }
        return {};
    }

    async validatePayloadMeta() {
        if (this._payload?.meta) {
            return this.payload.setMeta(this._payload.meta);
        }
        return {};
    }


    async validatePayloadStorage() {
        if (this._payload?.storage) {
            return this.payload.setStorage(this._payload.storage);
        }
        return {};
    }
}
