// board-service.js
angular.module('minesweeper')
  .service('boardService', [function() {

    var Tile = function(i, j) {
      this.i = i;
      this.j = j;
      this.mine = null;
      this.adjacentMines = null;
      this.show = false;
      this.disarm = false;
    };

    var Board = function(n, numberOfMines) {
      this.n = n || 8;
      this.numberOfMines = numberOfMines || 10;
      this.board = [];
      this.winner = null;
    };

    Board.prototype.initializeBoard = function() {
      var row, n;
      n = this.n;
      for(var i = 0; i < n; i++) {
        row = [];
        for(var j = 0; j < n; j++) {
          row[j] = new Tile(i, j);
        }
        this.board.push(row);
      }
    };

    Board.prototype.addMines = function() {
      var i, j, n;
      n = this.n;
      for(var k = 0; k < this.numberOfMines; k++) {
        i = getRandomIndex();
        j = getRandomIndex();
        while (this.board[i][j].mine === true) {
          i = getRandomIndex();
          j = getRandomIndex();
        }
        this.board[i][j].mine = true;
      }

      function getRandomIndex() {
        return index = Math.floor(Math.random() * (n));
      };
    };


    Board.prototype.validate = function() {
      var mineCleared;
      for(var i = 0; i < this.n; i++) {
        for(var j = 0; j < this.n; j++) {
          mineCleared = isMineCleared(this.board[i][j]);
          if(mineCleared === false) {
            this.winner = false;
            return;
          }
        }
      }
      this.winner = true;

      function isMineCleared(tile) {
        if(tile.mine && tile.disarm)
          return true;
        if(!tile.mine && !tile.disarm)
          return true;
        return false;
      };
    };

    Board.prototype.countAdjacentMines = function() {
      var i, j;
      for(var i = 0; i < this.n; i++) {
        for(var j = 0; j < this.n; j++) {
          countAdjacentMinesPerTile.bind(this)(i, j);
        }
      }

      function countAdjacentMinesPerTile(x, y) {
        var count, tile;
        count = 0;
        for(var i = x - 1; i <= x + 1; i++) {
          for(var j = y - 1; j <= y + 1; j++) {
            // TODO: isInBounds method:
            if(i >= 0 && j >= 0 && i < this.n && j < this.n) {
              tile = this.board[i][j];
              if(tile.mine === true) {
                count += 1;
              }
            }
          }
        }
        this.board[x][y].adjacentMines = count;
      };
    };

    Board.prototype.showTile = function(i, j) {
      var tile = this.board[i][j];
      tile.show = true;
      if(tile.mine) this.winner = false;
    }

    Board.prototype.disarmMine = function(i, j) {
      var tile = this.board[i][j];
      tile.disarm = !tile.disarm;
    };

    return Board;

  }]);
