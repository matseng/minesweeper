// minesweeper-factory.js
angular.module('minesweeper')
  .factory('minesweeper_factory', ['$http', function($http){
    return {

      get: function(){
        return $http.get('http://localhost:3000/');
      },

      post: function(board){
        return $http.post(url, board);
      }
    }

  }]);
