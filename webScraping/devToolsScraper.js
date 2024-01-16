//https://www.energystartups.org/country/Australia/
var list_cpy = document.querySelector(".item-list");
let arr_urls = [];
var pattern = "\\b\\w+\\b";
var regEx = new RegExp(pattern, "g");

for (const node of list_cpy.childNodes) {
  if (node.getAttribute("class") == "top-item") {
    let node_cpy_url = node.querySelector(".item-title").querySelector("a");
    arr_urls.push([
      node_cpy_url.getAttribute("href").match(regEx).pop(),
      node_cpy_url.innerText,
    ]);
  }
}
const dedupArr = (arr) => [...new Set(arr)];

// for naming classes
const toPascalCase = (str) =>
  str.replace(/\b\w/g, (match) => match.toUpperCase());

const arr_listCpy = arr_urls.flat(Infinity).map(toPascalCase);

const arr_sorted = dedupArr(arr_listCpy).sort(
  new Intl.Collator(undefined, { usage: "sort", sensitivity: "base" }).compare,
);

// in Chromium browsers, writing requires either the clipboard-read permission or transient activation
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
// adapted from https://stackoverflow.com/questions/56306153/domexception-on-calling-navigator-clipboard-readtext
function writeToClipboardFromDevTools(text) {
  return new Promise((resolve, reject) => {
    const _asyncCopyFn = async () => {
      try {
        const value = await navigator.clipboard.writeText(text);
        resolve(value);
      } catch (e) {
        reject(e);
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

writeToClipboardFromDevTools(arr_sorted.join("\n")).then(() =>
  console.log("Text copied to clipboard"),
);
