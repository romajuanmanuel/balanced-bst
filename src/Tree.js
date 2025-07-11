import { Node } from './Node.js';

export class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(array) {
    if (array.length === 0) return null;
    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));
    return root;
  }

  insert(value, root = this.root) {
    if (!root) return new Node(value);
    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }
    return root;
  }

  deleteItem(value, root = this.root) {
    if (!root) return null;

    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else {
      // Node with one or no children
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      // Node with two children
      const min = this.findMin(root.right);
      root.data = min.data;
      root.right = this.deleteItem(min.data, root.right);
    }

    return root;
  }

  findMin(node) {
    while (node.left) node = node.left;
    return node;
  }

  find(value, root = this.root) {
    if (!root) return null;
    if (value < root.data) return this.find(value, root.left);
    if (value > root.data) return this.find(value, root.right);
    return root;
  }

  levelOrderForEach(callback) {
    if (!callback) throw new Error("Callback required");
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("Callback required");
    if (!node) return;
    this.inOrderForEach(callback, node.left);
    callback(node);
    this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("Callback required");
    if (!node) return;
    callback(node);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("Callback required");
    if (!node) return;
    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node);
  }

  height(node = this.root) {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(value, node = this.root, currentDepth = 0) {
    if (!node) return null;
    if (node.data === value) return currentDepth;
    if (value < node.data) return this.depth(value, node.left, currentDepth + 1);
    if (value > node.data) return this.depth(value, node.right, currentDepth + 1);
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    const balanced =
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right);

    return balanced;
  }

  rebalance() {
    const nodes = [];
    this.inOrderForEach(node => nodes.push(node.data));
    this.root = this.buildTree(nodes);
  }
}
