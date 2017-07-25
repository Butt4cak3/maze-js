var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.equals = function (p) {
        return this.x === p.x && this.y === p.y;
    };
    Point.prototype.toString = function () {
        return this.x + "|" + this.y;
    };
    return Point;
}());
