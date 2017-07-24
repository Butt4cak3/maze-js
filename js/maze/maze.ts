namespace maze {
	export class Maze {
		private readonly width: number;
		private readonly height: number;
		private readonly size: number;
		private readonly start: Point;
		private readonly goal: Point;
		private readonly cells: Cell[][];
		
		constructor(width: number, height: number, start: Point, goal: Point) {
			this.width = width;
			this.height = height;
			this.size = width * height;
			this.start = new Point(util.toEven(start.x), util.toEven(start.y));
			this.goal = new Point(util.toEven(goal.x), util.toEven(goal.y));
			this.cells = [];
			
			for (let y = 0; y < height; y++) {
				this.cells[y] = [];
				for (let x = 0; x < width; x++) {
					this.cells[y][x] = new Cell(Cell.Type.WALL);
				}
			}
			
			this.getCellAt(this.start).setType(Cell.Type.START);
			this.getCellAt(this.goal).setType(Cell.Type.GOAL);
		}
		
		public getWidth(): number {
			return this.width;
		}
		
		public getHeight(): number {
			return this.height;
		}
		
		public getSize(): number {
			return this.size;
		}
		
		public getStart(): Point {
			return this.start;
		}
		
		public getGoal(): Point {
			return this.goal;
		}
		
		public getCellAt(p: Point) {
			return this.cells[p.y][p.x];
		}
		
		public neighbors(p: Point, dist: number): Point[] {
			let result: Point[] = [],
				a = dist,
				b = 0;
			
			for (let i = 0; i < 4; i++) {
				let x = p.x + a,
					y = p.y + b;
				
				if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
					result.push(new Point(x, y));
				}
				
				let temp = a;
				a = b;
				b = -temp;
			}
			
			return result;
		}
	}
	
	export class Cell {
		private type: Cell.Type;
		
		constructor(type: Cell.Type) {
			this.type = type;
		}
		
		public getType(): Cell.Type {
			return this.type;
		}
		
		public setType(type: Cell.Type): void {
			this.type = type;
		}
	}
	
	export namespace Cell {
		export enum Type {
			PATH, WALL, START, GOAL, SOLUTION, HIGHLIGHT
		}
	}
}