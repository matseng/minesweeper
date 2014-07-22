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
      // this.numberOfMines = 63;
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

    Board.prototype.addMines = function(iTileClicked, jTileClicked) {
      var i, j, index, n, countMinesAdded;
      n = this.n;
      var myBoard = this;
      countMinesAdded = 0 ;
      var currRandomTile;
      var availableTiles = getSingleArrayOfBoard(this);
      for(var k = 0; k <= this.numberOfMines; k++) {
      // while (countMinesAdded <= this.numberOfMines) {
        // i = getRandomIndex();
        // j = getRandomIndex();
        // while (this.board[i][j].mine === true) {
        //   i = getRandomIndex();
        //   j = getRandomIndex();
        // }
        // index = getRandomAvailableIndex();
        currRandomTile = getRandomAvailableTile();

        if(currRandomTile.mine === null) {
          currRandomTile.mine = true;
          // countMinesAdded += 1;
        }
      }

      function getSingleArrayOfBoard(board) {
        var result = [];
        for(var i = 0; i < board.n; i++){
          for(var j = 0; j < board.n; j++) {
            result.push(i * board.n + j);
          }
        }
        return result;
      }

      var indexOfTileClicked = iTileClicked * this.n + jTileClicked;
      availableTiles.splice(indexOfTileClicked, 1);
      
      function getRandomAvailableTile() {
        var i, j;
        index = Math.floor(Math.random() * (availableTiles.length));
        tileIndex = availableTiles[index];
        i = Math.floor(tileIndex / n);
        j = tileIndex % n;
        availableTiles.splice(index, 1);
        return myBoard.board[i][j];
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
      var self = this;
      var i, j;
      for(var i = 0; i < this.n; i++) {
        for(var j = 0; j < this.n; j++) {
          countAdjacentMinesPerTile.bind(this)(i, j);
        }
      }

      function countAdjacentMinesPerTile(x, y) {
        var count, tile;
        count = 0;
        // for(var i = x - 1; i <= x + 1; i++) {
        //   for(var j = y - 1; j <= y + 1; j++) {
        //     if(i >= 0 && j >= 0 && i < this.n && j < this.n) {
        //       tile = this.board[i][j];
        //       if(tile.mine === true) {
        //         count += 1;
        //       }
        //     }
        //   }
        // }
        var currTile;
        self.forEachAdjacentTile(x, y, function(i, j) {
          currTile = self.board[i][j];
          if( currTile.mine === true){
            count += 1;
          }
        });

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

    Board.prototype.tileClicked = function(i, j) {
      var tile = this.board[i][j];
      if(tile.mine === null) {
        tile.mine = false;
        this.addMines(i, j)
        this.countAdjacentMines();
      }
      if(tile.show === false) {
        this.showTile(i, j);
        if(tile.adjacentMines === 0) {
          this.forEachAdjacentTile(i, j, Board.prototype.tileClicked.bind(this));
          // this.forEachAdjacentTile(i, j, this.tileClicked);
        }
      }
    };

    Board.prototype.forEachAdjacentTile = function(x, y, cb) {
      for(var i = x - 1; i <= x + 1; i++) {
        for(var j = y - 1; j <= y + 1; j++) {
          if( inBounds.call(this, i, j) ) {
            cb(i, j);
          }
        }
      }
      function inBounds(i, j) {
        return (i >= 0 && j >= 0 && i < this.n && j < this.n);
      }
    };

    return Board;

  }]);
