# @task-master/task-queue

A comprehensive task management module for Node.js

## Installation

```bash
npm install @task-master/task-queue
```

## Usage

### TaskDBRef

Represents a reference to a database.

#### Constructor

```javascript
const { TaskDBRef } = require('@task-master/task-queue');

// Example: Creating a reference to a MongoDB database
const dbRef = new TaskDBRef('mongodb://localhost:27017/mydb');
```

### TaskMongoDBRef

Represents a reference to a MongoDB database.

#### Constructor

```javascript
const { TaskMongoDBRef } = require('@task-master/task-queue');

// Example: Creating a reference to a MongoDB collection
const mongoDBRef = new TaskMongoDBRef('my_collection');
```

### TaskMongooseRef

Represents a reference to a Mongoose model.

#### Constructor

```javascript
const { TaskMongooseRef } = require('@task-master/task-queue');
const mongoose = require('mongoose');

// Example: Creating a reference to a Mongoose model
const MyModel = mongoose.model('MyModel', { name: String });
const mongooseRef = new TaskMongooseRef(MyModel);
```

### TaskBulkDBRef

Represents a reference to a bulk database operation.

#### Constructor

```javascript
const { TaskBulkDBRef } = require('@task-master/task-queue');

// Example: Creating a reference to multiple database records
const bulkDBRef = new TaskBulkDBRef(['id1', 'id2', 'id3']);
```

### TaskBulkMongoDBRef

Represents a reference to a bulk MongoDB database operation.

#### Constructor

```javascript
const { TaskBulkMongoDBRef } = require('@task-master/task-queue');

// Example: Creating a reference to multiple MongoDB records
const bulkMongoDBRef = new TaskBulkMongoDBRef(['mongodb_id1', 'mongodb_id2']);
```

### TaskStorageRef

Represents a generic storage reference.

#### Constructor

```javascript
const { TaskStorageRef } = require('@task-master/task-queue');

// Example: Creating a generic storage reference
const storageRef = new TaskStorageRef(dataObject);
```

### TaskLocalStorageRef

Represents a reference to a local storage.

#### Constructor

```javascript
const { TaskLocalStorageRef } = require('@task-master/task-queue');

// Example: Creating a reference to local storage
const localStorageRef = new TaskLocalStorageRef(dataObject, 'container_name');
```

### TaskRemoteStorageRef

Represents a reference to a remote storage.

#### Constructor

```javascript
const { TaskRemoteStorageRef } = require('@task-master/task-queue');

// Example: Creating a reference to remote storage
const remoteStorageRef = new TaskRemoteStorageRef(dataObject, 'remote_host');
```

### TaskS3StorageRef

Represents a reference to an Amazon S3 storage.

#### Constructor

```javascript
const { TaskS3StorageRef } = require('@task-master/task-queue');

// Example: Creating a reference to Amazon S3 storage
const s3StorageRef = new TaskS3StorageRef(dataObject, 's3_bucket');
s3StorageRef.setRegion('us-east-1');
```

### TaskGCSStorageRef

Represents a reference to Google Cloud Storage (GCS).

#### Constructor

```javascript
const { TaskGCSStorageRef } = require('@task-master/task-queue');

// Example: Creating a reference to Google Cloud Storage (GCS)
const gcsStorageRef = new TaskGCSStorageRef(dataObject, 'gcs_bucket');
```

### TaskFTPStorageRef

Represents a reference to FTP storage.

#### Constructor

```javascript
const { TaskFTPStorageRef } = require('@task-master/task-queue');

// Example: Creating a reference to FTP storage
const ftpStorageRef = new TaskFTPStorageRef(dataObject, 'ftp_host');
ftpStorageRef.setUsername('username').setPassword('password').setPort(21);
```

### Task

Represents a task in a task management system.

#### Constructor

```javascript
const { Task } = require('@task-master/task-queue');

// Example: Creating a task
const task = new Task('task_id');
task.setStatus('in_progress');
task.setPriority(2);
```

### TaskCreator

A class responsible for creating and managing tasks.

#### Constructor

```javascript
const { TaskCreator } = require('@task-master/task-queue');

// Example: Creating a task creator
const taskCreator = new TaskCreator({ taskType: 'main', immediate: true });
taskCreator.setSchedule('*/5 * * * *'); // Run every 5 minutes
```

### TaskPayload

Represents the payload for a task.

#### Constructor

```javascript
const { TaskPayload } = require('@task-master/task-queue');

// Example: Creating a task payload
const payload = new TaskPayload();
payload.setBody({ message: 'Task payload message' });
```

### TaskWorker

Represents a generic task worker responsible for managing task execution and state.

#### Constructor

```javascript
const { TaskWorker } = require('@task-master/task-queue');

// Example: Creating a task worker
const taskWorker = new TaskWorker(task);
taskWorker.setProgress(50); // Set progress to 50%
```

## License

This project is licensed under the GNU AGPLv3 License - see the [LICENSE.md](LICENSE.md) file for details.
