import { Tree } from './Tree.js';

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// Función para crear array aleatorio
const randomArray = (n = 15, max = 100) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * max));

// Crear árbol balanceado
const tree = new Tree(randomArray());
console.log("Balanced:", tree.isBalanced());
prettyPrint(tree.root);

// Mostrar recorridos
console.log("Level order:");
tree.levelOrderForEach(node => console.log(node.data));

console.log("Pre-order:");
tree.preOrderForEach(node => console.log(node.data));

console.log("In-order:");
tree.inOrderForEach(node => console.log(node.data));

console.log("Post-order:");
tree.postOrderForEach(node => console.log(node.data));

// Desbalancear el árbol
tree.insert(120);
tree.insert(130);
tree.insert(140);
tree.insert(150);

console.log("Balanced after insertions?:", tree.isBalanced());
prettyPrint(tree.root);

// Rebalancear
tree.rebalance();
console.log("Balanced after rebalance?:", tree.isBalanced());
prettyPrint(tree.root);
