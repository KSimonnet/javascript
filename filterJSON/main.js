import * as manipulateJSON from "../utility/manipJSON/barrel-manipJson.js";
import { copyToClipboard } from "../utility/copyToClipboard.js";

const filterCriteria = {
  YOUR_KEY: "YOUR_VALUE",
};

// from local directory, get all files and sub-files's paths,
// then get their content and return them concatenated in an array of JSON objects
const path_myDirectory = "C:/USERS/USERNAME/PATH/TO/YOUR/DIRECTORY"; // replace with your own path to directory containing your .json files
const EXT_FILE = ".json";

const arr_fileContent = await manipulateJSON.getFileContentsFromDir(
  path_myDirectory,
  EXT_FILE,
);
const arr_JSONdata = await manipulateJSON.convertBufferToJSON(
  arr_fileContent,
  EXT_FILE,
);

// filter JSON
try {
  const arr_matches = manipulateJSON.filterTreeAgainstMask(
    arr_JSONdata,
    filterCriteria,
  );
  const elements = arr_matches.all();
  copyToClipboard(JSON.stringify(elements, null, 2));
} catch (error) {
  console.error(error);
}
