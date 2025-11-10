let testArray = [1, 3, 2, 4, 5, 6, 7];

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

  deleteItem(value) {}
}

hehe = new Tree();

hehe.root = hehe.buildTree(testArray);

hehe.insert(hehe.root, 10);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
// console.log(hehe.root)
prettyPrint(hehe.root);
