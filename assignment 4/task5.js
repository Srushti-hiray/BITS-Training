
function processData(numbers, callback) {
    return callback(numbers);
  }
  
  function filterOdd(numbers) {
    return numbers.filter(num => num % 2 !== 0);
  }
  
  function doubleNumbers(numbers) {
    return numbers.map(num => num * 2);
  }
  
  function calculateSum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
    
  }
  
  function findMax(numbers) {
    
    return numbers.reduce((max, num) => {
        if (num > max) {
          return num;
        } else {
          return max; 
        }
      }, numbers[0]);
  }
  
  const numbers = [1, 2, 3, 4, 5];
  
  console.log(processData(numbers, filterOdd)); 
  console.log(processData(numbers, doubleNumbers)); 
  console.log(processData(numbers, calculateSum)); 
  console.log(processData(numbers, findMax));

  
//   output:
//   [ 1, 3, 5 ]
// [ 2, 4, 6, 8, 10 ]
// 15
// 5