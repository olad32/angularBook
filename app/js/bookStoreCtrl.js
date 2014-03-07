/************
 * Module des Controleurs
 ************/
"use strict";

angular.module("bookStoreCtrl", [])
    /****** CatalogCtrl ********/
    .controller("CatalogCtrl", function (catalog, searchCriteria, $scope, $rootScope){
        $rootScope.pageTitle = "Catalogue";
        
        catalog.getList().then(function (data){
            $scope.books = data;
        });
        
        $scope.searchCriteria = searchCriteria;
    })
    /****** BookCtrl ********/
    .controller("BookCtrl", function (catalog, $routeParams, $scope, $rootScope){
        
        catalog.getBook($routeParams.bookId).then(function (data){
            $scope.book = data;
            $rootScope.pageTitle = data.title;
        })
        
    })
    /****** GlobalCtrl ********/
    .controller("GlobalCtrl", function (cart, $scope, $location){
        
        $scope.addToCart = function (item){
            cart.add(item);
            $location.url("/Cart");
        }
        
    })
    /****** CartCtrl ********/
    .controller("CartCtrl", function (cart, $scope, $rootScope){
        
        $rootScope.pageTitle = "Panier";
        
        $scope.cart = cart;
        
    });