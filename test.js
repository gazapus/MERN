let arr = [111, 222, 333, 444, 555, 112];
let index = arr.indexOf(222);
console.log(index);
let arr1 = arr.splice(index, 1);
console.log(arr1);
console.log(arr);
