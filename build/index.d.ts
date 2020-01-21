declare type Task<T> = () => Promise<T>;
interface QueueInterface {
    enqueue<T>(task: Task<T>): Promise<T>;
}
declare class Queue implements QueueInterface {
    private queue;
    private isBusy;
    enqueue<T>(task: Task<T>): Promise<T>;
    private isEmpty;
    private next;
}
export default Queue;
