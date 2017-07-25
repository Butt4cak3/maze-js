var maze;
(function (maze_1) {
    var drawer;
    (function (drawer) {
        var CanvasMazeDrawer = (function () {
            function CanvasMazeDrawer(canvas) {
                this.COLOR_WALL = "#000000";
                this.COLOR_PATH = "#FFFFFF";
                this.COLOR_SOLUTION = "#990000";
                this.COLOR_HIGHLIGHT = "#999999";
                this.COLOR_START = "#00AA00";
                this.COLOR_GOAL = "#FFFF00";
                this.COLOR_ERROR = "FF00AA";
                this.canvas = canvas;
                this.context = canvas.getContext("2d");
            }
            CanvasMazeDrawer.prototype.attach = function (maze, scale) {
                var _this = this;
                var ctx = this.context;
                maze.onChange = function (p, typeStr) {
                    var imageX = (p.x + 1) * scale, imageY = (p.y + 1) * scale;
                    switch (typeStr) {
                        case maze_1.Cell.Type.WALL:
                            ctx.fillStyle = _this.COLOR_WALL;
                            break;
                        case maze_1.Cell.Type.PATH:
                            ctx.fillStyle = _this.COLOR_PATH;
                            break;
                        case maze_1.Cell.Type.SOLUTION:
                            ctx.fillStyle = _this.COLOR_SOLUTION;
                            break;
                        case maze_1.Cell.Type.HIGHLIGHT:
                            ctx.fillStyle = _this.COLOR_HIGHLIGHT;
                            break;
                        case maze_1.Cell.Type.START:
                            ctx.fillStyle = _this.COLOR_START;
                            break;
                        case maze_1.Cell.Type.GOAL:
                            ctx.fillStyle = _this.COLOR_GOAL;
                            break;
                        default:
                            ctx.fillStyle = _this.COLOR_ERROR;
                            break;
                    }
                    ctx.fillRect(imageX, imageY, scale, scale);
                };
            };
            CanvasMazeDrawer.prototype.draw = function (maze, scale) {
                var ctx = this.canvas.getContext("2d");
                this.clear(maze.getWidth(), maze.getHeight(), scale);
                for (var y = 0; y < maze.getHeight(); y++) {
                    for (var x = 0; x < maze.getWidth(); x++) {
                        var typeStr = maze.getCellAt(new Point(x, y)).getType(), imageX = (x + 1) * scale, imageY = (y + 1) * scale;
                        switch (typeStr) {
                            case maze_1.Cell.Type.WALL:
                                ctx.fillStyle = this.COLOR_WALL;
                                break;
                            case maze_1.Cell.Type.PATH:
                                ctx.fillStyle = this.COLOR_PATH;
                                break;
                            case maze_1.Cell.Type.SOLUTION:
                                ctx.fillStyle = this.COLOR_SOLUTION;
                                break;
                            case maze_1.Cell.Type.HIGHLIGHT:
                                ctx.fillStyle = this.COLOR_HIGHLIGHT;
                                break;
                            case maze_1.Cell.Type.START:
                                ctx.fillStyle = this.COLOR_START;
                                break;
                            case maze_1.Cell.Type.GOAL:
                                ctx.fillStyle = this.COLOR_GOAL;
                                break;
                            default:
                                ctx.fillStyle = this.COLOR_ERROR;
                                break;
                        }
                        ctx.fillRect(imageX, imageY, scale, scale);
                    }
                }
            };
            CanvasMazeDrawer.prototype.clear = function (width, height, scale) {
                var ctx = this.context;
                ctx.fillStyle = this.COLOR_WALL;
                ctx.fillRect(0, 0, (width + 2) * scale, (height + 2) * scale);
            };
            return CanvasMazeDrawer;
        }());
        drawer.CanvasMazeDrawer = CanvasMazeDrawer;
    })(drawer = maze_1.drawer || (maze_1.drawer = {}));
})(maze || (maze = {}));
