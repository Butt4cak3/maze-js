class Stack<T> {
	private readonly data :T[] = [];

	public push(elem: T): number {
		this.data.push(elem);
		return this.data.length;
	}

	public pop(): T {
		return this.data.pop();
	}

	public peek(): T {
		return this.data[this.data.length - 1];
	}

	public size(): number {
		return this.data.length;
	}

	public isEmpty(): boolean {
		return this.data.length === 0;
	}

	public clear(): void {
		this.data.length = 0;
	}
}
