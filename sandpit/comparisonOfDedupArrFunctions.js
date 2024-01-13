var unqHsh1 = (a, o) =>
  a.filter((i) => (o.hasOwnProperty(i) ? false : (o[i] = true)));
var unqHsh2 = (array) => Array.from(new Set(array));

// Measure the execution time of a function
function measureExecutionTime(func) {
  const startTime = performance.now();
  func();
  const endTime = performance.now();
  return endTime - startTime;
}

var a = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

// Test the performance of unqHsh1
const unqHsh1Time = measureExecutionTime(() => {
  var o = {};
  unqHsh1(a, o);
});

// Test the performance of unqHsh2
const unqHsh2Time = measureExecutionTime(() => {
  unqHsh2(a);
});
var multiplicator = 10000000000000;
console.log(`unqHsh1 execution time: ${unqHsh1Time * multiplicator} ms`);
console.log(`unqHsh2 execution time: ${unqHsh2Time * multiplicator} ms`);
//expected output
// unqHsh1 execution time: 9999999962747097000 ms
// unqHsh2 execution time: 0 ms
