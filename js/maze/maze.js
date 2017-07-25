var maze;
(function (maze) {
    var Maze = (function () {
        function Maze(width, height, start, goal) {
            this.width = width;
            this.height = height;
            this.size = width * height;
            this.start = new Point(util.toEven(start.x), util.toEven(start.y));
            this.goal = new Point(util.toEven(goal.x), util.toEven(goal.y));
            this.cells = [];
            for (var y = 0; y < height; y++) {
                this.cells[y] = [];
                for (var x = 0; x < width; x++) {
                    this.cells[y][x] = new Cell(Cell.Type.WALL);
                }
            }
            this.getCellAt(this.start).setType(Cell.Type.START);
            this.getCellAt(this.goal).setType(Cell.Type.GOAL);
        }
        Maze.prototype.getWidth = function () {
            return this.width;
        };
        Maze.prototype.getHeight = function () {
            return this.height;
        };
        Maze.prototype.getSize = function () {
            return this.size;
        };
        Maze.prototype.getStart = function () {
            return this.start;
        };
        Maze.prototype.getGoal = function () {
            return this.goal;
        };
        Maze.prototype.getCellAt = function (p) {
            return this.cells[p.y][p.x];
        };
        Maze.prototype.setCellType = function (p, type) {
            this.cells[p.y][p.x].setType(type);
            this.onChange(p, type);
        };
        Maze.prototype.onChange = function (p, type) {
        };
        Maze.prototype.neighbors = function (p, dist) {
            var result = [], a = dist, b = 0;
            for (var i = 0; i < 4; i++) {
                var x = p.x + a, y = p.y + b;
                if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                    result.push(new Point(x, y));
                }
                var temp = a;
                a = b;
                b = -temp;
            }
            return result;
        };
        return Maze;
    }());
    maze.Maze = Maze;
    var Cell = (function () {
        function Cell(type) {
            this.type = type;
        }
        Cell.prototype.getType = function () {
            return this.type;
        };
        Cell.prototype.setType = function (type) {
            this.type = type;
        };
        return Cell;
    }());
    maze.Cell = Cell;
    (function (Cell) {
        var Type;
        (function (Type) {
            Type[Type["PATH"] = 0] = "PATH";
            Type[Type["WALL"] = 1] = "WALL";
            Type[Type["START"] = 2] = "START";
            Type[Type["GOAL"] = 3] = "GOAL";
            Type[Type["SOLUTION"] = 4] = "SOLUTION";
            Type[Type["HIGHLIGHT"] = 5] = "HIGHLIGHT";
        })(Type = Cell.Type || (Cell.Type = {}));
    })(Cell = maze.Cell || (maze.Cell = {}));
})(maze || (maze = {}));
