type Task<T> = () => Promise<T>;
type QueueItem<T> = {
  task: Task<T>;
  resolve: (v: any) => unknown;
  reject: () => any;
};

interface QueueInterface {
  enqueue<T>(task: Task<T>): Promise<T>;
}

class Queue implements QueueInterface {
  private queue: QueueItem<unknown>[] = [];
  private isBusy: boolean = false;

  enqueue<T>(task: Task<T>): Promise<T> {
    const promise = new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
    });

    if (!this.isEmpty() && !this.isBusy) {
      this.isBusy = true;
      this.next();
    }
    return promise as Promise<T>;
  }
  private isEmpty(): boolean {
    return this.queue.length === 0;
  }
  private next(): void {
    if (this.isEmpty()) return;
    this.isBusy = true;
    const { task, resolve, reject } = this.queue.shift() as QueueItem<unknown>;

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