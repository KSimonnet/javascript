/**
 * Parses a tree object and filters it based on a mask of search criteria.
 * inspired by: https://github.com/pichsenmeister/json-filter/tree/master
 * @param {Object} tree The object to search
 * @param {Object} mask The list of search criteria
 * @param {boolean} trim Whether to extract the full node or just the matched properties
 * @returns {Array} An array of matched nodes
 */
const parseTree = (tree, mask, trim) => {
  const arr_matches = [];
  try {
    if (mask && typeof mask === "object") {
      const maskKeys = Object.keys(mask);
      const parseNode = (node) => {
        // check tree is an object with enumerable string-keyed property names
        if (node && typeof node === "object") {
          const nodeKeys = Object.keys(node);
          // in JavaScript, Arrays are of type Object. node.constructor === Array
          if (Array.isArray(node)) {
            node.forEach(parseNode);
          } else {
            // check if all maskKeys match with this node's properties
            const isMatch = maskKeys.every((key) => nodeKeys.includes(key));
            // parse paired values
            if (isMatch) {
              const match = maskKeys.filter((key) => {
                const nodeValue = node[key];
                const maskValue = mask[key];
                if (
                  typeof nodeValue === "string" &&
                  maskValue instanceof RegExp
                ) {
                  return maskValue.test(nodeValue);
                } else if (typeof maskValue !== "object") {
                  return nodeValue === maskValue || maskValue === "$any";
                } else if (typeof maskValue === "object") {
                  // TODO handling maskValue as an object
                }
              });
              // check if all maskKeys match
              if (maskKeys.length === match.length) {
                arr_matches.push(trim ? _trim(node, mask) : node);
              }
            }
            // recursively traverse node for match with sub nodes
            nodeKeys.forEach((key) => {
              parseNode(node[key]);
            });
          }
        }
      };

      parseNode(tree);
      return _generateResultObj(arr_matches);
    }
  } catch (e) {
    if (!(e instanceof Error)) {
      e = new Error(e);
    }
    console.error(e.message);
  }
};

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

/**
 * Turns the result into a utility object.
 * @param {Array} arr - An array of matched nodes.
 * @returns {Object} - The result object.
 */
const _generateResultObj = (arr) => {
  const obj = {};
  obj.length = arr.length;
  obj.all = () => arr;
  obj.get = (index) => (index > arr.length - 1 ? undefined : arr[index]);
  obj.first = () => obj.get(0);
  obj.last = () => obj.get(arr.length - 1);
  return obj;
};

export { parseTree };
