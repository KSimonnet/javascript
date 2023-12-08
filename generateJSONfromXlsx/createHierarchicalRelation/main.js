import * as manipulateJSON from "../../utility/manipJSON/barrel-manipJson.js";
import * as manipulateArray from "../../utility/manipArr/barrel-manipArr.js";
import * as check from "../../utility/check/barrel-check.js";
import { exec } from "child_process";
import { copyToClipboard } from "../../utility/copyToClipboard.js";

const str_catProp = "name",
  str_parentProp = "parent";

async function generateFlatHierarchicalTaxo() {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        // from local directory, get the hierarchical structure of directorty entries and and sub-entries and,
        // return a representation in an array of JSON objects
        const path_myDirectory =
          "C:/USERS/USERNAME/PATH/TO/YOUR/DIRECTORY";  // replace with your own path to directory containing your taxonomy file tree
        const treeString =
          await manipulateJSON.listFileTreeRecursive(path_myDirectory);

        // breakdown the hierarchy into a flat structure
        const str_childProp = "entries";
        const json_flatTaxo = manipulateArray.flattenHierarchicalArr(
          [treeString],
          str_childProp
        );
        // check for eventual duplicate category names.
        // add the parent property to the json_taxoArr
        const arr_duplicateCat = manipulateArray.filterDuplicateProps(
          json_flatTaxo,
          str_catProp
        );

        if (!check.isEmptyArr(arr_duplicateCat)) {
          exec("clip").stdin.end(
            JSON.stringify(
              manipulateArray.filterDuplicateProps(json_flatTaxo, str_catProp),
              [str_catProp, str_parentProp],
              2
            )
          );
          reject("taxonomy category duplicates found");
        } else {
          resolve(json_flatTaxo);
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  });
}
export { generateFlatHierarchicalTaxo };

/* // copy to clipboard
generateFlatHierarchicalTaxo().then((arr) => {
  copyToClipboard(JSON.stringify(arr, null, 2)); // arr, [str_catProp, str_parentProp], 2)
}); */
