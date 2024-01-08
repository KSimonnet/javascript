/**
 * SOLUTION 1: using reduce
 * @param {JSON} json_data - The object to flatten showing hierarchical relation in a JSON format.
 * @param {string} str_childProp - The name of the property that contains the hierarchical relation.
 * @returns {Array} a flat array of JSON objects
 */
function flattenHierarchicalArr(json_data, str_childProp) {
  return Object.keys(json_data).reduce((acc, key) => {
    if (json_data[key][str_childProp].length > 0) {
      acc.push(
        ...flattenHierarchicalArr(json_data[key][str_childProp], str_childProp)
      );
    }
    acc.push(json_data[key]);
    return acc;
  }, []);
}
export { flattenHierarchicalArr };

/* const json_hierarchicalTaxo = [
  {
    name: "taxonomy_29112023",
    parent: "C:/Users/ubogo/OneDrive/Bureau",
    entries: [
      {
        name: "check",
        parent: "taxonomy_29112023",
        entries: [
          {
            name: "is_digitalAgency",
            parent: "check",
            entries: [],
          },
          {
            name: "is_execSearchFirm",
            parent: "check",
            entries: [],
          },
        ],
      }
    ],
  },
];

const str_prop = "entries";
const json_flatStructure = flattenHierarchicalArr(
  json_hierarchicalTaxo,
  str_prop
);

//copy to clipboard
import { exec } from "child_process";
exec("clip").stdin.end(
  JSON.stringify(json_flatStructure, ["name", "parent"], 2)
); */
