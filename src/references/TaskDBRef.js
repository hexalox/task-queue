/**
 * Represents a reference to a database.
 * @class
 */
export class TaskDBRef {
  /**
   * Creates an instance of TaskDBRef.
   * @constructor
   * @param {string} id - The ID of the database reference.
   * @param {string} [type=null] - The type of the database.
   * @param {string} [host=null] - The host information for the database.
   * @returns {TaskDBRef} - The TaskDBRef instance.
   */
  constructor(id, type = null, host = null) {
      this.id = id;
      this.identifier = 'dbref';
      this.cztr = true;
      if (host) {
          this.host = host;
      }
      if (type) {
          this.type = type;
      }
      return this;
  }

  /**
   * Sets the database name.
   * @param {string} database - The database name to be set.
   * @returns {TaskDBRef} - The updated TaskDBRef instance.
   */
  setDatabase(database) {
      this.database = database;
      return this;
  }

  /**
   * Sets the source for the database reference.
   * @param {string} source - The source to be set.
   * @returns {TaskDBRef} - The updated TaskDBRef instance.
   */
  setSource(source) {
      this.source = source;
      return this;
  }

  /**
   * Sets the ID of the database reference.
   * @param {string} id - The ID to be set.
   * @returns {TaskDBRef} - The updated TaskDBRef instance.
   */
  setId(id) {
      this.id = id;
      return this;
  }

  /**
   * Sets the metadata for the database reference.
   * @param {*} meta - The metadata to be set.
   * @returns {TaskDBRef} - The updated TaskDBRef instance.
   */
  setMeta(meta) {
      this.meta = meta;
      return this;
  }
}

/**
* Represents a reference to a MongoDB database.
* @class
* @extends TaskDBRef
*/
export class TaskMongoDBRef extends TaskDBRef {
  /**
   * Creates an instance of TaskMongoDBRef.
   * @constructor
   * @param {string} id - The ID of the MongoDB database reference.
   * @param {string} [host=null] - The host information for MongoDB.
   * @returns {TaskMongoDBRef} - The TaskMongoDBRef instance.
   */
  constructor(id, host = null) {
      super(id, 'mongodb', host);
      return this;
  }
}

/**
* Represents a reference to a Mongoose model.
* @class
* @extends TaskMongoDBRef
*/
export class TaskMongooseRef extends TaskMongoDBRef {
  /**
   * Creates an instance of TaskMongooseRef.
   * @constructor
   * @param {*} record - The Mongoose model record.
   * @returns {TaskMongooseRef} - The TaskMongooseRef instance.
   */
  constructor(record) {
      super(record?._id, record?.db.host);
      this.setSource(record?.collection.name)
      this.setDatabase(record?.db.name);
      return this;
  }
}

/**
* Represents a reference to a bulk database operation.
* @class
* @extends TaskDBRef
*/
export class TaskBulkDBRef extends TaskDBRef {
  /**
   * Creates an instance of TaskBulkDBRef.
   * @constructor
   * @param {Array} [ids=[]] - The array of IDs for bulk database operation.
   * @param {string} [type=null] - The type of the database.
   * @param {string} [host=null] - The host information for the database.
   * @returns {TaskBulkDBRef} - The TaskBulkDBRef instance.
   */
  constructor(ids = [], type = null, host = null) {
      super();
      this.id = ids;
      this.identifier = 'bulk_dbref';
      this.cztr = true;
      if (host) {
          this.host = host;
      }
      if (type) {
          this.type = type;
      }
      return this;
  }

  /**
   * Sets the array of IDs for bulk database operation.
   * @param {Array} ids - The array of IDs to be set.
   * @returns {TaskBulkDBRef} - The updated TaskBulkDBRef instance.
   */
  setId(ids) {
      this.id = ids;
      return this;
  }

  /**
   * Adds an ID to the array of IDs for bulk database operation.
   * @param {*} id - The ID to be added.
   * @returns {TaskBulkDBRef} - The updated TaskBulkDBRef instance.
   */
  addId(id) {
      this.id.push(id);
      return this;
  }
}

/**
* Represents a reference to a bulk MongoDB database operation.
* @class
* @extends TaskBulkDBRef
*/
export class TaskBulkMongoDBRef extends TaskBulkDBRef {
  /**
   * Creates an instance of TaskBulkMongoDBRef.
   * @constructor
   * @param {Array} ids - The array of IDs for bulk MongoDB operation.
   * @param {string} [host=null] - The host information for MongoDB.
   * @returns {TaskBulkMongoDBRef} - The TaskBulkMongoDBRef instance.
   */
  constructor(ids, host = null) {
      super(ids, 'mongodb', host);
      return this;
  }
}
