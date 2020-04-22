//Test 1 
import { convertToRoman } from './../src/cocktails.js'
describe('convertToRoman', () => {
  test('should correctly convert numbers to roman numerals', () => {
    var toRoman = convertToRoman(1);
    console.log(toRoman);
    expect(toRoman).toEqual("I");
  });

  test('can not be more than three same symbols in one line', () => {
    var toRoman = convertToRoman(4);
    console.log(toRoman);
    expect(toRoman).toBe("IV");
  });

  test('the number can not be greater than 3999', () => {
    var toRoman = convertToRoman(4000);
    
    expect(toRoman).toBeFalsy();
  })
});