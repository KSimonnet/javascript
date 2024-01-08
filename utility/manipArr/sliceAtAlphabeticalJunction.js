/**
 * Slice an array at each junction where the next element is alphabetically smaller than the previous one, ignoring case and punctuation
 * @param {Array} arr The array comprising of groups ordered alphabetically, to slice at each junction
 * @returns {Array} The array of arrays, each array containing a group alphabetically ordered. Non-mutating
 */
function sliceAtAlphabeticalJunction(arr) {
  return arr.reduce((acc, curr, i) => {
    const currLower = curr.toLowerCase();
    const prevLower = arr[i - 1]?.toLowerCase();
    currLower.localeCompare(prevLower, undefined, { sensitivity: "base" }) >= 0
      ? acc[acc.length - 1].push(curr)
      : acc.push([curr]);
    return acc;
  }, []);
}

export { sliceAtAlphabeticalJunction };

// const arr = ["a", "b", "y", "c", "d", "z", "e", "f"];
// sliceAtAlphabeticalJunction(arr);
// output
// [["a", "b", "y"], ["c", "d", "z"], ["e", "f"]]
