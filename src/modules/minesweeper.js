// minesweeper.js
angular.module('minesweeper', []);

angular.module('minesweeper')
  .directive('minesweeperDirective', [function() {
    return {
      restrict: 'E',
      // replace:'true',
      controller: 'MyController',
      template: '<div>hello world </div>',
      // templateURL: 'main.html'
      // templateURL: '/modules/main.html'
      // templateURL: 'src/modules/main.html',
      // scope: {selection: '='}
      // controller: function($scope, $element){},
      link: link
    };

    function link($scope, element, attrs) {
      console.log("hello world");
    }
  }]);
