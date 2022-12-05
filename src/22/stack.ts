export class Node<T> {
  constructor(value: T, next?: Node<T>) {
    this.value = value;
    this.next = next;
  }

  value: T;
  next?: Node<T>;
}
// tail -> N <- N <- N <- N <- head
export class Stack<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  push(item: T): void {
    const node = new Node(item, this.head);

    // tail -> N <- head
    if (this.length === 0) {
      this.tail = node;
    }

    this.head = node;
    this.length++;
  }

  pop(): T | undefined {
    if (!this.head) return;
    this.length--;
    const head = this.head;

    // tail -> N <- head
    if (this.head === this.tail) {
      this.head = undefined;
      this.tail = undefined;

      return head.value;
    }

    this.head = head.next;
    head.next = undefined;

    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}
