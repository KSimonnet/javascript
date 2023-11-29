/**
 * transpose key value pairs of an object
 * @param {Array} arr an array of JSON objects
 */
const obj_transposedData = arr.reduce((acc, item) => {
  Object.keys(item).forEach((key) => {
    acc[key] = acc[key] || [];
    acc[key].push(item[key]);
  });
  return acc;
}, {});
