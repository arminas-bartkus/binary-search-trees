let testArray = [100, 20, 30, 100, 150, 200, 300];

class Node {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  sortArray(unsortedArray) {
    let sortedArray = unsortedArray.sort((a, b) => {
      return a - b;
    });

    let newArrayWithoutDupes = [];
    for (let i = 0; i <= sortedArray.length; i++) {
      if (sortedArray[i] !== sortedArray[i + 1]) {
        newArrayWithoutDupes.push(sortedArray[i]);
      }
    }

    sortedArray = newArrayWithoutDupes;

    return sortedArray;
  }

  buildTree(unsortedArray) {
    let sortedArray = this.sortArray(unsortedArray);

    if (sortedArray.length === 0) return null;

    let mid = Math.floor(sortedArray.length / 2);
    let node = new Node(sortedArray[mid]);

    node.leftChild = this.buildTree(sortedArray.slice(0, mid));
    node.rightChild = this.buildTree(sortedArray.slice(mid + 1));

    return node;
  }

  insert(root, key) {
    if (root === null || root === undefined) return new Node(key);

    if (key < root.data) {
      root.leftChild = this.insert(root.leftChild, key);
    } else {
      root.rightChild = this.insert(root.rightChild, key);
    }

    return root;

    // let valueToCompare = new Node(value);

    // let currentRef = this.root;
    // let leftEndReached = false;
    // let rightEndReached = false;

    // while (true) {

    //   if (
    //     currentRef.data > valueToCompare.data &&
    //     currentRef.leftChild !== null
    //   ) {
    //     currentRef = currentRef.leftChild;
    //   } else if (
    //     currentRef.data < valueToCompare.data &&
    //     currentRef.rightChild !== null
    //   ) {
    //     currentRef = currentRef.rightChild;
    //   } else if (currentRef.rightChild === null) {
    //     rightEndReached = true;
    //     console.log("1");
    //     break;
    //   } else if (currentRef.leftChild === null) {
    //     console.log("2");
    //     leftEndReached = true;
    //     break;
    //   }
    // }

    // console.log(currentRef)
    // currentRef.leftChild = valueToCompare;

    // console.log(this.root)

    // // if (rightEndReached) {
    // //   console.log("here");
    // //   currentRef.rightChild = valueToCompare;
    // // } else if (leftEndReached) {
    // //   currentRef.leftChild = valueToCompare;
    // // }
  }

  getSuccessor(currentRef) {
    currentRef = currentRef.rightChild;
    while (currentRef !== null && currentRef.leftChild !== null) {
      currentRef = currentRef.leftChild;
    }
    return currentRef;
  }

  deleteItem(root, value) {
    if (root === null) {
      return root;
    }

    if (root.data > value) {
      root.leftChild = this.deleteItem(root.leftChild, value);
    } else if (root.data < value) {
      root.rightChild = this.deleteItem(root.rightChild, value);
    } else {
      if (root.leftChild === null) {
        return root.rightChild;
      }
      if (root.rightChild === null) {
        return root.leftChild;
      }

      const succ = this.getSuccessor(root);
      root.data = succ.data;
      root.rightChild = this.deleteItem(root.rightChild, succ.data);
    }
    return root;
  }

  find(root, value) {
    if (root === null) {
      console.log("Value not found");
      return;
    } else if (root.data === value) {
      console.log(root);
      return root;
    }

    if (root.data > value) {
      root.leftChild = this.find(root.leftChild, value);
    } else if (root.data < value) {
      root.rightChild = this.find(root.rightChild, value);
    } else {
      if (root.leftChild === null) {
        return root.rightChild;
      }
      if (root.rightChild === null) {
        return root.leftChild;
      }
    }
    return root;
  }

  levelOrderForEach(root, level, result) {
    if (root === null || root === undefined) return;

    if (result.length <= level) {
      result.push([]);
    }

    result[level].push(root.data);

    this.levelOrderForEach(root.leftChild, level + 1, result);
    this.levelOrderForEach(root.rightChild, level + 1, result);
  }

  levelOrder(root) {
    const result = [];

    this.levelOrderForEach(root, 0, result);
    return result;
  }

  inOrderForEach(root) {
    if (root) {
      this.inOrderForEach(root.leftChild);
      console.log(root.data);
      this.inOrderForEach(root.rightChild);
    }
  }

  preOrderForEach(root) {
    if (root === null || root === undefined) return;

    console.log(root.data + " ");
    this.preOrderForEach(root.leftChild);
    this.preOrderForEach(root.rightChild);
  }

  postOrderForEach(root) {
    if (root === null || root === undefined) return;

    this.postOrderForEach(root.leftChild);
    this.postOrderForEach(root.rightChild);

    console.log(root.data);
  }

  heightUtil(root, value, height) {
    if (!root) return -1;

    let leftHeight = this.heightUtil(root.leftChild, value, height);
    let rightHeight = this.heightUtil(root.rightChild, value, height);

    let ans = Math.max(leftHeight, rightHeight) + 1;

    if (root.data === value) height.value = ans;

    return ans;
  }

  height(root, value) {
    let height = { x: -1 };

    this.heightUtil(root, value, height);
    return height.value;
  }

  depth(root, value) {
    if (!root) return -1;
    let dist = -1;

    if (
      root.data === value ||
      (dist = this.depth(root.leftChild, value)) >= 0 ||
      (dist = this.depth(root.rightChild, value)) >= 0
    ) {
      return dist + 1;
    }

    return dist;
  }

  storeInOrder(root, nodes) {
    if (root === null) return;

    this.storeInOrder(root.leftChild, nodes);
    nodes.push(root.data);
    this.storeInOrder(root.rightChild, nodes);
  }

  isbalanced(root) {
    if (root === null) {
      return true;
    }

    const leftHeight = this.height(root.leftChild);
    const rightHeight= this.height(root.rightChild);

    const heightDiff = Math.abs((leftHeight - rightHeight));

    if (heightDiff > 1) {
      return false;
    }
    return this.isbalanced(root.leftChild) && this.isbalanced(root.rightChild);
  }

  rebalance(root) {
    let nodes = [];

    this.storeInOrder(root, nodes);

    return this.buildTree(nodes);
  }
}

hehe = new Tree();

hehe.root = hehe.buildTree(testArray);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }
  if (node.rightChild !== null || node.rightChild !== undefined) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftChild !== null || node.leftChild !== undefined) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

hehe.insert(hehe.root, 10);

console.log(hehe.isbalanced(hehe.root));

// console.log(hehe.root)
prettyPrint(hehe.root);

// console.log(hehe.levelOrder(hehe.root));

console.log(hehe.depth(hehe.root, 300));
