
# Task-Queue

Minimal asynchronous tasks solving queue with zero dependences


## Usage

```sh
$> npm install https://github.com/adefrutoscasado/task-queue
```

```js
// app.js
import TaskQueue from 'task-queue'

const updateDatabase = async id => {
  const startTime = new Date()
  await randomDelay()
  const endTime = new Date()
  console.log(
    `update ${id}@${startTime.toISOString()} finished@${endTime.toISOString()}`
  )
  return { id }
}

const taskQueue = new Queue()

taskQueue.enqueue(() => updateDatabase(1)) // returns {id: 1}
taskQueue.enqueue(() => updateDatabase(2)) // returns {id: 2}
```

The tasks are always solved on a first-come, first-served basis and never solved simultaneously:
```sh
update 1@2020-01-19T20:15:46.666Z finished@2020-01-19T20:15:47.459Z 
update 2@2020-01-19T20:15:47.459Z finished@2020-01-19T20:15:47.476Z 
```

## License

MIT
