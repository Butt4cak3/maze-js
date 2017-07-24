declare namespace maze.solver {
	interface MazeSolver {
		solve: (maze: Maze) => boolean;
	}
}
