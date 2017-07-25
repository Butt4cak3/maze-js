document.addEventListener("DOMContentLoaded", function () {
	const width = 101,
		  height = 101,
		  start = new Point(0, 0),
		  goal = new Point(width - 1, height - 1),
		  scale = 5,
		  canvas = document.createElement("canvas"),
		  generator = new maze.generator.DfsMazeGenerator(),
		  solver = new maze.solver.DfsMazeSolver(),
		  drawer = new maze.drawer.CanvasMazeDrawer(canvas);

	document.body.appendChild(canvas);

	canvas.width = (width + 2) * scale;
	canvas.height = (height + 2) * scale;

	const mazeObj = generator.init(width, height, start, goal);
	solver.init(mazeObj);
	drawer.draw(mazeObj, scale);
	drawer.attach(mazeObj, scale);

	animate(generator, () => animate(solver));
});
