namespace maze.generator {
	export class DfsMazeGenerator implements MazeGenerator, Animatable {
		private visited = new HashSet<Point>();
		private stack = new Stack<Point>();
		private rand: Random = new Random();
		private maze: Maze;

		public generate(width: number, height: number, start: Point, goal: Point): Maze {
			this.init(width, height, start, goal);

			while (!this.stack.isEmpty()) {
				this.step();
			}

			return this.maze;
		}

		public init(width: number, height: number, start: Point, goal: Point): Maze {
			this.visited.clear();
			this.stack.clear();
			this.stack.push(start);
			this.maze = new Maze(width, height, start, goal);

			return this.maze;
		}

		public step(): void {
			let maze = this.maze,
				done = false;

			do {
				let currentPoint = this.stack.peek(),
					cell = maze.getCellAt(currentPoint);

				this.visited.add(currentPoint);

				if (cell.getType() !== Cell.Type.START && cell.getType() !== Cell.Type.GOAL) {
					maze.setCellType(currentPoint, Cell.Type.PATH);
				}

				let unvNeighbors = this.unvNeighbors(currentPoint);

				if (unvNeighbors.length > 0) {
					let nextPoint = this.chooseUnvNeighbor(unvNeighbors);
					maze.setCellType(this.pointBetween(currentPoint, nextPoint), Cell.Type.PATH);
					this.stack.push(nextPoint);
					done = true;
				} else {
					this.stack.pop();
				}
			} while (!done && !this.stack.isEmpty());
		}

		public isDone(): boolean {
			return this.stack.isEmpty();
		}

		private chooseUnvNeighbor(unvNeighbors: Point[]) {
			return unvNeighbors[this.rand.nextInt(unvNeighbors.length)];
		}

		private unvNeighbors(p: Point): Point[] {
			let maze = this.maze,
				neighbors = maze.neighbors(p, 2),
				unvNeighbors: Point[] = [];

			for (let elem of neighbors) {
				if (!this.visited.contains(elem)) {
					unvNeighbors.push(elem);
				}
			}

			return unvNeighbors;
		}

		private pointBetween(a: Point, b: Point): Point {
			if (a.x === b.x) {
				return new Point(a.x, Math.min(a.y, b.y) + 1);
			} else {
				return new Point(Math.min(a.x, b.x) + 1, a.y);
			}
		}
	}
}
