/**
 * check if source array is a valid JSON structure
 * @param {Array} arr_source array to verify
 * @returns {boolean}
 */
function isJSONstructure(arr_source) {
  return arr_source.every((elm) => {
    return typeof elm === "object"
      ? Object.keys(elm).every((key) => {
          return Array.isArray(elm[key])
            ? true
            : console.log(`${key} is not an array`);
        })
      : console.log(`${elm} is not an object`);
  });
}
export { isJSONstructure };
