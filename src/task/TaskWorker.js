import { TASK_STATUS } from "./constants";

/**
 * Represents a generic task worker responsible for managing task execution and state.
 *
 * @class TaskWorker
 */
export class TaskWorker {
  /**
   * Creates an instance of TaskWorker.
   * 
   * @param {Object} task - The task object to be processed by the worker.
   * @memberof TaskWorker
   */
  constructor(task) {
    /**
     * The task object to be processed by the worker.
     *
     * @type {Object}
     * @private
     */
    this.task = task;

    /**
     * Indicates whether the task has been marked as complete.
     *
     * @type {boolean}
     * @private
     */
    this._isComplete = false;

    /**
     * Represents the progress percentage of the task.
     *
     * @type {number}
     * @private
     */
    this._progress = 0;
    this._status = this.task.status;
  }
  
  /**
   * Sets the progress of the task.
   *
   * @param {number} progress - The progress percentage (0 to 100).
   * @memberof TaskWorker
   */
  setProgress(progress) {
    if (progress >= 0 && progress <= 100) {
      this._progress = progress;
    }
  }

  /**
   * Retrieves the ID of the task.
   *
   * @returns {string} The ID of the task.
   * @memberof TaskWorker
   */
  getTaskId() {
    return this.task?._id;
  }

  /**
   * Marks the task as complete.
   *
   * @memberof TaskWorker
   */
  setComplete() {
    this._isComplete = true;
  }

  /**
   * Retrieves the payload associated with the task.
   *
   * @returns {Object} The payload of the task.
   * @memberof TaskWorker
   */
  getPayload() {
    return this.task?.payload;
  }

  /**
   * Retrieves the ID of the parent task, if any.
   *
   * @returns {string} The ID of the parent task.
   * @memberof TaskWorker
   */
  getParentTaskId() {
    return this.task?.childTaskOf;
  }

  /**
   * Checks if the task has any child tasks.
   *
   * @returns {boolean} True if the task has child tasks, false otherwise.
   * @memberof TaskWorker
   */
  hasChildTask() {
    return this.task?.hasChild;
  }

  setStatus(status){
    if(Object.values(TASK_STATUS).includes(status)){
      this._status = status;
    }
  }

  /**
   * Placeholder method for executing the task.
   * Subclasses should implement this method with task-specific logic.
   *
   * @memberof TaskWorker
   * @async
   */
  async run() {
    // To be implemented in subclasses
  }
}
