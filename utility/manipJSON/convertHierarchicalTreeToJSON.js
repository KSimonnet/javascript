import fs from "fs";
import { lstat, readdir, access } from "fs/promises";
import path from "path";

/**
 * convert a file directory to tree string
 * @param {string} dir absolute path to the directory
 * @returns {JSON} treeString the hierarchical tree of the directory
 */
// https://stackoverflow.com/questions/11194287/convert-a-directory-structure-in-the-filesystem-to-json-with-node-js

async function listFileTreeRecursive(dir) {
  const recurse = async (entry) => {
    if (!(await existsAsync(entry))) {
      return {};
    }

    const stats = await lstat(entry);
    if (!stats.isDirectory()) {
      return {
        name: path.basename(entry),
        parent: path.dirname(entry).split(path.sep).pop(),
      };
    }

    const files = await readdir(entry);
    const childEntries = await Promise.all(
      files.map((child) => recurse(path.join(entry, child)))
    );
    return {
      name: path.basename(entry),
      parent: path.dirname(entry).split(path.sep).pop(),
      entries: childEntries,
    };
  };
  return recurse(dir);
}

async function existsAsync(file) {
  try {
    await access(file, fs.constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}
export { listFileTreeRecursive };

/* const path_myDirectory = "C:/Users/ubogo/OneDrive/Bureau/taxonomy_5112023";
(async function displayRes() {
  const treeString = await listFileTreeRecursive(path_myDirectory);
  console.log(JSON.stringify(treeString, null, 2));
})(); */
