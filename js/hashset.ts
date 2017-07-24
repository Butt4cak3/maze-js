interface Hashable {
	toHash: () => string;
}

class HashSet<T extends Hashable> {
	private data: T[] = [];

	public add(thing: T): void {
		if (!this.contains(thing)) {
			this.data.push(thing);
		}
	}

	public contains(thing: T): boolean {
		for (let elem of this.data) {
			if (elem.toHash() === thing.toHash()) {
				return true;
			}
		}

		return false;
	}

	public clear(): void {
		this.data.length = 0;
	}
}
