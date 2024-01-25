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
      return nodeValue.some((node) => filterTreeAgainstMask(node, maskValue));
    }
    switch (typeof maskValue) {
      case "string":
        return maskValue instanceof RegExp
          ? maskValue.test(nodeValue)
          : maskValue === nodeValue;
      case "object":
        if (Array.isArray(nodeValue)) {
          return nodeValue.some((node) =>
            filterTreeAgainstMask(node, maskValue),
          );
        }
        return typeof nodeValue === "object"
          ? traverseNode(nodeValue, maskValue)
          : false;
      default:
        return maskValue === nodeValue;
    }
  });
}
export { filterTreeAgainstMask };
