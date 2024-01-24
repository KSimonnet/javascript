import * as manipulateArray from "../manipArr/barrel-manipArr.js";
/**
 * Parses a tree object and filters it against a mask, based on its structure and search criteria.
 * inspired by: https://github.com/pichsenmeister/json-filter/tree/master
 * @param {Object} obj_tree - The object to search
 * @param {Object} mask_tree - The list of search criteria
 * @param {boolean} trim - Condition as to whether to extract the full node or just the matched properties
 * @returns {Array} An array of matched nodes
 */

function filterTreeAgainstMask(obj_tree, mask_tree, trim) {
  const arr_matches = [];
  traverseNode(obj_tree, mask_tree);
  return arr_matches;
  function traverseNode(obj_node, mask_node) {
    try {
      // check if 'obj_node' and 'mask_node' are objects with enumerable string-keyed property names
      if (
        obj_node &&
        typeof obj_node === "object" &&
        mask_node &&
        typeof mask_node === "object"
      ) {
        // in JavaScript, Arrays are of type Object. node.constructor === Array
        if (Array.isArray(obj_node)) {
          // recursively traverse node for match with sub nodes
          obj_node.forEach((node) => traverseNode(node, mask_node));
          // arr.filter((ob) => ob[child]?.some((loc) => loc[key] == target));
        } else {
          const nodeKeys = Object.keys(obj_node);
          const maskKeys = Object.keys(mask_node);
          // check if all maskKeys match with this node's properties
          if (maskKeys.every((key) => nodeKeys.includes(key))) {
            /*in your code, there's a problem. The every method is not intended to be used with recursive functions. 
            It's designed to test whether all elements in the array pass the test implemented by the provided function. 
            In your case, you're using it to perform a recursive operation on each element of the array, which is not its intended use.
            The every method will stop iterating over the array as soon as the callback function returns false. 
            But in your case, the callback function is making a recursive call, which means it's not returning anything
            until it hits the base case. This could lead to unexpected behavior. */
            const match = maskKeys.every((key) => {
              const nodeValue = obj_node[key];
              const maskValue = mask_node[key];
              if (typeof nodeValue === "string") {
                if (maskValue instanceof RegExp) {
                  return maskValue.test(nodeValue);
                } else if (typeof maskValue === "string") {
                  return nodeValue === maskValue;
                }
              } else if (typeof nodeValue === typeof maskValue) {
                return traverseNode(nodeValue, maskValue);
              }
              return false;
            });
            // check that all maskValues matched
            if (match) {
              arr_matches.push(trim ? _trim(obj_node, mask_node) : obj_node);
              return true;
            }
          }
        }
      }
    } catch (e) {
      if (!(e instanceof Error)) {
        let e = new Error(e);
      }
      console.error(e.message);
      return false;
    }
  }
}

/**
 * Trims the tree object down to only the properties listed in the mask of search criteria.
 * @param {Object} tree - The object to trim.
 * @param {Object} mask - The list of search criteria.
 * @returns {Object} - The trimmed object.
 */
const _trim = (tree, mask) => {
  if (typeof tree === "object") {
    const obj = {};
    for (const key in mask) {
      const v = tree[key];
      obj[key] =
        typeof tree === "object" ? _trim(tree[key], mask[key], obj) : v;
    }
    return obj;
  }
  return tree;
};

export { filterTreeAgainstMask };
