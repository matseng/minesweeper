// minesweeper-controller.js
angular.module('minesweeper')
  .controller('minesweeper-controller', 
    ['$scope', 'boardService', 'minesweeper_factory', function($scope, boardService, minesweeper_factory) {
    
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

    (function initializeBoardClickHandlers() {
      var numOfClicks = 0;
      $scope.clickHandler = function(i, j, $event) {
        numOfClicks += 1;
        if(numOfClicks === 2) {
          doubleClick(i, j);
          numOfClicks = 0;
        } 
        
        // TODO: use Angular's $timeout
        setTimeout(function(){
          if(numOfClicks === 1) {
            singleClick(i, j);
            numOfClicks = 0;
          }
        }, 300);

        function singleClick() {
          $scope.board.showTile(i,j);
          $scope.$digest();
          //Alternatively, $apply will do a try/catch, see docs!
          // $scope.$apply(function() {
          //   $scope.board.showTile(i,j);
          // });
        };
        
        function doubleClick() {
          $scope.board.disarmMine(i,j);
        };
      };
    })();

    var newGame = function() {
      var n = $scope.select.boardSize.n;
      var numberOfMines = $scope.select.numberOfMines.num;
      var board = new boardService(n, numberOfMines);
      board.initializeBoard();
      board.addMines(numberOfMines)
      board.countAdjacentMines();
      $scope.board = board;
      $scope.xrayVision = false;
      $scope.select.changed = false;
    };
    newGame();

    minesweeper_factory.get('pastMiddleware')
      .success(function(data, status){
        console.log(data, status);
      });

  }]);
