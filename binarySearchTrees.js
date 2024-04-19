// node class :
class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left || null;
    this.right = right || null;
  }
}
// tree class :
class Tree {
  constructor(root) {
    this.root = root;
  }
  // returns balanced binary tree :
  buildTree(array) {
    const sortedArray = [...new Set(array.sort((a, b) => a - b))];
    const start = 0;
    const end = array.length - 1;
    const mid = Math.floor((start, end) / 2);
    // base case :
    if (start > end) return null;
    const rootNode = new Node(sortedArray[mid]);
    const left = sortedArray.slice(start, mid);
    const right = sortedArray.slice(mid + 1, end + 1);
    // recursive case :
    rootNode.left = this.buildTree(left);
    rootNode.right = this.buildTree(right);
    // stores root :
    this.root = rootNode;
    return rootNode;
  }
  // return a structure visualizing binary search tree  :
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  // insert given value to it's appropriate place as a leaf :
  insert(value) {
    let root = this.root;
    while (root != null) {
      // stops execution after adding the value to the tree :
      if (value === root.data) return;
      // if val > root traverse the right tree :
      if (value > root.data) {
        // adding node value to the end of tree right side:
        if (root.right === null) {
          root.right = new Node(value);
        }
        root = root.right;
      }
      // if val < root traverse the left tree :
      else {
        // adding node value to the end of tree left side:
        if (root.left === null) {
          root.left = new Node(value);
        }
        root = root.left;
      }
    }
  }
}
// creates tree instance :
const tree = new Tree();
// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// bst methods :
console.log(tree.buildTree(arr));
console.log("#".repeat(20));
tree.prettyPrint();
// adding some nodes :
console.log("#".repeat(20));
tree.insert(7000);
tree.insert(20);
tree.insert(0);
tree.insert(-1);
tree.prettyPrint();
