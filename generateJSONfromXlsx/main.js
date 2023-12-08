import * as createHierarchicalJSON from "./createHierarchicalRelation/main.js";
import * as injectTaxoXlsxIntoJSON from "./injectTaxoXlsxIntoJSON/main.js";
import * as manipulateObject from "../../utility/manipObj/barrel-manipObj.js";
import * as check from "../utility/check/barrel-check.js";
import { copyToClipboard } from "../utility/copyToClipboard.js";

const arr_xlsxHeaders = [
  "header1",
  "header2"
];

const str_propName = "name",
  str_propParent = "parent",
  str_propId = "id",
  str_propKeywords = "keywords";

async function runConcurrentProcedures() {
  try {
    const arr = await Promise.all([
      createHierarchicalJSON.generateFlatHierarchicalTaxo(),
      injectTaxoXlsxIntoJSON.convertExcelToJSON(),
    ]); // "The fulfillment value is an array of fulfillment values, in the order of the promises passed, regardless of completion order." https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all#return_value
    if (!arr || arr.length < 2) {
      throw new Error("One or both promises did not fulfill");
    } else {
      return arr;
    }
  } catch (error) {
    console.error(error.message);
  }
}
runConcurrentProcedures().then((arr) => {
  // add `str_propParent` property to each object, where applicable, of the array `json_flatTaxo
  const [json_flatTaxo, json_target] = arr;
  const json_formattedTaxo = manipulateObject.addPropertyOfSourceToAtarget(
    json_flatTaxo,
    json_target
  );

  // check that the category names match the xlsx headers
  const arr_nameVal = Object.values(json_formattedTaxo).map(
    (val) => val[str_propName]
  );
  const arraysMatch = compareArrays(arr_xlsxHeaders, arr_nameVal);

  if (!check.isEmptyArr(arraysMatch)) {
    copyToClipboard(
      JSON.stringify(
        json_formattedTaxo,
        [str_propId, str_propName, str_propParent, str_propKeywords],
        2
      )
    );
  } else {
    console.error(
      "The array of taxonomy categories does not match the array of xlsx headers: " +
        arraysMatch
    );
  }

  function compareArrays(arr1, arr2) {
    return arr1.filter((item) => arr2.includes(item));
  }
});

/* function strictCompareArrays(arr1, arr2) {
    return arr1.filter((item, index) => item === arr2[index]).length === arr1.length;
} */
