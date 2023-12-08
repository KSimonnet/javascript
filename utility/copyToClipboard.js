import { exec } from "child_process";

/**
 * copy to clipboard
 * @param {string} str_text stringified JSON
 * @param {Array} arr_props array of the keys of the JSON object that will be populated in the clipboard
 * @param {Number || string} num_indentation number of spaces to indent the JSON object, or string to use as indentation
 */
function copyToClipboard(str_text, arr_props, num_indentation) {
  exec("clip").stdin.end(str_text, arr_props, num_indentation);
}
export { copyToClipboard };
