// minesweeper-directive.js
angular.module('minesweeper')
  .directive('minesweeper', [function() {
    return {
      restrict: 'E',
      controller: 'minesweeper-controller',
      templateUrl: './src/modules/main.html',
      // scope: {selection: '='}
      link: link
    };

    function link($scope, element, attrs) {
      console.log("hello world");
    }
  }]);
