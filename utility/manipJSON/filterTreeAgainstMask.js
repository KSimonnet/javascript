/**
 * Parses a tree object and filters it against a mask, based on its structure and search criteria.
 * @param {Object} obj_tree - The object to search
 * @param {Object} mask_tree - The list of search criteria
 * @param {boolean} trim - Condition as to whether to extract the full node or just the matched properties
 * @returns {Array} An array of matched nodes
 */

function filterTreeAgainstMask(source_node, mask_node) {
  // check if 'source_node' and 'mask_node' are objects with enumerable string-keyed property names
  if (
    source_node &&
    typeof source_node === "object" &&
    mask_node &&
    typeof mask_node === "object"
  ) {
    // in JavaScript, Arrays are of type Object. node.constructor === Array
    if (Array.isArray(source_node)) {
      // recursively traverse sub nodes for match
      return source_node.filter((node) =>
        filterTreeAgainstMask(node, mask_node),
      );
    } else {
      const nodeKeys = Object.keys(source_node);
      const maskKeys = Object.keys(mask_node);
      // check if all maskKeys match with this node's properties
      if (!maskKeys.every((key) => nodeKeys.includes(key))) {
        return false;
      }
      return maskKeys.every((key) => {
        const nodeValue = source_node[key];
        const maskValue = mask_node[key];
        if (Array.isArray(nodeValue)) {
          return nodeValue.some((node) =>
            filterTreeAgainstMask(node, maskValue),
          );
        } else {
          if (nodeValue.constructor.name === "String") {
            if (maskValue instanceof RegExp) {
              return maskValue.test(nodeValue);
            } else {
              return maskValue === nodeValue;
            }
          }
        }
      });
    }
  }
}

export { filterTreeAgainstMask };
