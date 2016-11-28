(function() {
  'use strict';
  
  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.items = "";
    $scope.message = "";

    $scope.checkcount = function() {
      $scope.message = messageForDishes($scope.items);
      $scope.messageClass = classForMessage($scope.items);
      $scope.inputClass = classForInput($scope.items);
    };

    $scope.reset = function() {
      $scope.message = "";
    }
  }

  function messageForDishes(items) {
    if (items.trim() == "") {
      return "Please enter data first";
    }
    else if (numberOfDishes(items) <= 3) {
      return "Enjoy!";
    }
    else {
      return "Too much!";
    }
  }

  function numberOfDishes(items) {
    var dishes = items.split(",");
    var dishcount = 0;
    for (var i = 0; i < dishes.length; i++) {
      if (dishes[i].trim() != "") {
        dishcount ++;
      }
    }
    return dishcount;
  }
}
)();
