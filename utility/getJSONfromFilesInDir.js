/**
 * SOLUTION 1
 */

import fs from "fs";
import path from "path";
import XLSX from "xlsx";

const DIR_PATH = "C:/Users/ubogo/OneDrive/Bureau/canBeDeleted";
const FILE_EXT = ".xlsx"; // ".json"
const fileContent_arr = await getFileContentsFromDir(DIR_PATH, FILE_EXT);
const JSONdata = await convertBufferToJSON(fileContent_arr);
console.log(JSONdata);

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

// which can be broken down into the following:
/* async function getFiles(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const abs_path = path.resolve(dir, dirent.name);  // dirent.path returns a relative forward slash path to the working directory
      return dirent.isDirectory() ? getFiles(abs_path) : abs_path;
    })
  ).catch((err) => console.error("Failed to read directory", err.message));
  return files.flat(Infinity);
}

async function getContents(filePath_arr) {
  const contents = await Promise.all(
    filePath_arr.map((filepath) => {
      const abs_path = path.resolve(filepath);
      return fs.promises.readFile(abs_path);
    })
  ).catch((err) => console.error("Failed to read files", err.message));
  return contents.flat(Infinity);
} */

// /**
//  * given an array of file contents, it will parse them and return them concatenated in an array of JSON objects
//  * @param {Array} content_arr array of <Buffer> objects
//  * @return {JSON} an array of JSON objects
//  */
// async function convertBufferToJSON(content_arr) {
//   const jdat_arr = await Promise.all(
//     content_arr.map((content) => {
//       return JSON.parse(content.toString());
//     })
//   ).catch((err) => console.error("Failed to parse to JSON", err.message));
//   return jdat_arr.flat(Infinity);
// }

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
 * SOLUTION 2
 */
var tryJSONparse = (s) => {
  try {
    return JSON.parse(s);
  } catch (err) {
    return [];
  }
};
function getJSONdataInFolder(params) {
  var contain_arr = [];
  let files = fs
    .readFileSync(params.target_folder)
    .filter((r) => /\.json$/.test(r));
  for (let i = 0; i < files.length; i++) {
    let file = fs.readFileSync(params.target_folder + "/" + files[i]);
    let data = tryJSONparse(file);
    contain_arr.push(data);
  }
  return contain_arr.flat();
}

getJSONdataInFolder({
  target_folder: "./your target folder name",
});
