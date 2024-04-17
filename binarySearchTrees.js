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
  buildTree(array) {
    // const sortedArray = [...new Set(array.sort((a, b) => a - b))];
    // console.log(sortedArray);

    const start = 0;
    const end = array.length - 1;
    const mid = Math.floor((start, end) / 2);

    // base case :
    if (start > end) return null;
    // recursive case :
    const rootNode = new Node(array[mid]);
    const left = array.slice(start, mid);
    const right = array.slice(mid + 1, end + 1);
    rootNode.left = this.buildTree(left);
    rootNode.right = this.buildTree(right);

    return rootNode;
  }
}
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree();
console.log(tree.buildTree(arr));
