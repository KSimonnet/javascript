/**
 * Parses a tree object and filters it against a mask, based on its structure and search criteria.
 * @param {Object} source_node - The object to search
 * @param {Object} mask_node - The search criteria tree
 * @returns {Array} An array of matched root nodes
 */
import { isEmptyArr } from "../check/isEmptyArr.js";
function filterTreeAgainstMask(source_node, mask_node) {
  if (typeof source_node !== "object" || typeof mask_node !== "object") {
    throw new Error(
      "source_node can either be an indexed or keyed collection. mask_node must be a keyed collection.",
    );
  }

  try {
    // in JavaScript, Arrays are of type Object
    if (Array.isArray(source_node)) {
      // recursively traverse sub nodes for match
      return source_node.filter((node) => traverseNode(node, mask_node));
    } else {
      // root node is a keyed collection
      return traverseNode(source_node, mask_node) ? [source_node] : [];
    }
  } catch (error) {
    console.error(error);
  }
}

// Checks the node for a match. Returns Boolean
function traverseNode(node, mask) {
  if (isEmptyArr(Object.entries(node)) || isEmptyArr(Object.entries(mask))) {
    return false;
  }
  const maskKeys = Object.keys(mask);
  // check if all maskKeys match with this node's properties
  if (!maskKeys.every((key) => Object.keys(node).includes(key))) {
    return false;
  }
  return maskKeys.every((key) => {
    const nodeValue = node[key];
    const maskValue = mask[key];
    if (Array.isArray(nodeValue)) {
      return nodeValue.some((node) => traverseNode(node, maskValue));
    }
    switch (typeof maskValue) {
      case "string":
        return maskValue === nodeValue;
      case "object":
        if (Array.isArray(nodeValue)) {
          return nodeValue.some((node) => traverseNode(node, maskValue));
        } else if (maskValue instanceof RegExp) {
          return maskValue.test(nodeValue);
        } else if (typeof nodeValue === "object") {
          return traverseNode(nodeValue, maskValue);
        }
        break;
      default:
        return maskValue === nodeValue;
    }
  });
}

export { filterTreeAgainstMask };

/**
 * test
 */
// // Test case 1: Empty source_node and mask_node
// const result1 = filterTreeAgainstMask({}, {});
// console.log(result1); // []

// // Test case 2: Empty source_node and non-empty mask_node
// const result2 = filterTreeAgainstMask({}, { name: "John" });
// console.log(result2); // []

// // Test case 3: Non-empty source_node and empty mask_node
// const result3 = filterTreeAgainstMask({ name: "John" }, {});
// console.log(result3); // []

// // Test case 4: Non-matching properties in source_node and mask_node
// const result4 = filterTreeAgainstMask(
//   { name: "John", age: 25 },
//   { name: "John", gender: "Male" },
// );
// console.log(result4); // []

// // Test case 5: Matching properties in source_node and mask_node
// const result5 = filterTreeAgainstMask(
//   { name: "John", age: 25 },
//   { name: "John", age: 25 },
// );
// console.log(result5); // [{ name: "John", age: 25 }]

// // Test case 6: Nested objects with matching properties
// const sourceNode6 = {
//   name: "John",
//   age: 25,
//   children: {
//     Alice: {
//       address: {
//         city: "New York",
//         country: "USA",
//       },
//     },
//     Kevin: {
//       address: {
//         city: "Sydney",
//         country: "AU",
//       },
//     },
//   },
// };
// const maskNode6 = {
//   name: "John",
//   children: {
//     Kevin: {
//       address: {
//         city: "Sydney",
//         country: "AU",
//       },
//     },
//   },
// };
// const result6 = filterTreeAgainstMask(sourceNode6, maskNode6);
// console.log(result6); // [{ name: "John", age: 25, address: { city: "New York", country: "USA" } }]

// // Test case 7: Nested objects with non-matching properties
// const sourceNode7 = {
//   name: "John",
//   age: 25,
//   address: {
//     city: "New York",
//     country: "USA",
//   },
// };
// const maskNode7 = {
//   name: "John",
//   address: {
//     city: "Los Angeles",
//   },
// };
// const result7 = filterTreeAgainstMask(sourceNode7, maskNode7);
// console.log(result7); // []

// // Test case 8: Array of objects with matching properties
// const sourceNode8 = [
//   { name: "John", age: 25 },
//   { name: "Jane", age: 30 },
//   { name: "Bob", age: 40 },
// ];
// const maskNode8 = { age: 30 };
// const result8 = filterTreeAgainstMask(sourceNode8, maskNode8);
// console.log(result8); // [{ name: "Jane", age: 30 }]

// // Test case 9: Array of objects with non-matching properties
// const sourceNode9 = [
//   { name: "John", age: 25 },
//   { name: "Jane", age: 30 },
//   { name: "Bob", age: 40 },
// ];
// const maskNode9 = { gender: "Male" };
// const result9 = filterTreeAgainstMask(sourceNode9, maskNode9);
// console.log(result9); // []

// // Test case 10: Array of objects with nested objects and matching properties
// const sourceNode10 = [
//   { name: "John", age: 25, address: { city: "New York" } },
//   { name: "Jane", age: 30, address: { city: "Los Angeles" } },
//   { name: "Bob", age: 40, address: { city: "New York" } },
// ];
// const maskNode10 = { address: { city: "New York" } };
// const result10 = filterTreeAgainstMask(sourceNode10, maskNode10);
// console.log(result10); // [{ name: "John", age: 25, address: { city: "New York" } }, { name: "Bob", age: 40, address: { city: "New York" } }]
