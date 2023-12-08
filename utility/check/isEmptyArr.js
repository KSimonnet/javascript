/**
 * check if an array is empty
 * @param {Array} arr arra to check for emptiness
 * @returns {boolean} true if the array is empty
 */
function isEmptyArr(arr) {
  return (
    Array.isArray(arr) &&
    typeof arr != "undefined" &&
    arr != null &&
    arr.length != null &&
    !arr.length
  ); // if arr.length is 0, or false, it returns true https://www.freecodecamp.org/news/check-if-javascript-array-is-empty-or-not-with-length/
}
export { isEmptyArr };
