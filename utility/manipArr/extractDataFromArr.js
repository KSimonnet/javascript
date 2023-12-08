import * as check from "../check/barrel-check.js";
/**
 * exhaustively list all items
 * @param {Array} source_arr array of entries that were previously filtered as containing the target property
 * @param {string} key the target property
 * @param {string} key_subProp within the target property, the property upon which is based the condition
 * @param {string} value the condition
 * @returns {Array} payload_arr subset of source_arr where entries have been duplicated to list exhaustively all items around the target condition
 */
function extractDataFromArr(source_arr, key, key_subProp, value) {
  var payload_arr = [];
  // get targetted information
  source_arr.forEach((obj) => {
    var curatedLoca_arr = obj[key].filter(
      (locaObj) => locaObj[key_subProp] == value
    );
    // replace the target property by a breakdown of the targetted information and,
    // duplicate the rest of the object around each occurence
    if (!check.isEmptyArr(curatedLoca_arr)) {
      delete obj[key];
      curatedLoca_arr.forEach((obj_elm) =>
        payload_arr.push({ ...obj, ...obj_elm })
      ); // https://stackoverflow.com/questions/1168807/how-can-i-add-a-key-value-pair-to-a-javascript-object
    }
  });
  return payload_arr;
}
export { extractDataFromArr };
