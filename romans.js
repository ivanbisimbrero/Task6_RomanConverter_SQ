// Constants for the literals
var INVALID_ROMAN = "Please enter a valid roman";
var INVALID_INTEGER = "Please enter a valid integer";
var OUT_OF_RANGE = "Out of range (1-3999)";

// Utility function to repeat strings
function repeatString(str, count) {
  var repeated = '';
  for (var i = 0; i < count; i++) {
    repeated += str;
  }
  return repeated;
}

function lessThan9(num, mapping) {
  if (num === 9) {
    return mapping[1] + mapping[10];
  } else if (num >= 5 && num < 9) {
    return mapping[5] + repeatString(mapping[1], num % 5);
  } else if (num === 4) {
    return mapping[1] + mapping[5];
  } else {
    return repeatString(mapping[1], num);
  }
}

function greaterThan9(num, mapping) {
  if (num >= 10 && num < 50) {
    return num === 40 ? mapping[10] + mapping[50] : repeatString(mapping[10], parseInt(num / 10));
  } else if (num >= 50 && num < 100) {
    return num === 90 ? mapping[10] + mapping[100] : mapping[50] + repeatString(mapping[10], parseInt((num - 50) / 10));
  } else if (num >= 100 && num < 500) {
    return num === 400 ? mapping[100] + mapping[500] : repeatString(mapping[100], parseInt(num / 100));
  } else if (num >= 500 && num < 1000) {
    return num === 900 ? mapping[100] + mapping[1000] : mapping[500] + repeatString(mapping[100], parseInt(num - 500) / 100);
  } else if (num >= 1000) {
    return repeatString(mapping[1000], parseInt(num / 1000));
  }
}

// Init and event handlers are defined at the top level
function init() {
  var modeCheckbox = document.querySelector("input[type='checkbox']");
  var header = document.querySelector("h1");
  var convertButton = document.querySelector(".convert-button");
  var outputArea = document.querySelector(".convert-output");
  var inputArea = document.querySelector("input[type='text']");

  modeCheckbox.addEventListener("change", function(e) {
    header.innerHTML = getModeTitle(e.target.checked);
  });

  function getModeTitle(integerToRoman) {
    return integerToRoman ? "Integer To Roman" : "Roman To Integer";
  }

  convertButton.addEventListener("click", function() {
    var inputValue = inputArea.value;
    var conversion = modeCheckbox.checked ? convertIntegerToRoman(inputValue) : convertRomanToInteger(inputValue);
    if (conversion.result) {
      outputArea.innerHTML = conversion.value;
    } else {
      alert(conversion.message);
    }
  });
}

// Conversion functions
var convertRomanToInteger = function(roman) {
  var response = {
    value: 0, 
    message: '',
    result: false 
  };

  var romanNumeralRegex = new RegExp(
    /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
  );

  roman = roman.toUpperCase();
  var regexResult = romanNumeralRegex.test(roman);

  if (!regexResult || roman.length <= 0) {
    response.message = INVALID_ROMAN;
    return response;
  }

  var arr = ["I", "V", "X", "L", "C", "D", "M"];
  var values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };

  var sum = 0;
  var prevIndex = 0;

  for (var i = roman.length - 1; i >= 0; i--) {
    if (arr.indexOf(roman[i]) >= prevIndex) {
      sum += values[roman[i]];
    } else {
      sum -= values[roman[i]];
    }
    prevIndex = arr.indexOf(roman[i]);
  }

  response.value = sum;
  response.result = true;

  return response;
};

var convertIntegerToRoman = function(num) {
  var response = {
    value: '',
    message: '', 
    result: false 
  };

  var numberRegex = new RegExp(/^\d+$/);
  var regexResult = numberRegex.test(num);

  if (!regexResult) {
    response.message = INVALID_INTEGER;
    return response;
  }

  if (Number(num) > 3999 || Number(num) < 1) {
    response.message = OUT_OF_RANGE;
    return response;   
  }

  var mapping = {
    1: "I",
    5: "V",
    10: "X",
    50: "L",
    100: "C",
    500: "D",
    1000: "M"
  };

  var count = 1;
  var str = "";
  while (num > 0) {
    var last = parseInt(num % 10);
    last *= count;
    if (last < 10) {
      str = lessThan9(last, mapping) + str;
    } else {
      str = greaterThan9(last, mapping) + str;
    }

    count *= 10;
    num = parseInt(num / 10);
  }

  response.value = str;
  response.result = true;

  return response;
};

// Expose init function globally if it's being used in HTML
window.init = init;
