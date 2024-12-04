const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined with this interface
 * function ListNode(x) {
 *   this.value = x;
 *   this.next = null;
 * }
 */

module.exports = function removeKFromList(l, k) {

// Если первый элемент равен k, удаляем его
while (l !== null && l.value === k) {
  l = l.next;
}

// Если после того как удалили первый элемент список = 0, то возврат null
if (l === null) {
  return null;
}

// Обходим то что осталось или то что не трогали (как получится)
let current = l;

// Проходим список
while (current.next !== null) {
  // если след.узел - к, то пропуск хода и не записываем
  if(current.next.value === k) {
    current.next = current.next.next;
  } else {
    // Если не так, то всё норм, идет дальше, до первого столкновения PVE
    current = current.next;
  }
}

// To chto izmenili vozvrat nado
return l;
}
