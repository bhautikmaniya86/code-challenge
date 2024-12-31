// 1st way: for loop approach
var sum_to_n_a = function(n) {
    let sum = 0;
    if (n > 0) {
        for (let i = 0; i <= n; i++) {
            sum += i;
        }
    } else {
        for (let i = 0; i >= n; i--) {
            sum += i;
        }
    }
    return sum;
};


// // 2nc way: Arithmetic approach
var sum_to_n_b = function(n) {
    if (n > 0) {
        return (n * (n + 1)) / 2;
    } else if (n < 0) {
        return -(Math.abs(n) * (Math.abs(n) + 1)) / 2;
    }
    return 0; // If n == 0, the sum is 0
};


// 3rd way: recursion approach
var sum_to_n_c = function(n) {
   if (n === 0) return 0;
    return n + sum_to_n_c(n > 0 ? n - 1 : n + 1);
};

module.exports = {sum_to_n_b, sum_to_n_a, sum_to_n_c}