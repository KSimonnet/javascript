/**
 *
 * @param {object} obj_transposedData object to format into JSON array
 * @returns {Array} array of JSON objects
 */
function formatObjIntoJSONarr(obj_transposedData) {
  return Object.keys(obj_transposedData).reduce((acc, key) => {
    acc.push({ [key]: obj_transposedData[key] });
    return acc;
  }, []);
}
export { formatObjIntoJSONarr };
