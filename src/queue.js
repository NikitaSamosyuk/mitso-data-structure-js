const { NotImplementedError } = require('../extensions/index.js');
const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
module.exports = class Queue {
  // Создаем конструктор для пустой очереди
  constructor(){
    this.head = null; // Начало
    this.tail = null; // Конец
  }

  // Возвращает первый элемент очереди
  getUnderlyingList() {
    return this.head;
  }

  // Добавляем новый элемент в очередь
  enqueue(value) {
    const newNode = new ListNode(value);
    // Если пуста, то переставляем head, tail 
    if(!this.tail){
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Если нет, то создаем новый конец и обновляем его
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  // Удаляем и возвращаем первый элемент очереди
  dequeue() {
    // Если пуста = undefined
    if(!this.head) return undefined;
    // Сохраняем первый элемент чтобы случайно не удалить(нам как-никак нужно вывести его)
    const value = this.head.value;
    // Следующий элемент становится первым
    this.head = this.head.next;
    // Очередь пуста = NULL
    if(!this.head){
      this.tail = null;
    }
    return value;

  }
};
