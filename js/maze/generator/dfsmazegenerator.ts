namespace maze.generator {
	export class DfsMazeGenerator implements MazeGenerator {
		private visited = new HashSet<Point>();
		private stack = new Stack<Point>();
		private rand: Random = new Random();

		public generate(width: number, height: number, start: Point, goal: Point): Maze {
			let maze = new Maze(width, height, start, goal);

			this.visited.clear();
			this.stack.clear();
			this.stack.push(maze.getStart());

			while (!this.stack.isEmpty()) {
				let currentPoint = this.stack.peek(),
					cell = maze.getCellAt(currentPoint);

				this.visited.add(currentPoint);

				if (cell.getType() !== Cell.Type.START && cell.getType() !== Cell.Type.GOAL) {
					cell.setType(Cell.Type.PATH);
				}

				let unvNeighbors = this.unvNeighbors(currentPoint, maze);

				if (unvNeighbors.length > 0) {
					let nextPoint = this.chooseUnvNeighbor(unvNeighbors);
					maze.getCellAt(this.pointBetween(currentPoint, nextPoint)).setType(Cell.Type.PATH);
					this.stack.push(nextPoint);
				} else {
					this.stack.pop();
				}
			}

			return maze;
		}

		private chooseUnvNeighbor(unvNeighbors: Point[]) {
			return unvNeighbors[this.rand.nextInt(unvNeighbors.length)];
		}

		private unvNeighbors(p: Point, maze: Maze): Point[] {
			let neighbors = maze.neighbors(p, 2),
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
