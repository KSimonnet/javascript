const keyValue_arr = [
  {
    key1: "value1",
    key2: "value2",
  },
];

downloadJSONtoFile(
  JSON.stringify(keyValue_arr, null, null),
  "yourfile.json",
  "text/plain"
);

/**
 * download JSON to a file
 * @param {Array} content Array of JSON objects
 * @param {string} fileName name of the file to download
 * @param {MIMEType} contentType "media type", aka "content type" of the file to download
 */
function downloadJSONtoFile(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType }); // type property of a Blob object returns the MIME type of the file
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
