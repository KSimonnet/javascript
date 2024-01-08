// SOLUTION 1
/* function addPropertyOfSourceToAtarget(arr_source, arr_target) {
  arr_target.forEach((obj_target) => {
    const obj_source = arr_source.find((item) => item.name === obj_target.name);
    if (obj_source) {
      obj_target.parent = obj_source.parent;
    }
  });
  return arr_target;
} */

// SOLUTION 2
/**
 * compare the two arrays and, if the name property of the json_taxoArr is found in the json_hierarArr, add the parent property to the json_taxoArr
 * @param {Array} arr_source array of JSON objects, where each object has a name property and a parent property
 * @param {Array} arr_target array of JSON objects to populate with the parent property
 * @returns {Array} ByRef arr_target comprising of a parent property
 */
function addPropertyOfSourceToAtarget(arr_source, arr_target) {
  const hierarMap = new Map(
    arr_source.map(({ name, parent }) => [name, parent])
  );
  return arr_target.map((obj_target) => ({
    ...obj_target,
    parent: hierarMap.get(obj_target.name) || obj_target.parent,
  }));
}
export { addPropertyOfSourceToAtarget };

/* // which is the equivalent of:
  function addPropertyOfSourceToAtarget(arr_source, arr_target) {
    const hierarMap = new Map(
      arr_source.map(({ name, parent }) => [name, parent])
    );
    return arr_target.map((obj_target) => {
      return {
        ...obj_target,
        parent: hierarMap.get(obj_target.name) || obj_target.parent,
      };
    });
  } */

/* const json_hierarArr = [
  {
    name: "sourcing1",
    parent: "talent_acquisition",
  },
  {
    name: "sourcing2",
    parent: "supply_chain",
  },
  {
    name: "logistics",
    parent: "supply_chain",
  },
];

const json_taxoArr = [
  {
    name: "sourcing1",
  },
  {
    name: "sourcing2",
  },
  {
    name: "logistics",
  },
];

const updatedTaxoArr = addPropertyOfSourceToAtarget(json_hierarArr, json_taxoArr);
console.log(updatedTaxoArr);*/
