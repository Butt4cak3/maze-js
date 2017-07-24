namespace maze.solver {
	export class DfsMazeSolver implements MazeSolver {
		private visited = new HashSet<Point>();
		private stack = new Stack<Point>();
		private rand = new Random();
		private start: Point;
		private goal: Point;

		public solve(maze: Maze): boolean {
			this.start = maze.getStart();
			this.goal = maze.getGoal();
			this.visited.clear();
			this.stack.clear();
			this.stack.push(this.start);

			while (!this.stack.isEmpty()) {
				let currentPoint = this.stack.peek(),
					unvNeighbors = this.unvNeighbors(currentPoint, maze);

				this.visited.add(currentPoint);

				if (unvNeighbors.length > 0) {
					let nextPoint = this.chooseUnvNeighbor(unvNeighbors);

					if (nextPoint.equals(this.goal)) {
						break;
					}
					maze.getCellAt(nextPoint).setType(Cell.Type.SOLUTION);
					this.stack.push(nextPoint);
				} else {
					this.stack.pop();
					maze.getCellAt(currentPoint).setType(Cell.Type.HIGHLIGHT);
				}
			}

			if (this.stack.isEmpty()) {
				return false;
			}

			while (!this.stack.isEmpty()) {
				let p = this.stack.pop();
				maze.getCellAt(p).setType(Cell.Type.SOLUTION);
			}

			maze.getCellAt(this.start).setType(Cell.Type.START);

			return true;
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
