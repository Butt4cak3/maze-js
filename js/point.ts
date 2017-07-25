class Point implements Hashable {
	public readonly x: number;
	public readonly y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public equals(p: Point): boolean {
		return this.x === p.x && this.y === p.y;
	}

	public toString(): string {
		return this.x + "|" + this.y;
	}
}
