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
  constructor() {
    this.root = null;
  }
  // returns balanced binary tree :
  buildTree(array) {
    const sortedArray = [...new Set(array.sort((a, b) => a - b))];
    const start = 0;
    const end = array.length - 1;
    const mid = Math.floor((start, end) / 2);
    // base case :
    if (start > end) return null;
    else {
      const rootNode = new Node(sortedArray[mid]);
      const left = sortedArray.slice(start, mid);
      const right = sortedArray.slice(mid + 1, end + 1);
      // recursive case :
      rootNode.left = this.buildTree(left);
      rootNode.right = this.buildTree(right);
      // storing root :
      this.root = rootNode;
    }
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
    let parentNode;
    let isLeft = true;
    while (rootNode != null) {
      // case 1 : removing target node which is a leaf (has no children)  :
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
        return `given value node ${value}, which is a leaf has removed!`;
      }
      // case 3 : removing target node which two childs! :
      else if (
        rootNode.data === value &&
        rootNode.right != null &&
        rootNode.left != null
      ) {
        let rightSubtree = rootNode.right;
        // case (3:1) : if the right child has no children :
        if (rightSubtree.right == null && rightSubtree.left == null) {
          rootNode.data = rightSubtree.data;
          rootNode.right = null;
        } else {
          let leftMost = rootNode.right;
          let leftMostChild;
          let leftMostParent;
          // traverse to left most value of target node :
          while (leftMost != null) {
            // case (3:2) : if left most value it's right subtree :
            if (leftMost.left == null && leftMost.right != null) {
              leftMostChild = leftMost.right;
              rootNode.data = leftMost.data;
              rootNode.right = leftMostChild;
            }
            // case (3:3) : if left most value has no childs :
            else if (leftMost.left == null && leftMost.right == null) {
              rootNode.data = leftMost.data;
              leftMostParent.left = null;
            }
            leftMostParent = leftMost; // storing left most parent.
            leftMost = leftMost.left; // traversing.
          }
        }
        return `given value node ${value}, which has 2 childs has removed!`;
      }
      // case 2 : removing target node which has one child :
      else if (
        rootNode.data === value &&
        (rootNode.right != null || rootNode.left != null)
      ) {
        let childNode;
        // storing child node :
        if (rootNode.left != null) {
          childNode = rootNode.left;
        } else {
          childNode = rootNode.right;
        }
        // assigning parent node to target node's child with the the correct path! :
        if (isLeft) {
          parentNode.left = childNode;
        } else {
          parentNode.right = childNode;
        }
        return `given value node ${value}, which has 1 child has removed!`;
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
    return "given value node not found!";
  }
  // traverse the tree in breadth-first-search (bfs) / level order traversal :
  // visits the nodes level by level from left to right :
  levelOrder() {
    let rootNode = this.root;
    // initializing a queue :
    let queue = [rootNode];
    let result = [];
    while (queue.length != 0) {
      let currentNode = queue.pop(); // gets reference from current queue and empty it! :
      // adding current node (left/right) to the queue (starting from left using unshift!) :
      if (currentNode.left != null) queue.unshift(currentNode.left);
      if (currentNode.right != null) queue.unshift(currentNode.right);
      result.push(currentNode.data); // storing data.
    }
    return result;
  }
  // traverses the tree in depth-first-search (DFS) :
  // returns an array using inOrder traversal (left ==> root ==> right) :
  inOrder(rootNode = this.root) {
    let result = [];
    // base case :
    if (rootNode == null) return result;
    else {
      // recursive case :
      result = result.concat(this.inOrder(rootNode.left)); // concat left subtree.
      result.push(rootNode.data); // storing result.
      result = result.concat(this.inOrder(rootNode.right)); // contat right subtree.
    }
    return result;
  }
  // - Preorder Traversal (DLR)  : root ==> left ==> right ==>  1, 2, 4, 5, 3
  // - Postrder Traversal (LRD)  : left ==> right ==> root ==>  4, 5, 2, 1, 3
}
// creates tree instance :
const tree = new Tree();
// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let arr = [1, 7, 4, 2, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// bst tree :
console.log(tree.buildTree(arr));
console.log("original array tree :");
tree.prettyPrint();
// adding some nodes :
tree.insert(7000);
tree.insert(2);
tree.insert(0);
tree.insert(-1);
tree.insert(6344);
tree.insert(20);
// bst methods :
console.log("#".repeat(20));
console.log("array tree after adding nodes :");
tree.prettyPrint();
console.log("#".repeat(20));
console.log("array tree after removing nodes :");
console.log(tree.remove(-1)); // removing a node with no childs case (1)!
console.log(tree.remove(3)); // removing a node with one child case (2)!
console.log(tree.remove(4)); // removing a node with two childs case (3)!
tree.prettyPrint();
console.log(tree.levelOrder());
console.log(tree.inOrder());
