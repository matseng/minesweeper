// minesweeper-directive.js
angular.module('minesweeper')
  .directive('minesweeper', [function() {
    return {
      restrict: 'E',
      controller: 'minesweeper-controller',
      templateUrl: './src/modules/main.html',
      scope: {}
    };
  }]);
