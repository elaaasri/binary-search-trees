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
    return null;
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
        return `given value node ${value}, which has no childs (leaf), been removed!`;
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
        return `given value node ${value}, which has two childs, been removed!`;
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
        return `given value node ${value}, which has one child, been removed!`;
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
  // returns an array using In Order Traversal (left ==> root ==> right) :
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
  // returns an array using Pre Order Traversal (root ==> left ==> right) :
  preOrder(rootNode = this.root) {
    let result = [];
    // base case :
    if (rootNode == null) return result;
    else {
      // recursive case :
      result.push(rootNode.data);
      result = result.concat(this.preOrder(rootNode.left)); // concat left subtree.
      result = result.concat(this.preOrder(rootNode.right)); // contat right subtree.
    }
    return result;
  }
  // returns an array using Post Order Traversal (left ==> right ==> root) :
  postOrder(rootNode = this.root) {
    let result = [];
    // base case :
    if (rootNode == null) return result;
    else {
      // recursive case :
      result = result.concat(this.postOrder(rootNode.left)); // concat left subtree.
      result = result.concat(this.postOrder(rootNode.right)); // contat right subtree.
      result.push(rootNode.data);
    }
    return result;
  }
  // returns the height (the number of edges in the longest path from a given node to a leaf node) :
  height(node) {
    // get the height of existed node :
    const getHeight = (existedNode) => {
      if (existedNode == null) {
        return 0;
      } else {
        let leftHeight = getHeight(existedNode.left); // storing left height.
        let rightHeight = getHeight(existedNode.right); // storing right height.
        // get longest path to a leaf node on each edge and adding +1 :
        // then returns the max height between left and right subtrees :
        return Math.max(leftHeight, rightHeight) + 1;
      }
    };

    // returns a node object if a node is found :
    let findingExistingNode = this.find(node);
    // if a node existed :
    if (findingExistingNode != null) {
      return getHeight(findingExistingNode);
    } else {
      return "node not found!";
    }
  }
  // returns the depth of a node (the number of edges from the root to the given node) :
  depth(node) {
    const getDepth = (rootNode) => {
      if (rootNode == findingExistingNode) {
        return 0;
      } else {
        if (rootNode.data > node) {
          return getDepth(rootNode.left) + 1; // get depth of left subtrees.
        }
        if (rootNode.data < node) {
          return getDepth(rootNode.right) + 1; // get depth of right subtrees.
        }
      }
    };
    let findingExistingNode = this.find(node);
    // if a node existed :
    if (findingExistingNode != null) {
      return `depth of node (${node}) is : ${getDepth(this.root)}`;
    } else {
      return "node not found!";
    }
  }
  // checks if the tree is balanced (a balanced tree is the difference between left and right subtrees should not be more 1!) :
  isBalanced() {
    let rootNode = this.root;
    // gets height of the longest path of left and right subtrees :
    let leftPathHeight = rootNode.left ? this.height(rootNode.left.data) : 0; // if there is no left subtree => assigns height of leftPathHeight to 0.
    let rightPathHeight = rootNode.right ? this.height(rootNode.right.data) : 0; // if there is no right subtree =>  assigns height of rightPathHeight to 0.
    let difference = leftPathHeight - rightPathHeight;
    // checks difference between left and right subtrees to not be more that 1! :
    return difference >= -1 && difference <= 1 ? true : false;
  }
  reBalance() {
    let isTreeBalanced = this.isBalanced();
    let newUnbalancedArr = [];
    const getUnbalancedTreeArr = (rootNode = this.root) => {
      if (rootNode == null) return;
      else {
        newUnbalancedArr.push(rootNode.data);
        getUnbalancedTreeArr(rootNode.left);
        getUnbalancedTreeArr(rootNode.right);
      }
      return newUnbalancedArr;
    };
    return isTreeBalanced
      ? "Tree is already balanced!"
      : this.buildTree(getUnbalancedTreeArr());
  }
}
// get random array of length 20 :
function getRandomArr() {
  let randomArr = [];
  for (let i = 0; i < 20; i++) {
    randomArr.push(Math.floor(Math.random() * 101));
  }
  return randomArr;
}
// creates tree instance :
const tree = new Tree();
// let arr = getRandomArr();
let arr = [1, 7, 4, 2, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// bst tree :
console.log("original tree :");
console.log(tree.buildTree(arr));
tree.prettyPrint();
console.log("#".repeat(30));
console.log("is tree balanced ?!", tree.isBalanced());
console.log("Level Order Traversal :", tree.levelOrder()); // returns Breadth-First Traversal.
console.log("In Order Traversal    :", tree.inOrder()); // returns In Order Traversal.
console.log("Pre Order Traversal   :", tree.preOrder()); // returns Pre Order Traversal.
console.log("Post Order Traversal  :", tree.postOrder()); // returns Post Order Traversal.
// adding and removing some nodes :
console.log("#".repeat(30));
console.log("tree after adding and removing some node :");
tree.insert(200);
tree.insert(300);
tree.insert(400);
tree.insert(500);
console.log("removing some nodes :");
console.log("removing case (1) :", tree.remove(4)); // removing a node with no childs case (1)!
console.log("removing case (2) :", tree.remove(5)); // removing a node with one child case (2)!
console.log("removing case (2) :", tree.remove(3)); // removing a node with two childs case (3)!
console.log("updated tree :");
tree.prettyPrint();
console.log("#".repeat(30));
console.log("checking the tree after adding and removing :");
console.log("is tree balanced ?!", tree.isBalanced());
console.log("rebalance the tree:", tree.reBalance());
console.log("is tree balanced ?!", tree.isBalanced());
console.log("tree after balancing it :");
tree.prettyPrint();
console.log("Level Order Traversal :", tree.levelOrder()); // returns Breadth-First Traversal.
console.log("In Order Traversal    :", tree.inOrder()); // returns In Order Traversal.
console.log("Pre Order Traversal   :", tree.preOrder()); // returns Pre Order Traversal.
console.log("Post Order Traversal  :", tree.postOrder()); // returns Post Order Traversal.
