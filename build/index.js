"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queue {
    constructor() {
        this.queue = [];
        this.isBusy = false;
    }
    enqueue(task) {
        const promise = new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
        });
        if (this.queue.length === 1 && !this.isBusy) {
            this.isBusy = true;
            this.next();
        }
        return promise;
    }
    next() {
        if (!this.queue.length)
            return;
        this.isBusy = true;
        // @ts-ignore
        const { task, resolve, reject } = this.queue.shift();
        task()
            .then(resolve)
            .catch(reject)
            .finally(() => {
            if (!this.queue.length) {
                this.isBusy = false;
            }
            else {
                this.next();
            }
        });
    }
}
exports.default = Queue;
//# sourceMappingURL=index.js.map