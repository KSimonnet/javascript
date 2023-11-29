const str_prop = "office_location";
const str_key = "country";
const str_country = "Australia";
const arr_companies = [
  {
    company_id: "123456",
    company_name: "Amazon",
    office_location: [
      { lat: 38.873062, lng: -77.007385, country: "USA" },
      { lat: 19.146397, lng: 72.87369, country: "India" },
    ],
  },
  {
    company_id: "123458",
    company_name: "Tesla",
    office_location: [
      { lat: 38.873062, lng: -77.007385, country: "USA" },
      { lat: 19.146397, lng: 72.87369, country: "Australia" },
    ],
  },
];

const arr_AUloca = arr_companies
  .filter((elm) => elm[str_prop])
  .filter((elmn) => {
    return isConditionalTrue(elmn, str_prop, str_key, str_country);
  });
var arr_expandedObj = extractDataFromArr(
  arr_AUloca,
  str_prop,
  str_key,
  str_country
);
console.log(arr_expandedObj);
// prints
// [
//   {
//     company_id: '123458',
//     company_name: 'Tesla',
//     lat: 19.146397,
//     lng: 72.87369,
//     country: 'Australia'
//   }
// ]

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

function isEmptyArr(arr) {
  return (
    Array.isArray(arr) &&
    typeof arr != "undefined" &&
    arr != null &&
    arr.length != null &&
    !arr.length
  ); // if arr.length is 0, or false, it returns true https://www.freecodecamp.org/news/check-if-javascript-array-is-empty-or-not-with-length/
}

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
    if (!isEmptyArr(curatedLoca_arr)) {
      delete obj[key];
      curatedLoca_arr.forEach((obj_elm) =>
        payload_arr.push({ ...obj, ...obj_elm })
      ); // https://stackoverflow.com/questions/1168807/how-can-i-add-a-key-value-pair-to-a-javascript-object
    }
  });
  return payload_arr;
}
