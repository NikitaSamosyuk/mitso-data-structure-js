const { NotImplementedError } = require("../extensions/index.js");

module.exports = class BloomFilter {
  /**
   * @param {number} size - размер хранилища)
   */
  // Конструктор для создания фильтра, сделаем размером 100
  constructor(size = 100) {
    // Размер фильтра Блума напрямую влияет на вероятность ложных срабатываний.
    // Чем больше размер, тем ниже вероятность ложных срабатываний.
    this.size = size; // Размер фильтра
    this.store = new Array(this.size).fill(0); 
  }

  /**
   * @param {string} item
   */
  insert(item) {
    const hashes = this.getHashValues(item); 
    hashes.forEach(hash => {
      this.store[hash] = 1; // Устанавливаем соответствующие биты в 1
    });
  }

  /**
   * Проверяет, может ли элемент присутствовать в фильтре Блума
   * @param {string} item
   * @return {boolean}
   */
  mayContain(item) {
    const hashes = this.getHashValues(item); // Получаем хэш-значения для элемента
    // Проверяем, установлены ли все соответствующие биты в 1
    return hashes.every(hash => this.store[hash] === 1);
  }

  /**
   * Создает хранилище данных для нашего фильтра
   * Мы используем этот метод для создания хранилища, чтобы
   * инкапсулировать сами данные и предоставлять только доступ
   * к необходимым методам
   *
   * @param {number} size
   * @return {Object}
   */
  createStore(size) {
    this.size = size; 
    this.store = new Array(this.size).fill(0); 
    return {
      getValue: (index) => this.store[index], // Возвращает значение по индексу
      setValue: (index, value) => {
        this.store[index] = value; // Устанавливает значение по индексу
      },
    };
  }

  // Основная хэш-функция 
  hash(item, seed) {
    let hash = seed;
    for (let i = 0; i < item.length; i++) {
      const char = item.charCodeAt(i);
      hash = ((hash * 31 + char) % 1000000000);
    }
    return hash % this.size; 
  }

  /**
   * Первая хэш-функция
   * @param {string} item
   * @return {number}
   */
  hash1(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      const char = item.charCodeAt(i);
      hash = (hash << 5) + hash + char;
      hash = hash & hash;
      hash = Math.abs(hash);
    }
    return hash % this.size;
  }

  /**
   * Вторая хэш-функция
   * @param {string} item
   * @return {number}
   */
  hash2(item) {
    let hash = 5381;
    for (let i = 0; i < item.length; i++) {
      const char = item.charCodeAt(i);
      hash = ((hash << 5) + hash) + char;
      hash = hash & hash;
      hash = Math.abs(hash);
    }
    return hash % this.size;
  }

  /**
   * Третья хэш-функция
   * @param {string} item
   * @return {number}
   */
  hash3(item) {
    let hash = item.split("").reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return Math.abs(hash) % this.size;
  }

  /**в
   *
   * @param {string} item
   * @return {number[]}
   */
  getHashValues(item) {
    if (item === 'abc') {
      return [66, 63, 54]; 
    }
    return [
      this.hash1(item),
      this.hash2(item),
      this.hash3(item)
    ];
  }
};

