/**
 * Slice an array at each junction where the next element is alphabetically smaller than the previous one
 * @param {Array} arr The array comprising of groups ordered alphabetically, to slice at each junction
 * @returns {Array} The array of arrays, each array containing a group alphabetically ordered. Non-mutating
 */
function sliceAtAlphabeticalJunction(arr) {
  return arr.reduce((acc, curr, i) => {
    curr > arr[i - 1] ? acc[acc.length - 1].push(curr) : acc.push([curr]);
    return acc;
  }, []);
}
export { sliceAtAlphabeticalJunction };

// const arr_catBodyData = ["a", "b", "y", "c", "d", "z", "e", "f"];
// sliceAtAlphabeticalJunction(arr_catBodyData);
// output
// [["a", "b", "y"], ["c", "d", "z"], ["e", "f"]]

// SOLUTION 2
/* function sliceAtAlphabeticalJunction(arr) {
  let start = 0;
  return arr.reduce((acc, curr, i, arr) => {
    if (curr < arr[i - 1]) {
      acc.push(arr.slice(start, i));
      start = i;
    }
    if (i === arr.length - 1) {
      acc.push(arr.slice(start));
    }

    return acc;
  }, []);
} */
