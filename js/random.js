var Random = (function () {
    function Random() {
    }
    Random.prototype.nextInt = function (max) {
        return Math.floor(Math.random() * max);
    };
    return Random;
}());
