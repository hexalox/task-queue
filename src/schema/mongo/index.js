/**
 * MongoDB schema for a task.
 * @type {Object}
 */
export const MongoTaskSchema = {
    _id: String,
    taskType: {
        /**
         * The type of the task.
         * @type {string}
         */
        type: String,
        required: true
    },
    taskName: {
        /**
         * The name of the task.
         * @type {string}
         * @default 'task'
         */
        type: String,
        default: 'task',
    },
    subtasks: [
        {
            /**
             * References to subtasks.
             * @type {string}
             */
            type: String,
            ref: 'Task',
        },
    ],
    hasChild: {
        /**
         * Indicates if the task has child tasks.
         * @type {boolean}
         * @default false
         */
        type: Boolean,
        default: false,
    },
    subtaskCount: {
        /**
         * The count of subtasks.
         * @type {number}
         * @default 0
         */
        type: Number,
        default: 0,
    },
    payload: Object,
    isComplete: {
        /**
         * Indicates if the task is complete.
         * @type {boolean}
         * @default false
         */
        type: Boolean,
        default: false,
    },
    progress: {
        /**
         * The progress of the task.
         * @type {number}
         * @default 0
         */
        type: Number,
        default: 0,
    },
    expires: Date,
    maxAttempts: {
        /**
         * The maximum number of attempts for the task.
         * @type {number}
         * @default 1
         */
        type: Number,
        default: 1,
    },
    attempts: {
        /**
         * The number of attempts made for the task.
         * @type {number}
         * @default 0
         */
        type: Number,
        default: 0,
    },
    maxConcurrency: {
        /**
         * The maximum concurrency allowed for the task.
         * @type {number}
         * @default 1
         */
        type: Number,
        default: 1,
    },
    childTaskOf: {
        /**
         * The parent task of the task.
         * @type {string}
         */
        type: String,
        ref: 'Task',
    },
    immediate: {
        /**
         * Indicates if the task should be executed immediately.
         * @type {boolean}
         * @default false
         */
        type: Boolean,
        default: false,
    },
    priority: {
        /**
         * The priority of the task.
         * @type {number}
         * @default 1
         */
        type: Number,
        default: 1,
    },
    status: {
        /**
         * The status of the task.
         * @type {string}
         * @default 'enqueued'
         */
        type: String,
        default: 'enqueued',
    },
    result: Object,
    dependencies: [
        {
            /**
             * References to task dependencies.
             * @type {string}
             */
            type: String,
            ref: 'Task',
        },
    ],
    schedule: {
        /**
         * The schedule for the task.
         * @type {string}
         * @default null
         */
        type: String,
        default: null,
    },
    meta: Object,
    scheduledRunAt: Date,
    cancelledAt: Date,
    enqueuedAt: Date,
    startedAt: Date,
    completedAt: Date,
};
