describe('SignUpController', function() {
  'use strict';

  var $httpBackend;
  var ApiPath;
  var MenuService;
  var MyInfoService;
  var SignUpController;

  var menuItem = {
    "id": 1,
    "short_name": "A1",
    "category_short_name": "A",
    "name": "Won Ton Soup with Chicken",
    "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
    "price_small": 2.55,
    "price_large": 5.00,
    "small_portion_name": pint,
    "large_portion_name": quart,
    "image_present": true
  };


  beforeEach(function() {
    module('restaurant');

    inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');

      var $controller = $injector.get('$controller');
      var MenuService = $injector.get('MenuService');
      var MyInfoService = $injector.get('MyInfoService');

      SignUpController = $controller('SignUpController', {
        MenuService: MenuService,
        MyInfoService: MyInfoService
      });

      $httpBackend.whenGET('src/public/public.html').respond('');
      $httpBackend.whenGET('src/public/home/home.html').respond('');
    });

  });

  it('should show error message if the item number is invalid', function() {
    expect(SignUpController.invalidFavorite).not.toBeDefined();
    var shortName = "A1";
    SignUpController.info = {
      'favorite': shortName
    }
    $httpBackend.expectGET(ApiPath + "/menu_items/" + shortName + ".json").respond(500, '');

    SignUpController.validateFavorite(shortName);

    $httpBackend.flush();

    expect(SignUpController.invalidFavorite).toBe(true);
  });

  it('should show error message if the item number is valid', function() {
    expect(SignUpController.invalidFavorite).not.toBeDefined();
    var shortName = "L1";
    SignUpController.info = {
      'favorite': shortName
    }
    $httpBackend.expectGET(ApiPath + "/menu_items/" + shortName + ".json").respond(menuItem);

    SignUpController.validateFavorite(shortName);

    $httpBackend.flush();

    expect(SignUpController.invalidFavorite).toBe(false);
  });

});
