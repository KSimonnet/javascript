/* const json_arr = [
  {
    name: "sourcing",
    parent: "talent_acquisition",
  },
  {
    name: "sourcing",
    parent: "supply_chain",
  },
  {
    name: "logistics",
    parent: "supply_chain",
  },
];
const duplicates = filterDuplicates(json_arr, "parent");
*/

// SOLUTION 1
/**
 * in an object, check for duplicates of a property name
 * @param {Array} arr_source the array to check duplicates for
 * @param {string} str_property the key of the property to check for duplicates
 * @returns {Array} the array of duplicates
 */
function filterDuplicateProps(arr_source, str_property) {
  return arr_source.filter((item, index) => {
    return arr_source.some(
      (element, i) =>
        i !== index && element[str_property] === item[str_property]
    );
  });
}
export { filterDuplicateProps };

/* // SOLUTION 2
  const parentMap = new Map();
  const duplicates = json_arr.filter((item) => {
    return parentMap.has(item.parent)
      ? true
      : () => {
          parentMap.set(item.parent, true);
          return false;
        };
  }); */

// SOLUTION 3
/* const duplicates = json_arr.filter((item, index) => {
    return json_arr.findIndex((element, i) => {
      return i !== index && element.parent === item.parent;
    }) !== -1;
  }); */
