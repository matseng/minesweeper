angular.module('MyApp', ['minesweeper']);

angular.module('MyApp')
  .controller('MyController', ['$scope', function($scope) {

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
      $scope.$apply();
    }

    Board.prototype.disarmMine = function(i, j) {
      var tile = this.board[i][j];
      tile.disarm = !tile.disarm;
    };

    
    (function initializeScopeParameters() {
      $scope.boardSizes = [{n:8}, {n:10}, {n:12}, {n:16}];
      $scope.select = {};
      $scope.select.boardSize = $scope.boardSizes[0];
      $scope.numberOfMines = [{text:'easy', num:10}, {text:'medium', num:20}, {text:'hard', num:30}];
      $scope.select.numberOfMines = $scope.numberOfMines[0];
      
      $scope.selectionChanged = function() {
        $scope.select.changed = true;
      };

      $scope.validate = function() {
        $scope.board.validate();
      };

      $scope.toggleXRayVision = function() {
        $scope.xrayVision = !$scope.xrayVision;
      };

      $scope.newGame = function() {
        newGame();
      }
    })();

    (function initializeBoardClickHandler() {
      var numOfClicks = 0;
      $scope.clickHandler = function(i, j, $event) {
        numOfClicks += 1;
        if(numOfClicks === 2) {
          doubleClick(i, j);
          numOfClicks = 0;
        } 
        
        setTimeout(function(){
          if(numOfClicks === 1) {
            singleClick(i, j);
            numOfClicks = 0;
          }
        }, 300);

        function singleClick() {
          $scope.board.showTile(i,j);
        };
        
        function doubleClick() {
          $scope.board.disarmMine(i,j);
        };
      };
    })();

    var newGame = function() {
      var n = $scope.select.boardSize.n;
      var numberOfMines = $scope.select.numberOfMines.num;
      var board = new Board(n, numberOfMines)
      board.initializeBoard();
      board.addMines(numberOfMines)
      board.countAdjacentMines();
      $scope.board = board;
      $scope.xrayVision = false;
      $scope.select.changed = false;
    };

    newGame();

  }]);
