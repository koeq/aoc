class Node<T> {
  value: T;
  next?: Node<T>;

  constructor(value: T, next?: Node<T>) {
    this.value = value;
    this.next = next;
  }
}

// QUEUE
// <---              <---
// head -> N -> N <- tail
// head -> N <- tail
export class Queue<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
  }

  enqueue(value: T): void {
    const node = new Node(value);

    if (!this.tail || !this.head) {
      this.head = node;
      this.tail = node;
      this.length++;

      return;
    }

    const prevTail = this.tail;
    this.tail = node;
    prevTail.next = node;
    this.length++;
  }

  dequeue(): T | undefined {
    if (!this.head || !this.tail) {
      return;
    }

    const prevHead = this.head;

    if (this.length === 1) {
      this.head = undefined;
      this.tail = undefined;
      this.length--;

      return prevHead.value;
    }

    this.head = prevHead.next;
    prevHead.next = undefined;
    this.length--;

    return prevHead.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}
