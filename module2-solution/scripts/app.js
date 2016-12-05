(function() {
  'use strict';
  angular
    .module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var controller = this;

    controller.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

    controller.mustBuy = function(index) {
      ShoppingListCheckOffService.mustBuy(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var controller = this;

    controller.boughtItems = ShoppingListCheckOffService.getBoughtItems();

  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
      { name: "cookies", quantity: 5 },
      { name: "chips", quantity: 5 },
      { name: "soda", quantity: 12 },
      { name: "milk", quantity: 3 },
      { name: "ice cream", quantity: 10 }]
    var boughtItems = [];

    this.mustBuy = function (index) {
      boughtItems.push(toBuyItems[index]);
      toBuyItems.splice(index, 1);
    }

    this.getToBuyItems = function() {
      return toBuyItems;
    }

    this.getBoughtItems = function() {
      return boughtItems;
    }
  }

}
)();
