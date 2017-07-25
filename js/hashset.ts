interface Hashable {
	toString: () => string;
}

class HashSet<T extends Hashable> {
	private data: T[] = [];
	private hashes: string[] = [];

	public add(thing: T): void {
		let index = this.find(thing),
			hash = thing.toString();

		if (this.hashes[index] !== hash) {
			this.data.splice(index + 1, 0, thing);
			this.hashes.splice(index + 1, 0, hash);
		}
	}

	public contains(thing: T): boolean {
		let index = this.find(thing);

		return (this.hashes[index] === thing.toString());
	}

	public clear(): void {
		this.data.length = 0;
		this.hashes.length = 0;
	}

	private find(thing: T): number {
		let hash = thing.toString(),
			list = this.hashes,
			l = 0,
			r = this.hashes.length - 1;

		while (true) {
			if (r < l) {
				return r;
			}

			let m = Math.floor((l + r) / 2);

			if (list[m] < hash) {
				l = m + 1;
			} else if (list[m] > hash) {
				r = m - 1;
			} else {
				return m;
			}
		}
	}
}
