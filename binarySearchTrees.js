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
    return this.root;
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
    let rootNode = this.root;
    while (rootNode != null) {
      // stops execution after adding the value to the tree :
      if (value === rootNode.data) return;
      // if val > rootNode traverse the right tree :
      if (value > rootNode.data) {
        // adding rootNode value to the end of tree right side:
        if (rootNode.right === null) {
          rootNode.right = new Node(value);
        }
        rootNode = rootNode.right;
      }
      // if val < rootNode traverse the left tree :
      else {
        // adding rootNode value to the end of tree left side:
        if (rootNode.left === null) {
          rootNode.left = new Node(value);
        }
        rootNode = rootNode.left;
      }
    }
  }
  // returns the node with the given value :
  find(value) {
    let rootNode = this.root;
    while (rootNode != null) {
      if (value === rootNode.data) return rootNode; // return target node
      if (value > rootNode.data) {
        rootNode = rootNode.right;
      } else {
        rootNode = rootNode.left;
      }
    }
    return "value not found in the tree!";
  }
  // removes the given value node and organize structure of the tree! :
  remove(value) {
    let rootNode = this.root;
    let parentNode = null;
    let isLeft = true;
    while (rootNode != null) {
      if (rootNode === null) return;
      // case 1 : removing the root node which is a leaf! :
      if (
        rootNode.data === value &&
        rootNode.right === null &&
        rootNode.left === null
      ) {
        // checks which path (right/left) the parent went to the target node :
        if (isLeft) {
          parentNode.left = null;
        } else {
          parentNode.right = null;
        }
        return "the given value node removed!";
      }
      parentNode = rootNode; // stores parent node.
      // traverse left and right subtrees :
      if (value > rootNode.data) {
        isLeft = false; // stores parent path.
        rootNode = rootNode.right;
      } else {
        isLeft = true; // stores parent path.
        rootNode = rootNode.left;
      }
    }
    return "node not found!";
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
tree.insert(2);
tree.insert(0);
tree.insert(-1);
console.log(tree.find(7000));
console.log(tree.remove(-1));
tree.prettyPrint();
//
