function animate(thing, callback) {
    if (callback === void 0) { callback = null; }
    window.requestAnimationFrame(frame);
    function frame() {
        thing.step();
        if (thing.isDone()) {
            if (typeof callback === "function") {
                callback.call(null);
            }
        }
        else {
            window.requestAnimationFrame(frame);
        }
    }
}
