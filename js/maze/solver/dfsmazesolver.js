var maze;
(function (maze_1) {
    var solver;
    (function (solver) {
        var DfsMazeSolver = (function () {
            function DfsMazeSolver() {
                this.visited = new HashSet();
                this.stack = new Stack();
                this.rand = new Random();
            }
            DfsMazeSolver.prototype.solve = function (maze) {
                this.init(maze);
                while (!this.stack.isEmpty()) {
                    if (this.step()) {
                        break;
                    }
                }
                if (this.stack.isEmpty()) {
                    return false;
                }
                while (!this.stack.isEmpty()) {
                    var p = this.stack.pop();
                    maze.setCellType(p, maze_1.Cell.Type.SOLUTION);
                }
                maze.setCellType(this.start, maze_1.Cell.Type.START);
                return true;
            };
            DfsMazeSolver.prototype.init = function (maze) {
                this.start = maze.getStart();
                this.goal = maze.getGoal();
                this.visited.clear();
                this.stack.clear();
                this.stack.push(this.start);
                this.maze = maze;
            };
            DfsMazeSolver.prototype.step = function () {
                var maze = this.maze, currentPoint = this.stack.peek(), unvNeighbors = this.unvNeighbors(currentPoint, maze);
                this.visited.add(currentPoint);
                if (unvNeighbors.length > 0) {
                    var nextPoint = this.chooseUnvNeighbor(unvNeighbors);
                    if (nextPoint.equals(this.goal)) {
                        return true;
                    }
                    maze.setCellType(nextPoint, maze_1.Cell.Type.SOLUTION);
                    this.stack.push(nextPoint);
                }
                else {
                    this.stack.pop();
                    maze.setCellType(currentPoint, maze_1.Cell.Type.HIGHLIGHT);
                }
                return false;
            };
            DfsMazeSolver.prototype.isDone = function () {
                return this.stack.isEmpty();
            };
            DfsMazeSolver.prototype.chooseUnvNeighbor = function (unvNeighbors) {
                return unvNeighbors[this.rand.nextInt(unvNeighbors.length)];
            };
            DfsMazeSolver.prototype.unvNeighbors = function (p, maze) {
                var neighbors = maze.neighbors(p, 1), result = [];
                for (var _i = 0, neighbors_1 = neighbors; _i < neighbors_1.length; _i++) {
                    var elem = neighbors_1[_i];
                    if (!this.visited.contains(elem) && maze.getCellAt(elem).getType() !== maze_1.Cell.Type.WALL) {
                        result.push(elem);
                    }
                }
                return result;
            };
            return DfsMazeSolver;
        }());
        solver.DfsMazeSolver = DfsMazeSolver;
    })(solver = maze_1.solver || (maze_1.solver = {}));
})(maze || (maze = {}));
