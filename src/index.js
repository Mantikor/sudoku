module.exports = function solveSudoku(matrix) {
  // your solution
    function find_next_cell_to_fill(grid, i, j) {
        for (let x=i; x <= 8; x++) {
            for (let y=j; y <= 8; y++) {
                if (grid[x][y] === 0) return [x, y];
            }
        }
        for (let x=0; x <= 8; x++) {
            for (let y=0; y <= 8; y++) {
                if (grid[x][y] === 0) return [x, y];
            }
        }
        return [-1, -1];
    }

    function is_valid(grid, i, j, e) {
        let rowOk = true;
        for (let x = 0; x <= 8; x++) if (e === grid[i][x]) {
            rowOk = false;
            break;
        }
        if (rowOk) {
            let columnOk = true;
            for (let x = 0; x <= 8; x++) if (e === grid[x][j]) {
                columnOk = false;
                break;
            }
            if (columnOk) {
                [secTopX, secTopY] = [(3 * Math.floor(i / 3)), (3 * Math.floor(j / 3))];
                for (let x=secTopX; x <= (secTopX+2); x++) {
                    for (let y=secTopY; y <= (secTopY+2); y++) {
                        if (grid[x][y] === e) return false;
                    }
                }
                return true;
            }
        }
        return false
    }

    function solve_sudoku(grid, i, j) {
        [i, j] = find_next_cell_to_fill(grid, i, j);
        if (i === -1) return true;
        for (let e=1; e <= 9; e++) {
            if (is_valid(grid, i, j, e)) {
                grid[i][j] = e;
                if (solve_sudoku(grid, i, j)) return true;
                grid[i][j] = 0
            }
        }
        return false;
    }
    if (solve_sudoku(matrix, 0, 0)) return matrix;
    return matrix;
}
