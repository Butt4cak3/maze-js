class Main {
	private static readonly WIDTH = 501;
	private static readonly HEIGHT = 501;
	private static readonly START = new Point(0, 0);
	private static readonly GOAL = new Point(Main.WIDTH - 1, Main.HEIGHT - 1);
	private static readonly SCALE = 1;
	
	public static main(): void {
		let canvas = document.createElement("canvas"),
			mazeObj: maze.Maze,
			generator = new maze.generator.DfsMazeGenerator(),
			solver = new maze.solver.DfsMazeSolver(),
			drawer = new maze.drawer.CanvasMazeDrawer(canvas);
		
		document.body.appendChild(canvas);
		
		canvas.width = (Main.WIDTH + 2) * Main.SCALE;
		canvas.height = (Main.HEIGHT + 2) * Main.SCALE;
		
		mazeObj = generator.generate(Main.WIDTH, Main.HEIGHT, Main.START, Main.GOAL);
		solver.solve(mazeObj);
		drawer.draw(mazeObj, Main.SCALE);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	Main.main();
});
