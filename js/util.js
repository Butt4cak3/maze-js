var util;
(function (util) {
    function toEven(num) {
        if (num % 2 === 0) {
            return num;
        }
        else {
            return num - 1;
        }
    }
    util.toEven = toEven;
})(util || (util = {}));
