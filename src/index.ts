
type Task = () => Promise<any>;
type QueueItem = { task: Task; resolve: () => any; reject: () => any };

interface QueueInterface {
    enqueue(task: Task): any;
}

class Queue implements QueueInterface {
    private queue: QueueItem[] = [];
    private isBusy: boolean = false;

    enqueue(task: Task): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
        });

        if (this.queue.length === 1 && !this.isBusy) {
            this.isBusy = true;
            this.next();
        }
        return promise;
    }
    private next(): void {
        if (!this.queue.length) return;
        this.isBusy = true;
        // @ts-ignore
        const { task, resolve, reject } = this.queue.shift();

        task()
            .then(resolve)
            .catch(reject)
            .finally(() => {
                if (!this.queue.length) {
                    this.isBusy = false;
                } else {
                    this.next();
                }
            });
    }
}

export default Queue