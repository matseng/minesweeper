angular.module('MyApp', []);

angular.module('MyApp')
  .controller('MyController', ['$scope', function($scope) {

    var Tile = function(i, j) {
      this.i = i;
      this.j = j;
      this.mine = null;
      this.adjacentMines = null;
      this.clicked = false;
    };

    var Board = function(n, numberOfMines) {
      this.n = n || 8;
      this.numberOfMines = numberOfMines || 10;
      this.board = [];
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

    $scope.tileClicked = function(i,j, $event) {
      var tile = $scope.board.board[i][j];
      tile.clicked = true;
      console.log(i,j, 'mine:' + tile.mine);
      console.log($scope, $event);
    };

    $scope.newGame = function() {
      initializeNewGame();
    };

    $scope.toggleCheat = function() {
      $scope.cheat = !$scope.cheat;
    };
    
    function initializeNewGame() {
      var n = 8;
      var numberOfMines = 10;
      var board = new Board(n, numberOfMines)
      board.initializeBoard();
      console.log(board);
      board.addMines(numberOfMines)
      board.countAdjacentMines();
      $scope.board = board;
      console.log($scope.board);
    };

    initializeNewGame();

  }]);
