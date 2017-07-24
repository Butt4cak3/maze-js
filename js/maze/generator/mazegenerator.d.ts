declare namespace maze.generator {
	interface MazeGenerator {
		generate: (width: number, height: number, start: Point, goal: Point) => Maze;
	}
}