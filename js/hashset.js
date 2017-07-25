var HashSet = (function () {
    function HashSet() {
        this.data = [];
        this.hashes = [];
    }
    HashSet.prototype.add = function (thing) {
        var index = this.find(thing), hash = thing.toString();
        if (this.hashes[index] !== hash) {
            this.data.splice(index + 1, 0, thing);
            this.hashes.splice(index + 1, 0, hash);
        }
    };
    HashSet.prototype.contains = function (thing) {
        var index = this.find(thing);
        return (this.hashes[index] === thing.toString());
    };
    HashSet.prototype.clear = function () {
        this.data.length = 0;
        this.hashes.length = 0;
    };
    HashSet.prototype.find = function (thing) {
        var hash = thing.toString(), list = this.hashes, l = 0, r = this.hashes.length - 1;
        while (true) {
            if (r < l) {
                return r;
            }
            var m = Math.floor((l + r) / 2);
            if (list[m] < hash) {
                l = m + 1;
            }
            else if (list[m] > hash) {
                r = m - 1;
            }
            else {
                return m;
            }
        }
    };
    return HashSet;
}());
