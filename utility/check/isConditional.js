/**
 * Filter JSON object based on a condition over a nested property
 * @param {object} obj the JSON parent object to search
 * @param {string} str_prop the property of the parent object that contains an array of objects, where the condition is
 * @param {string} str_key the property to search
 * @param {string} str_val the value of the condition
 * @returns {boolean} check whether the conditional was found
 */
function isConditionalTrue(obj, str_prop, str_key, str_val) {
  // we need two returns:
  // - one foto satisfay the condition of the below filter() so it returns what eventually matched the condition
  // - the other to satisfy the condition of the parent filter()
  let arr_res = obj[str_prop].filter((elm) => {
    return elm[str_key] == str_val;
  });
  return !isEmptyArr(arr_res);
}
export { isConditionalTrue };
