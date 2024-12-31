// Import the functions to test
const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require("./sumofNnumbers");

// Jest test cases
describe("Sum to n implementations", function () {
    const testCases = [
        { input: 1, expected: 1 },
        { input: 5, expected: 15 }, // 1 + 2 + 3 + 4 + 5 = 15
        { input: 10, expected: 55 }, // 1 + 2 + ... + 10 = 55
        { input: 20, expected: 210 }, // Sum of 1 to 50
        { input: 30, expected: 465 }, // Sum of 1 to 100
        { input: 0, expected: 0 }, // Edge case: no numbers to sum
        { input: -5, expected: -15 }, // Edge case: negative input should result in 0
    ];

    // Test sum_to_n_a
    describe("sum_to_n_a", function () {
        testCases.forEach(function ({ input, expected }) {
            it(`should return ${expected} for input ${input}`, function () {
                expect(sum_to_n_a(input)).toBe(expected);
            });
        });
    });

    // Test sum_to_n_b
    describe("sum_to_n_b", function () {
        testCases.forEach(function ({ input, expected }) {
            it(`should return ${expected} for input ${input}`, function () {
                expect(sum_to_n_b(input)).toBe(expected);
            });
        });
    });

    // Test sum_to_n_c
    describe("sum_to_n_c", function () {
        testCases.forEach(function ({ input, expected }) {
            it(`should return ${expected} for input ${input}`, function () {
                expect(sum_to_n_c(input)).toBe(expected);
            });
        });
    });
});