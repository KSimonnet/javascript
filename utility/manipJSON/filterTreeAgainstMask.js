import * as manipulateArray from "../manipArr/barrel-manipArr.js";
/**
 * Parses a tree object and filters it against a mask, based on its structure and search criteria.
 * inspired by: https://github.com/pichsenmeister/json-filter/tree/master
 * @param {Object} obj_tree - The object to search
 * @param {Object} mask_tree - The list of search criteria
 * @param {boolean} trim - Condition as to whether to extract the full node or just the matched properties
 * @returns {Array} An array of matched nodes
 */
const arr_matches = [];
function filterTreeAgainstMask(obj_tree, mask_tree, trim) {
  try {
    // check if 'obj_tree' and 'mask_tree' are objects with enumerable string-keyed property names
    if (
      obj_tree &&
      typeof obj_tree === "object" &&
      mask_tree &&
      typeof mask_tree === "object"
    ) {
      // in JavaScript, Arrays are of type Object. node.constructor === Array
      if (Array.isArray(obj_tree)) {
        // recursively traverse node for match with sub nodes
        obj_tree.forEach((node) =>
          filterTreeAgainstMask(node, mask_tree, trim),
        );
      } else {
        const nodeKeys = Object.keys(obj_tree);
        const maskKeys = Object.keys(mask_tree);
        // check if all maskKeys match with this node's properties
        const isMatch = maskKeys.every((key) => nodeKeys.includes(key));
        if (isMatch) {
          const match = maskKeys.filter((key) => {
            const nodeValue = obj_tree[key];
            const maskValue = mask_tree[key];
            if (typeof nodeValue === "string") {
              if (maskValue instanceof RegExp) {
                return maskValue.test(nodeValue);
              } else if (typeof maskValue === "string") {
                return nodeValue === maskValue;
              } else {
                // TODO - break;
              }
            } else if (typeof nodeValue === typeof maskValue) {
              filterTreeAgainstMask(nodeValue, maskValue, trim);
            }
          });
          // check that all maskValues matched
          if (maskKeys.length === match.length) {
            // arr_matches.push(trim ? _trim(node, mask_tree) : node);
            arr_matches.push(trim ? _trim(obj_tree, mask_tree) : obj_tree);
          }
        }
      }
    }
    // return manipulateArray.convertArrToUtilityObj(arr_matches);
    return arr_matches;
  } catch (e) {
    if (!(e instanceof Error)) {
      let e = new Error(e);
    }
    console.error(e.message);
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
