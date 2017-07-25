namespace maze.drawer {
	export class CanvasMazeDrawer implements MazeDrawer {
		private readonly canvas: HTMLCanvasElement;
		private readonly context: CanvasRenderingContext2D;
		public COLOR_WALL = "#000000";
		public COLOR_PATH = "#FFFFFF";
		public COLOR_SOLUTION = "#990000";
		public COLOR_HIGHLIGHT = "#999999";
		public COLOR_START = "#00AA00";
		public COLOR_GOAL = "#FFFF00";
		public COLOR_ERROR = "FF00AA";

		constructor(canvas: HTMLCanvasElement) {
			this.canvas = canvas;
			this.context = canvas.getContext("2d");
		}

		public attach(maze: Maze, scale: number) {
			let ctx = this.context;

			maze.onChange = (p: Point, typeStr: Cell.Type) => {
				let imageX = (p.x + 1) * scale,
					imageY = (p.y + 1) * scale;

				switch (typeStr) {
					case Cell.Type.WALL:
						ctx.fillStyle = this.COLOR_WALL;
						break;
					case Cell.Type.PATH:
						ctx.fillStyle = this.COLOR_PATH;
						break;
					case Cell.Type.SOLUTION:
						ctx.fillStyle = this.COLOR_SOLUTION;
						break;
					case Cell.Type.HIGHLIGHT:
						ctx.fillStyle = this.COLOR_HIGHLIGHT;
						break;
					case Cell.Type.START:
						ctx.fillStyle = this.COLOR_START;
						break;
					case Cell.Type.GOAL:
						ctx.fillStyle = this.COLOR_GOAL;
						break;
					default:
						ctx.fillStyle = this.COLOR_ERROR;
						break;
				}

				ctx.fillRect(imageX, imageY, scale, scale);
			};
		}

		public draw(maze: Maze, scale: number) {
			let ctx = this.canvas.getContext("2d");

			this.clear(maze.getWidth(), maze.getHeight(), scale);

			for (let y = 0; y < maze.getHeight(); y++) {
				for (let x = 0; x < maze.getWidth(); x++) {
					let typeStr = maze.getCellAt(new Point(x, y)).getType(),
						imageX = (x + 1) * scale,
						imageY = (y + 1) * scale;

					switch (typeStr) {
						case Cell.Type.WALL:
							ctx.fillStyle = this.COLOR_WALL;
							break;
						case Cell.Type.PATH:
							ctx.fillStyle = this.COLOR_PATH;
							break;
						case Cell.Type.SOLUTION:
							ctx.fillStyle = this.COLOR_SOLUTION;
							break;
						case Cell.Type.HIGHLIGHT:
							ctx.fillStyle = this.COLOR_HIGHLIGHT;
							break;
						case Cell.Type.START:
							ctx.fillStyle = this.COLOR_START;
							break;
						case Cell.Type.GOAL:
							ctx.fillStyle = this.COLOR_GOAL;
							break;
						default:
							ctx.fillStyle = this.COLOR_ERROR;
							break;
					}

					ctx.fillRect(imageX, imageY, scale, scale);
				}
			}
		}

		private clear(width: number, height: number, scale: number) {
			let ctx = this.context;

			ctx.fillStyle = this.COLOR_WALL;
			ctx.fillRect(0, 0, (width + 2) * scale, (height + 2) * scale);
		}
	}
}
