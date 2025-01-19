#!/usr/bin/env node

// *1
function sumTwo(x, y) {
  return x + y;
}

console.log(sumTwo(3, 5));

/* ---------------------------------------- */

// *2
function checkPrime(num) {
  if (num <= 1 || num % 2 == 0) {
    return false;
  }
  if (num == 2) {
    return true;
  }
  const root = Math.sqrt(num);
  for (let i = 3; i < root; i += 2) {
    if (num % i == 0) {
      return false;
    }
  }
  return true;
}

console.log(checkPrime(17));

/* ---------------------------------------- */

// *3
function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString('hello'));

/* ---------------------------------------- */

// *4
function findMax(arr) {
  let max = arr[0];
  for (const num of arr) {
    if (num > max) {
      max = num;
    }
  }
  return max;
}

console.log(findMax([1, 5, 2, 1337, 420]));

/* ---------------------------------------- */

// *5
function findEven(arr) {
  return arr.filter((num) => num % 2 == 0);
}

console.log(findEven([1, 5, 2, 1337, 420]));

/* ---------------------------------------- */

// *6
function reverseString2(str) {
  const arr = str.split('');
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
  return arr.join('');
}

console.log(reverseString2('route'));

/* ---------------------------------------- */

// *7
function avg(arr) {
  let sum = 0;
  for (const num of arr) {
    sum += num;
  }
  return sum / arr.length;
}

console.log(avg([1, 5, 2, 1337, 420]));

/* ---------------------------------------- */

// *8
function weekends(num) {
  if (num < 1 || num > 7) {
    return 'Invalid day';
  }
  return num >= 6 ? 'Weekend' : 'Weekday';
}

console.log(weekends(5), weekends(7));

/* ---------------------------------------- */

// *9
function dividable(arr) {
  return arr.filter((num) => num % 2 == 0 || num % 3 == 0);
}

console.log(dividable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

/* ---------------------------------------- */

// *10
function findIndex(arr, index) {
  if (index < 0 || index >= arr.length) {
    return -1;
  }
  return arr[index];
}

console.log(
  findIndex([1, 5, 2, 1337, 420], 3),
  findIndex([1, 5, 2, 1337, 420], 10)
);

/* ---------------------------------------- */

// *11
function factorial(num) {
  if (num == 1) return 1;
  if (num <= 0) return 0;
  return num * factorial(num - 1);
}

console.log(factorial(5));

/* ---------------------------------------- */

// *12

function onlyKeys(obj) {
  const arr = [];
  for (const key in obj) {
    arr.push(key);
  }
  return arr;
}

console.log(onlyKeys({ a: 1, b: 2, c: 3 }));

/* ---------------------------------------- */

// *13
function unique(arr) {
  const uni = [];
  const not = [];
  for (const item of arr) {
    if (not.includes(item)) {
      continue;
    }
    if (uni.includes(item)) {
      not.push(item);
      uni.splice(uni.indexOf(item), 1);
      continue;
    }
    uni.push(item);
  }
  return uni;
}

console.log(unique([1, 5, 2, 1337, 420, 1, 5]));

/* ---------------------------------------- */

// *14
function letterCount(str) {
  const obj = {};
  for (const char of str) {
    if (obj[char]) {
      obj[char]++;
    } else {
      obj[char] = 1;
    }
  }
  return obj;
}

console.log(letterCount('hello'));

/* ----------------------------------------  */

// *15
function sorting(arr, len = null, left = null, right = null) {
  len = len ?? arr.length;
  left = left ?? 0;
  right = right ?? len - 1;

  if (left < right) {
    let i = left;

    for (let j = left; j < right; j++) {
      if (arr[j] < arr[right]) {
        if (i != j) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }

        i++;
      }
    }
    if (arr[i] != arr[right]) {
      const temp = arr[i];
      arr[i] = arr[right];
      arr[right] = temp;
    }

    sorting(arr, len, left, i - 1);
    sorting(arr, len, i + 1, right);
  }
  return arr;
}

console.log(sorting([1, 5, 2, 1337, 420]));

/* ---------------------------------------- */

// *16
function isAnagram(str1, str2) {
  const arr1 = str1.split('');
  const arr2 = str2.split('');
  if (arr1.length != arr2.length) return false;
  for (const char of arr1) {
    if (!arr2.includes(char)) {
      return false;
    }
    arr2.splice(arr2.indexOf(char), 1);
  }
  return true;
}

console.log(isAnagram('listen', 'silent'));

/* ---------------------------------------- */

// *17
function createCar(model, year) {
  const car = {
    model: model,
    year: year,
    display: function () {
      console.log(`Model: ${this.model}, Year: ${this.year}`);
    },
  };
  return car;
}

const car = createCar('Toyota', 2020);
car.display();

/* ---------------------------------------- */

// *19
function checkKeys(obj, key) {
  return onlyKeys(obj).includes(key);
}

console.log(
  checkKeys({ name: 'Alice', age: 25 }, 'name'),
  checkKeys({ name: 'Alice', age: 25 }, 'address')
);

/* ---------------------------------------- */

// *20
function myMath(x, y, symbol) {
  if (symbol == '+') {
    return x + y;
  } else if (symbol == '-') {
    return x - y;
  } else if (symbol == '*') {
    return x * y;
  } else if (symbol == '/') {
    return x / y;
  } else {
    return 'Invalid operator';
  }
}

console.log(myMath(5, 3, '+'), myMath(5, 3, '%'));
