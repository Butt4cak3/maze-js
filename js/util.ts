namespace util {
	export function toEven(num: number): number {
		if (num % 2 === 0) {
			return num;
		} else {
			return num - 1;
		}
	}
}