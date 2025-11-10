# Balanced Binary Search Tree Project

A project implementing a Balanced Binary Search Tree (BST) from scratch in JavaScript.  
This assignment demonstrates the creation, traversal, and manipulation of a self-balancing BST using core data structure principles.

---

## Introduction

Binary Search Trees (BSTs) are hierarchical data structures that organize data for efficient lookup, insertion, and deletion.

In a BST:
- Each node contains data.
- The left child contains values lower than the parent.
- The right child contains values higher than the parent.
- Nodes with no children are called leaf nodes.

However, an unbalanced BST can degrade performance to **O(n)**.  
To maintain efficiency, this project focuses on **balanced BSTs**, which guarantee **O(log n)** operations for insertion, deletion, and lookup.

---

## Project Overview

You will build a Balanced Binary Search Tree that supports:
- Construction from an array
- Insertion, deletion, and search
- Multiple traversal algorithms
- Balance checking and rebalancing

The project consists of:
- A `Node` class
- A `Tree` class
- Utility functions for traversals and balance management
- A driver script to demonstrate functionality

---

## Node Class

Represents a single node in the tree.

**Attributes:**
- `data`: The value stored in the node
- `left`: Reference to the left child node
- `right`: Reference to the right child node

---

## Tree Class

Main class for handling the BST.

**Attributes:**
- `root`: Stores the root node (generated from `buildTree()`)

**Core Methods:**

| Method | Description |
|--------|-------------|
| `buildTree(array)` | Builds a balanced BST from an array (sorted and duplicate-free). |
| `insert(value)` | Inserts a value into the BST while maintaining order. |
| `deleteItem(value)` | Removes a node while preserving structure. |
| `find(value)` | Returns the node containing the specified value. |
| `levelOrderForEach(callback)` | Traverses the tree in breadth-first order. |
| `inOrderForEach(callback)` | Traverses nodes in left → root → right order. |
| `preOrderForEach(callback)` | Traverses nodes in root → left → right order. |
| `postOrderForEach(callback)` | Traverses nodes in left → right → root order. |
| `height(value)` | Returns the height (longest downward path) from the given node. |
| `depth(value)` | Returns the depth (distance from root) of a node. |
| `isBalanced()` | Checks if the entire tree is balanced. |
| `rebalance()` | Rebalances an unbalanced tree. |

---

## Helper Function

### `prettyPrint(node)`

Prints a visual representation of the tree to the console for debugging or illustration.

```js
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
