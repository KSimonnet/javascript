// Test case 1: Basic test case without triming
const tree1 = {
  name: "John",
  age: 25,
  address: {
    city: "Kyiv",
    country: "AU",
  },
};
const mask1 = {
  name: "John",
  age: 25,
};
const result1 = parseTree(tree1, mask1, false);
console.log(result1.all()); // Expected output: [{ name: 'John', age: 25 }]

// Test case 2: Test with triming
const tree2 = [
  {
    name: "John",
    age: 25,
    address: {
      city: "New York",
      country: "USA",
    },
  },
  {
    name: "Celia",
    age: 21,
    address: {
      city: "Sydney",
      country: "AU",
    },
  },
];
const mask2 = {
  country: "AU",
};

const result2 = parseTree(tree2, mask2, true);
console.log(result2.all());
// Expected output: [
//   {
//     name: "Celia",
//     age: 21,
//     address: {
//       city: "Sydney",
//       country: "AU",
//     },
//   }]
