namespace maze.solver {
	export class DfsMazeSolver implements MazeSolver, Animatable {
		private visited = new HashSet<Point>();
		private stack = new Stack<Point>();
		private rand = new Random();
		private start: Point;
		private goal: Point;
		private maze: Maze;

		public solve(maze: Maze): boolean {
			this.init(maze);

			while (!this.stack.isEmpty()) {
				if (this.step()) {
					break;
				}
			}

			if (this.stack.isEmpty()) {
				return false;
			}

			while (!this.stack.isEmpty()) {
				let p = this.stack.pop();
				maze.setCellType(p, Cell.Type.SOLUTION);
			}

			maze.setCellType(this.start, Cell.Type.START);

			return true;
		}

		public init(maze: Maze): void {
			this.start = maze.getStart();
			this.goal = maze.getGoal();
			this.visited.clear();
			this.stack.clear();
			this.stack.push(this.start);
			this.maze = maze;
		}

		public step(): boolean {
			let maze = this.maze,
				currentPoint = this.stack.peek(),
				unvNeighbors = this.unvNeighbors(currentPoint, maze);

			this.visited.add(currentPoint);

			if (unvNeighbors.length > 0) {
				let nextPoint = this.chooseUnvNeighbor(unvNeighbors);

				if (nextPoint.equals(this.goal)) {
					return true;
				}

				maze.setCellType(nextPoint, Cell.Type.SOLUTION);
				this.stack.push(nextPoint);
			} else {
				this.stack.pop();
				maze.setCellType(currentPoint, Cell.Type.HIGHLIGHT);
			}

			return false;
		}

		public isDone(): boolean {
			return this.stack.isEmpty();
		}

		private chooseUnvNeighbor(unvNeighbors: Point[]): Point {
			return unvNeighbors[this.rand.nextInt(unvNeighbors.length)];
		}

		private unvNeighbors(p: Point, maze: Maze): Point[] {
			let neighbors = maze.neighbors(p, 1),
				result: Point[] = [];

			for (let elem of neighbors) {
				if (!this.visited.contains(elem) && maze.getCellAt(elem).getType() !== Cell.Type.WALL) {
					result.push(elem);
				}
			}

			return result;
		}
	}
}
