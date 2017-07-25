var Stack = (function () {
    function Stack() {
        this.data = [];
    }
    Stack.prototype.push = function (elem) {
        this.data.push(elem);
        return this.data.length;
    };
    Stack.prototype.pop = function () {
        return this.data.pop();
    };
    Stack.prototype.peek = function () {
        return this.data[this.data.length - 1];
    };
    Stack.prototype.size = function () {
        return this.data.length;
    };
    Stack.prototype.isEmpty = function () {
        return this.data.length === 0;
    };
    Stack.prototype.clear = function () {
        this.data.length = 0;
    };
    return Stack;
}());
