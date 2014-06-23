// minesweeper.js
angular.module('minesweeper', []);

angular.module('minesweeper')
  .directive('minesweeperDirective', [function() {
    return {
      restrict: 'E',
      controller: 'MyController',
      templateUrl: './src/modules/main.html',
      // scope: {selection: '='}
      // controller: function($scope, $element){},
      link: link
    };

    function link($scope, element, attrs) {
      console.log("hello world");
    }
  }]);
