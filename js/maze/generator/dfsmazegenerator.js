var maze;
(function (maze_1) {
    var generator;
    (function (generator) {
        var DfsMazeGenerator = (function () {
            function DfsMazeGenerator() {
                this.visited = new HashSet();
                this.stack = new Stack();
                this.rand = new Random();
            }
            DfsMazeGenerator.prototype.generate = function (width, height, start, goal) {
                this.init(width, height, start, goal);
                while (!this.stack.isEmpty()) {
                    this.step();
                }
                return this.maze;
            };
            DfsMazeGenerator.prototype.init = function (width, height, start, goal) {
                this.visited.clear();
                this.stack.clear();
                this.stack.push(start);
                this.maze = new maze_1.Maze(width, height, start, goal);
                return this.maze;
            };
            DfsMazeGenerator.prototype.step = function () {
                var maze = this.maze, done = false;
                do {
                    var currentPoint = this.stack.peek(), cell = maze.getCellAt(currentPoint);
                    this.visited.add(currentPoint);
                    if (cell.getType() !== maze_1.Cell.Type.START && cell.getType() !== maze_1.Cell.Type.GOAL) {
                        maze.setCellType(currentPoint, maze_1.Cell.Type.PATH);
                    }
                    var unvNeighbors = this.unvNeighbors(currentPoint);
                    if (unvNeighbors.length > 0) {
                        var nextPoint = this.chooseUnvNeighbor(unvNeighbors);
                        maze.setCellType(this.pointBetween(currentPoint, nextPoint), maze_1.Cell.Type.PATH);
                        this.stack.push(nextPoint);
                        done = true;
                    }
                    else {
                        this.stack.pop();
                    }
                } while (!done && !this.stack.isEmpty());
            };
            DfsMazeGenerator.prototype.isDone = function () {
                return this.stack.isEmpty();
            };
            DfsMazeGenerator.prototype.chooseUnvNeighbor = function (unvNeighbors) {
                return unvNeighbors[this.rand.nextInt(unvNeighbors.length)];
            };
            DfsMazeGenerator.prototype.unvNeighbors = function (p) {
                var maze = this.maze, neighbors = maze.neighbors(p, 2), unvNeighbors = [];
                for (var _i = 0, neighbors_1 = neighbors; _i < neighbors_1.length; _i++) {
                    var elem = neighbors_1[_i];
                    if (!this.visited.contains(elem)) {
                        unvNeighbors.push(elem);
                    }
                }
                return unvNeighbors;
            };
            DfsMazeGenerator.prototype.pointBetween = function (a, b) {
                if (a.x === b.x) {
                    return new Point(a.x, Math.min(a.y, b.y) + 1);
                }
                else {
                    return new Point(Math.min(a.x, b.x) + 1, a.y);
                }
            };
            return DfsMazeGenerator;
        }());
        generator.DfsMazeGenerator = DfsMazeGenerator;
    })(generator = maze_1.generator || (maze_1.generator = {}));
})(maze || (maze = {}));
