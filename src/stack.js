const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement the Stack with a given interface via array.
 *
 * @example
 * const stack = new Stack();
 *
 * stack.push(1); // adds the element to the stack
 * stack.peek(); // returns the peek, but doesn't delete it, returns 1
 * stack.pop(); // returns the top element from stack and deletes it, returns 1
 * stack.pop(); // undefined
 *
 */
module.exports = class Stack {
  // Создаем конструктор для хранения массива элементов Стека
  constructor(){
    this.items = [];
  }

  // Добавляет элемент в стек (в начало стека => конец массива)
  push(element) {
    this.items.push(element);
  }
  
  // Удалаяет и возвращает первый элемент в стеке (последний в массиве)
  pop() {
    return this.items.pop();
  }

  // Возвращаем первый элемент в стеке, но не удалаем - незачем
  peek() {
    return this.items[this.items.length - 1]; // Т.К. массив имеет 0, уменьшаем на 1
  }
};
