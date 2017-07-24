declare namespace maze.drawer {
	interface MazeDrawer {
		draw: (maze: Maze, scale: number) => void;
	}
}
