/**
 * STEP 1
 * from local directory, get all files and sub-files's paths, then get their content and return them concatenated in an array of JSON objects
 */

import fs from "fs";
import path from "path";
import XLSX from "xlsx";

const DIR_PATH = "C:/Users/yourusername/path/to/directory";
const FILE_EXT = ".xlsx";
const fileContent_arr = await getFileContentsFromDir(DIR_PATH, FILE_EXT);
const json_sheets = await convertBufferToJSON(fileContent_arr);
console.log(JSON.stringify(json_sheets, null, 2));

/**
 * given an absolute path to a directory, it will get all files and sub-files's paths, then get their content and return them concatenated in an array of JSON objects
 * @param {string} dir the absolute path to the target directory
 * @param {string} ext the exension of the target files
 * @return {JSON} an array of JSON objects
 */

// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
async function getFileContentsFromDir(dir, ext) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  const files_arr = await Promise.all(
    // https://nodejs.org/api/fs.html#class-fsdirent
    dirents.map((dirent) => {
      const abs_path = path.resolve(dirent.path, dirent.name); //dirent.path returns a relative forward slash path to the working directory
      return dirent.isDirectory()
        ? getFileContentsFromDir(abs_path)
        : path.parse(abs_path).ext == ext
        ? fs.promises
            .readFile(abs_path)
            .catch((err) => console.error("Failed to read files", err.message))
        : `No file of extension ${ext} in directory`;
    })
  ).catch((err) => console.error("Failed to read directory", err.message));
  return files_arr.flat(Infinity);
}

/**
 * given an array of file contents, it will parse them and return them concatenated in an array of JSON objects
 * @param {Array} content_arr array of <Buffer> objects
 * @return {JSON} an array of JSON objects
 */
async function convertBufferToJSON(content_arr) {
  const jdat_arr = await Promise.all(
    content_arr.map((content) => {
      switch (FILE_EXT) {
        case ".json":
          return JSON.parse(content.toString());
        case ".xlsx": {
          const json_sheets = {};
          const workbook = XLSX.read(content, { type: "buffer" });
          workbook.SheetNames.forEach((sheetName) => {
            json_sheets[sheetName] = XLSX.utils.sheet_to_json(
              workbook.Sheets[sheetName]
            );
          });
          return json_sheets;
        }
        default:
          console.log(`Sorry, the extension ${FILE_EXT} is not supported.`);
      }
    })
  ).catch((err) => console.error("Failed to parse to JSON", err.message));
  return jdat_arr.flat(Infinity);
}

/**
 * STEP 2
 * transpose Row object into a Column object
 */
const arr_sheetData = Object.values(json_sheets[0])[0]; // targetting only 'Sheet1' of the first file
const obj_transposedData = arr_sheetData.reduce((acc, item) => {
  Object.keys(item).forEach((key) => {
    acc[key] = acc[key] || [];
    acc[key].push(item[key]);
  });
  return acc;
}, {});

/**
 * STEP 3
 * format object into an array of JSON objects
 */
const arr_jsonStructured = Object.keys(obj_transposedData).reduce(
  (acc, key) => {
    acc.push({ [key]: obj_transposedData[key] });
    return acc;
  },
  []
);

/**
 * STEP 4
 * check the integrity of the JSON structure of the target array
 */
const arr_jsonTarget =
  isJSONstructure(arr_jsonStructured) && arr_jsonStructured;

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

/**
 * STEP 5
 * turn array into JSON with key / value pairs
 */
const json_formattedTarget = arr_jsonTarget.map((item, i) => {
  return {
    // id: i,
    category_name: Object.keys(item)[0].toString(),
    // keywords: Object.values(item)[0],
    parent_category_name: "",
  };
});

/**
 * STEP 6
 * copy to clipboard
 */
import { exec } from "child_process";
exec("clip").stdin.end(JSON.stringify(json_formattedTarget, null, 2));
