interface Animatable {
	step: () => void;
	isDone: () => boolean;
}

function animate(thing: Animatable, callback: () => any = null) {
	window.requestAnimationFrame(frame);

	function frame() {
		thing.step();

		if (thing.isDone()) {
			if (typeof callback === "function") {
				callback.call(null);
			}
		} else {
			window.requestAnimationFrame(frame);
		}
	}
}
