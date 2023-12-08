/**
 * @param {Array} arr an array of JSON objects
 * @returns {Array} an array of JSON objects
 */
function transposeRowToColumn(arr) {
  return arr.reduce((acc, item) => {
    Object.keys(item).forEach((key) => {
      acc[key] = acc[key] || [];
      acc[key].push(item[key]);
    });
    return acc;
  }, {});
}
export { transposeRowToColumn };
