/**
 * Represents a generic storage reference.
 * @class
 */
export class TaskStorageRef {
    /**
     * Creates an instance of TaskStorageRef.
     * @constructor
     * @param {*} object - The object to be stored.
     * @param {string} [type=null] - The type of storage.
     * @param {string} [host=null] - The host information for remote storage.
     * @returns {TaskStorageRef} - The TaskStorageRef instance.
     */
    constructor(object, type = null, host = null) {
        this.object = object;
        this.identifier = 'storageref';
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
     * Sets the container for the storage reference.
     * @param {*} container - The container to be set.
     * @returns {TaskStorageRef} - The updated TaskStorageRef instance.
     */
    setContainer(container) {
        this.container = container;
        return this;
    }

    /**
     * Sets the object to be stored.
     * @param {*} object - The object to be set.
     * @returns {TaskStorageRef} - The updated TaskStorageRef instance.
     */
    setObject(object) {
        this.object = object;
        return this;
    }

    /**
     * Sets the metadata for the storage reference.
     * @param {*} meta - The metadata to be set.
     * @returns {TaskStorageRef} - The updated TaskStorageRef instance.
     */
    setMeta(meta) {
        this.meta = meta;
        return this;
    }
}

/**
 * Represents a reference to a local storage.
 * @class
 * @extends TaskStorageRef
 */
export class TaskLocalStorageRef extends TaskStorageRef {
    /**
     * Creates an instance of TaskLocalStorageRef.
     * @constructor
     * @param {*} object - The object to be stored.
     * @param {*} container - The container for local storage.
     * @returns {TaskLocalStorageRef} - The TaskLocalStorageRef instance.
     */
    constructor(object, container) {
        super(object, 'local');
        this.setContainer(container);
        return this;
    }
}

/**
 * Represents a reference to a remote storage.
 * @class
 * @extends TaskStorageRef
 */
export class TaskRemoteStorageRef extends TaskStorageRef {
    /**
     * Creates an instance of TaskRemoteStorageRef.
     * @constructor
     * @param {*} object - The object to be stored.
     * @param {string} host - The host information for remote storage.
     * @returns {TaskRemoteStorageRef} - The TaskRemoteStorageRef instance.
     * @throws {Error} - Throws an error if host information is missing.
     */
    constructor(object, host) {
        if (!host) {
            throw new Error(`Host is mandatory for Remote Storage Reference. Please provide the required host information.`);
        }
        super(object, 'remote', host);
        return this;
    }
}

/**
 * Represents a reference to an Amazon S3 storage.
 * @class
 * @extends TaskStorageRef
 */
export class TaskS3StorageRef extends TaskStorageRef {
    /**
     * Creates an instance of TaskS3StorageRef.
     * @constructor
     * @param {*} object - The object to be stored.
     * @param {*} container - The container (bucket) for Amazon S3 storage.
     * @returns {TaskS3StorageRef} - The TaskS3StorageRef instance.
     * @throws {Error} - Throws an error if bucket information is missing.
     */
    constructor(object, container) {
        super(object, 's3');
        if (!container) {
            throw new Error(`Bucket is mandatory for S3 Storage Reference. Please provide the required bucket/container information.`);
        }
        this.container = container;
        return this;
    }

    /**
     * Sets the region for Amazon S3 storage.
     * @param {string} region - The region to be set.
     * @returns {TaskS3StorageRef} - The updated TaskS3StorageRef instance.
     */
    setRegion(region) {
        if (!this.meta) {
            this.meta = {};
        }
        this.meta.region = region;
        return this;
    }
}

/**
 * Represents a reference to Google Cloud Storage (GCS).
 * @class
 * @extends TaskStorageRef
 */
export class TaskGCSStorageRef extends TaskStorageRef {
    /**
     * Creates an instance of TaskGCSStorageRef.
     * @constructor
     * @param {*} object - The object to be stored.
     * @param {*} container - The container (bucket) for Google Cloud Storage.
     * @returns {TaskGCSStorageRef} - The TaskGCSStorageRef instance.
     * @throws {Error} - Throws an error if bucket information is missing.
     */
    constructor(object, container) {
        super(object, 'gcs');
        if (!container) {
            throw new Error(`Bucket is mandatory for GCS Storage Reference. Please provide the required bucket/container information.`);
        }
        this.container = container;
        return this;
    }
}

/**
 * Represents a reference to FTP storage.
 * @class
 * @extends TaskStorageRef
 */
export class TaskFTPStorageRef extends TaskStorageRef {
    /**
     * Creates an instance of TaskFTPStorageRef.
     * @constructor
     * @param {*} object - The object to be stored.
     * @param {string} host - The host information for FTP storage.
     * @returns {TaskFTPStorageRef} - The TaskFTPStorageRef instance.
     * @throws {Error} - Throws an error if host information is missing.
     */
    constructor(object, host) {
        super(object, 'ftp', host);
        if (!host) {
            throw new Error(`Host is mandatory for FTP Storage Reference. Please provide the required host information.`);
        }
        return this;
    }

    /**
     * Sets the username for FTP storage.
     * @param {string} username - The username to be set.
     * @returns {TaskFTPStorageRef} - The updated TaskFTPStorageRef instance.
     */
    setUsername(username) {
        if (!this.meta) {
            this.meta = {};
        }
        this.meta.username = username;
        return this;
    }

    /**
     * Sets the password for FTP storage.
     * @param {string} password - The password to be set.
     * @returns {TaskFTPStorageRef} - The updated TaskFTPStorageRef instance.
     */
    setPassword(password) {
        if (!this.meta) {
            this.meta = {};
        }
        this.meta.password = password;
        return this;
    }

    /**
     * Sets the port for FTP storage.
     * @param {number} port - The port to be set.
     * @returns {TaskFTPStorageRef} - The updated TaskFTPStorageRef instance.
     */
    setPort(port) {
        if (!this.meta) {
            this.meta = {};
        }
        this.meta.port = port;
        return this;
    }
}
