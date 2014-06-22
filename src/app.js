angular.module('MyApp', []);

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
      this.winner = null;  //null, 0, 1
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
        console.log(i,j,this.board[i][j].mine);
      }

      function getRandomIndex() {
        return index = Math.floor(Math.random() * (n));
      };
    };

    $scope.validate = function() {
      $scope.board.validate();
    };

    Board.prototype.validate = function() {
      var mineCleared;
      for(var i = 0; i < this.n; i++) {
        for(var j = 0; j < this.n; j++) {
          mineCleared = isMineCleared(this.board[i][j]);
          if(mineCleared === false) {
            this.winner = false;
            console.log(this.winner);
            return;
          }
        }
      }
      this.winner = true;
      console.log(this.winner);

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

    (function initializeClickHandler() {
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

    Board.prototype.showTile = function(i, j) {
      var tile = this.board[i][j];
      tile.show = true;
      if(tile.mine) this.winner = false;
      $scope.$apply();
    }

    Board.prototype.disarmMine = function(i, j) {
      var tile = this.board[i][j];
      // console.log(tile.disarm);
      tile.disarm = !tile.disarm;
      // console.log(tile.disarm);
      // $scope.$apply();
    };

    $scope.newGame = function() {
      initializeNewGame();
    };

    $scope.toggleXRayVision = function() {
      $scope.xrayVision = !$scope.xrayVision;
      console.log($scope.xrayVision);
    };
    
    function initializeNewGame() {
      var n = 8;
      var numberOfMines = 10;
      var board = new Board(n, numberOfMines)
      board.initializeBoard();
      board.addMines(numberOfMines)
      board.countAdjacentMines();
      $scope.board = board;
      console.log($scope.board);
      $scope.xrayVision = false;
    };

    initializeNewGame();

  }]);
