/**
 * Enum representing task statuses.
 * @readonly
 * @enum {string}
 */
export const TASK_STATUS = {
    /**
     * The task is enqueued.
     */
    ENQUEUED: 'enqueued',
    /**
     * The task is pending.
     */
    PENDING: 'pending',
    /**
     * The task is running.
     */
    RUNNING: 'running',
    /**
     * The task has completed.
     */
    COMPLETED: 'completed',
    /**
     * The task has failed.
     */
    FAILED: 'failed',
    /**
     * The task is cancelled.
     */
    CANCELLED: 'cancelled',
    /**
     * The task is paused.
     */
    PAUSED: 'paused',
    /**
     * The task is waiting.
     */
    WAITING: 'waiting',
    /**
     * The task is delayed.
     */
    DELAYED: 'delayed',
    /**
     * The task has encountered an error.
     */
    ERROR: 'error',
    /**
     * The task is partially completed.
     */
    PARTIAL: 'partial'
};
