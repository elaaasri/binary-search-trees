# Binary Search Trees :

### Binary Search Trees Methods :

  - `buildTree(array)` returns a balanced binary tree.
  - `prettyPrint()` returns a structure visualizing the binary search tree.
  - `insert(value)` insert the given value to it's appropriate place as a leaf.
  - `deleteItem(value)` removes the given value node and organize the structure of the tree.
  - `find(value)` returns the node with the given value.
  - `levelOrder(callback)` traverse the tree in breadth-first-search traversal, returns an array that visits nodes tree level by level from left to right.
  - `preOrder(callback)` traverse the tree in depth-first-search, returns an array that visits nodes tree using Pre Order Traversal (root ==> left ==> right).
  - `inOrder(callback)` traverse the tree in depth-first-search, returns an array that visits nodes tree using In Order Traversal (left ==> root ==> right).
  - `postOrder(callback)` traverse the tree in depth-first-search, returns an array that visits nodes tree using Post Order Traversal (left ==> right ==> root).
  - `height(node)` returns the height of the tree (the number of edges in the longest path from the given node to its leaf node).
  - `depth(node)` returns the depth of a given node (the number of edges from the root to the given node).
  - `isBalanced()` returns true if the tree is balanced (a balanced tree is the difference between left and right subtrees should not be more 1), otherwise returns false.
  - `rebalance()` returns a balanced tree (rebalances an unbalanced tree).
