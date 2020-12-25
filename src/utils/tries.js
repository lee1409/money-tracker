
let symbol = Symbol('$');
export default class Tries {
  constructor (sources) {
    if (typeof sources === 'undefined') {
      sources = [];
    }
    this.sources = sources;
    this.node = {};
    for (let i = 0; i < sources.length; i++) {
      this.add(sources[i], i)
    }
  }

  // Index pointing to the array
  add(string, index) {
    if (typeof index === 'undefined') {
      this.sources.push(string);
      index = this.sources.length - 1;
    }
    // Preprocess
    for (let value of this.preprocess(string)) {
      let node = this.node;
      for (let char of value) {
        if (!node[char]) {
          node[char] = {};
        }
        node = node[char];
      }
      node[symbol] = index;
    }
  }

  preprocess(string) {
    string = string.toLowerCase();
    let reg = new RegExp(/[\s\w]+/g);
    return reg.exec(string);
  }

  // Given a string, find array
  search(string) {
    string = this.preprocess(string);
    if (!string) {
      string = ""
    } else {
      string = string[0]
    }
    let node = this.node;
    for (let char of string) {
      if (!node[char]) {
        return [];
      }
      else {
        node = node[char];
      }
    }
    let arr = [];

    const dfs = (string, node) => {
      if (node.hasOwnProperty(symbol)) {
        arr.push(this.sources[node[symbol]]);
      }
      for (let [key, value] of Object.entries(node)) {
        dfs(string + key, value)
      }
    }
    dfs(string, node)
    return arr;
  }
};