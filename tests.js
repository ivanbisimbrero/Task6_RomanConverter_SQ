// Test Cases for convertIntegerToRoman(num)

// Very Small and Large Valid Values
test("Very Small and Large Valid Values", function(assert) {
  assert.propEqual(convertIntegerToRoman(1), {value: "I", message: '', result: true}, "TC-1");
  assert.propEqual(convertIntegerToRoman(2), {value: "II", message: '', result: true}, "TC-2");
  assert.propEqual(convertIntegerToRoman(3), {value: "III", message: '', result: true}, "TC-3");
  assert.propEqual(convertIntegerToRoman(3990), {value: "MMMCMXC", message: '', result: true}, "TC-4");
  assert.propEqual(convertIntegerToRoman(3991), {value: "MMMCMXCI", message: '', result: true}, "TC-5");
  assert.propEqual(convertIntegerToRoman(3992), {value: "MMMCMXCII", message: '', result: true}, "TC-6");
});

// Boundary Conditions and Invalid Inputs
test("Boundary Conditions and Invalid Inputs", function(assert) {
  assert.propEqual(convertIntegerToRoman(0), {value: 0, message: 'Out of range (1-3999)', result: false}, "TC-11");
  assert.propEqual(convertIntegerToRoman(4000), {value: 0, message: 'Out of range (1-3999)', result: false}, "TC-12");
  assert.propEqual(convertIntegerToRoman(2147483647), {value: 0, message: 'Out of range (1-3999)', result: false}, "TC-13");
  assert.propEqual(convertIntegerToRoman(-14), {value: 0, message: 'Please enter a valid integer', result: false}, "TC-14");
  assert.propEqual(convertIntegerToRoman("X"), {value: 0, message: 'Please enter a valid integer', result: false}, "TC-15");
  assert.propEqual(convertIntegerToRoman(122.51), {value: 0, message: 'Please enter a valid integer', result: false}, "TC-16");
  //assert.propEqual(convertIntegerToRoman(undefined), {value: 0, message: 'Please enter a valid integer', result: false}, "TC-17");
  assert.propEqual(convertIntegerToRoman(null), {value: 0, message: 'Please enter a valid integer', result: false}, "TC-18");
  /*
  I have moved the null test case here instead of in convertRomanToInteger because it makes more sense to do it with an integer 
  than with a string, as a string can be empty by default, but an integer, if nothing is entered, could be null and we would 
  have to consider that option.
  */
  assert.propEqual(convertIntegerToRoman("ABC"), {value: 0, message: 'Please enter a valid integer', result: false}, "TC-19");
  assert.propEqual(convertIntegerToRoman("1999.999"), {value: 0, message: 'Please enter a valid integer', result: false}, "TC-20");
  assert.propEqual(convertIntegerToRoman("true"), {value: 0, message: 'Please enter a valid integer', result: false}, "TC-21");
  assert.propEqual(convertIntegerToRoman("{}"), {value: 0, message: 'Please enter a valid integer', result: false}, "TC-22");
  assert.propEqual(convertIntegerToRoman("!@#$%^&*()"), {value: 0, message: 'Please enter a valid integer', result: false}, "TC-23");
  assert.propEqual(convertIntegerToRoman(" 50"), {value: 0, message: 'Please enter a valid integer', result: false}, "TC-24"); //I've changed this because I made a mistake in the Task4 (I have set true instead of false)
  assert.propEqual(convertIntegerToRoman("100 "), {value: 0, message: 'Please enter a valid integer', result: false}, "TC-25"); //The same for this
  assert.propEqual(convertIntegerToRoman(" "), {value: 0, message: 'Please enter a valid integer', result: false}, "TC-26");
});

// Test Cases for convertRomanToInteger(roman)

// Valid Roman Numerals
test("Valid Roman Numerals", function(assert) {
  assert.propEqual(convertRomanToInteger("I"), {value: 1, message: '', result: true}, "TC-27");
  assert.propEqual(convertRomanToInteger("MMMCMXCIX"), {value: 3999, message: '', result: true}, "TC-28");
  assert.propEqual(convertRomanToInteger("D"), {value: 500, message: '', result: true}, "TC-29");
  assert.propEqual(convertRomanToInteger("MMXXIII"), {value: 2023, message: '', result: true}, "TC-30");
});

// Invalid Roman Numerals and Edge Cases
test("Invalid Roman Numerals and Edge Cases", function(assert) {
  assert.propEqual(convertRomanToInteger("IIII"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-31");
  assert.propEqual(convertRomanToInteger("MMMM"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-32");
  assert.propEqual(convertRomanToInteger("IC"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-33");
  assert.propEqual(convertRomanToInteger("XYZ"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-34");
  assert.propEqual(convertRomanToInteger(""), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-35");
  assert.propEqual(convertRomanToInteger("VIIII"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-36");
  assert.propEqual(convertRomanToInteger("MCMIV"), {value: 1904, message: '', result: true}, "TC-37");
  assert.propEqual(convertRomanToInteger("MLXVI"), {value: 1066, message: '', result: true}, "TC-38");
});

// Case Sensitivity and Format
test("Case Sensitivity and Format", function(assert) {
  assert.propEqual(convertRomanToInteger("i"), {value: 1, message: '', result: true}, "TC-39");
  assert.propEqual(convertRomanToInteger("mCm"), {value: 1900, message: '', result: true}, "TC-40");
  assert.propEqual(convertRomanToInteger(" MMMCMXCIX "), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-41"); //The same that in TC-23 and 24
  assert.propEqual(convertRomanToInteger("IV IV"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-42");
  /*
  In the case of the lower case, I initially thought that it would not work, since the regular expression contemplated 
  only capital letters, so I put that it should fail in situations where lower case letters are involved. But in this case, 
  taking the expected performance side, it would have to work both with lower case, upper case and both combined, that's 
  why I put the test cases as successful, unlike in task 4 I put it as failure.
  */
});

// Special Characters and Numbers
test("Special Characters and Numbers", function(assert) {
  assert.propEqual(convertRomanToInteger("IV4"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-43");
  assert.propEqual(convertRomanToInteger("XII!"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-44");
  assert.propEqual(convertRomanToInteger("D+M"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-45");
  assert.propEqual(convertRomanToInteger("(IV)"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-46");
});

// Numeric Strings and Null Inputs
test("Numeric Strings", function(assert) {
  assert.propEqual(convertRomanToInteger("123"), {value: 0, message: 'Please enter a valid roman', result: false}, "TC-47");
});

/*
As a minimum conclusion from practice, I could say that personally I have let myself be carried away by what the code we had 
until now did, without contemplating situations such as the case of lower case letters, which is a bad practice.
In spite of this, I have been correcting all the mistakes that I had made when doing the test cases (explained in the code), 
since I could not modify the code of the practice, besides the fact that I have been the one who has made the mistake.
I think that this type of practices are good for us because in this way we learn in a better way the operation of the test 
cases and how to apply an automatic execution, as it is done in this practice.
*/
