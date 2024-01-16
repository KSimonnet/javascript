import { exec } from "child_process";

/**
 * Copies a stringified JSON to the clipboard, populating only specific keys.
 * @param {string} str_text - The stringified JSON to be copied to the clipboard.
 * @param {Array} arr_props - An array of the keys of the JSON object that will be populated in the clipboard.
 * @param {Number|string} num_indentation - The number of spaces to indent the JSON object, or a string to use as indentation.
 */
function copyToClipboard(str_text, arr_props, num_indentation) {
  exec("clip").stdin.end(str_text, arr_props, num_indentation);
}
export { copyToClipboard };

/**
 * Copies a text to the clipboard from the DevTools.
 * In Chromium browsers, writing requires either the clipboard-read permission or transient activation.
 * @param {string} text - The text to be written to the clipboard.
 * @returns {Promise} A promise that resolves when the text is successfully written to the clipboard.
 */
export function writeToClipboardFromDevTools(text) {
  return new Promise((resolve, reject) => {
    const _asyncCopyFn = async () => {
      try {
        const result = await navigator.clipboard.writeText(text);
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        window.removeEventListener("focus", _asyncCopyFn);
      }
    };

    window.addEventListener("focus", _asyncCopyFn);
    console.log(
      "Click anywhere on the page to be scraped or hit <Tab> to shift focus to `document` (otherwise, it throws a DOMException);",
    );
  });
}
export { writeToClipboardFromDevTools };
