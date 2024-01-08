import * as manipulateJSON from "../utility/manipJSON/barrel-manipJson.js";
import * as manipulateObject from "../utility/manipObj/barrel-manipObj.js";
import * as check from "../utility/check/barrel-check.js";

/**
 * from local directory, get all files and sub-files's paths,
 * then get their content and return them concatenated in an array of JSON objects
 */
const path_myDirectory = "C:/USERS/USERNAME/PATH/TO/YOUR/DIRECTORY";  // replace with your own path to directory containing your .xlsx files
const EXT_FILE = ".xlsx";

async function convertExcelToJSON() {
  const fileContent_arr = await manipulateJSON.getFileContentsFromDir(
    path_myDirectory,
    EXT_FILE
  );
  const json_sheets = await manipulateJSON.convertBufferToJSON(
    fileContent_arr,
    EXT_FILE
  );
  // transpose Row object into a Column object
  const arr_sheetData = Object.values(json_sheets[0])[0]; // targetting only 'Sheet1' of the first file
  const obj_transposedData =
    manipulateObject.transposeRowToColumn(arr_sheetData);

  // format object into an array of JSON objects
  const arr_jsonStructured =
    manipulateObject.formatObjIntoJSONarr(obj_transposedData);

  // check the integrity of the JSON structure of the taxo array
  const arr_jsonTaxo =
    check.isJSONstructure(arr_jsonStructured) && arr_jsonStructured;

  // turn array into JSON with key / value pairs
  const json_formattedTaxo = arr_jsonTaxo.map((item, i) => {
    return {
      id: i,
      name: Object.keys(item)[0].toString(),
      keywords: Object.values(item)[0],
    };
  });
  return json_formattedTaxo;
}
export { convertExcelToJSON };
