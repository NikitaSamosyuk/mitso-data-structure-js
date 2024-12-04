const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class Node {
  constructor(data){
    this.data = data; // данные в узле
    this.left = null; // создаем пустую левую сторону
    this.right = null; // создаем пустую правую сторону
  }
}

module.exports = class BinarySearchTree {

  constructor(){
    this.rootNode = null;  // делаем корневой узел пустым
  }
  
  // возвращает **корневой узел** дерева
  root() {
    return this.rootNode;
  }

  // добавляет **узел** с `data` к дереву
  add(data) {
    const newNode = new Node(data); // новый узел

    if(!this.rootNode){
      this.rootNode = newNode; // если пустое, то это уже корень
      return;
    }

    let current = this.rootNode;
    while(true){
      if(data < current.data){ // если меньше корня => влево
        if(!current.left){ 
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if(data > current.data){ // если больше корня => право
        if(!current.right){
          current.right = newNode;
          return;
        }
        current = current.right; // если данные одинаковы, ничего не добавляем, ибо незачем
      } else {
        return;
      }
    }
  }

  // возвращает `true`, если **узел** с `data` имеется в дереве и `false`, если нет
  has(data) {
    let current = this.rootNode;
    while(current){
      if(data === current.data) return true;
      current = data < current.data ? current.left : current.right; 
    }
    return false; // не найден = FALSE 
  }

  // возвращает **узел** с `data`, если **узел** с `data` имеется в дереве и `null`, если нет
  find(data) {
    let current = this.rootNode;
    while(current){
      if(data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null; // не найден = НЕТУ
  }

  // удаляет **узел** с `data` из дерева, если **узел** с `data` имеется в дереве
  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }

  // Функция удаления для remove()
  _removeNode(node, data) {
    if(!node) return null; // если узел не null => delaem null
    if(data < node.data){
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (data > node.data){
      node.right = this._removeNode(node.right, data);
      return node;
    } else {

      // Не имеет потомка
      if(!node.left && !node.right){
        return null;
      }

      // 1 Потомок
      if(!node.left) return node.right; 
      if(!node.right) return node. left;

      // 2 Потомка
      let minRight = this._findMin(node.right); // находим минимальный потомок из 2х
      node.data = minRight.data;
      node.right = this._removeNode(node.right, minRight.data); // удалаем минимальный
      return node;
    }
  }

  // возвращает **минимальное** **значение**, хранящееся в дереве (или `null`, если у дерева нет **узлов**)
  min() {
    if(!this.rootNode) return null;
    let current = this.rootNode;
    while(current.left){ // нужно самый левый
      current = current.left;
    }
    return current.data;
  }

  // возвращает **максимальное** **значение**, хранящееся в дереве (или `null`, если у дерева нет **узлов**)
  max() {
    if(!this.rootNode) return null;

    let current = this.rootNode;
    while(current.right){ // нужно самый правый
      current = current.right;
    }
    return current.data;
  }

  // Функция для находжения минимального узла в _removeNode()
  _findMin(node){
    while(node.left){ // нужно самый левый
      node = node.left;
    }
    return node;
  }
};
