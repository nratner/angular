(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItemsTable.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.isEmpty = function() {
      return list.found && list.found.length == 0;
    }
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;

    menu.searchTerm = "";

     menu.findItem = function() {
      if (menu.searchTerm === "") {
        menu.items = [];
        return;
      }
      var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
      promise.then(function(response) {
        menu.items = response;
      })
      .catch(function(error) {
        console.log("Whoopsies...it's messed up", error);
      });
    };

    menu.removeItem = function(index) {
      menu.items.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        return $http({
          method: 'GET',
          url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
        }).then(function (result) {
        // process result and only keep items that match
        var menuItem = result.data.menu_items;

        var foundItems = [];

        for (var i = 0; i < menuItem.length; i++) {
          if (menuItem[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
            foundItems.push(menuItem[i]);
          }
        }
        // return processed items
        return foundItems;
      });
    };
  }

}
)();
