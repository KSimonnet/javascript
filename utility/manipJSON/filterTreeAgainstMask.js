/**
 * Parses a tree object and filters it against a mask, based on its structure and search criteria.
 * @param {Object} source_node - The object to search
 * @param {Object} mask_node - The search criteria tree
 * @returns {Array} An array of matched root nodes
 */
function filterTreeAgainstMask(source_node, mask_node) {
  if (typeof source_node !== "object" || typeof mask_node !== "object") {
    throw new Error("Parameteris not an object");
  }

  try {
    // in JavaScript, Arrays are of type Object
    if (Array.isArray(source_node)) {
      // recursively traverse sub nodes for match
      return source_node.filter((node) =>
        filterTreeAgainstMask(node, mask_node),
      );
    } else {
      return traverseNode(source_node, mask_node) ? source_node : [];
    }
  } catch (error) {
    console.error(error);
  }
}

function traverseNode(node, mask) {
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
    // nodeValue.constructor.name === "String"
    if (typeof nodeValue === "string") {
      return maskValue instanceof RegExp
        ? maskValue.test(nodeValue)
        : maskValue === nodeValue;
    } else {
      return maskValue === nodeValue;
    }
  });
}

export { filterTreeAgainstMask };
