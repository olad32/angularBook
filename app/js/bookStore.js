/*****************
 * Module principal BookStore
 * ***************/
"use strict";

angular.module("bookStore", ["bookStoreCtrl", "bookStoreSrv", "ngRoute", "ngSanitize"])
    .config(function ($routeProvider, cartProvider){
        $routeProvider.when("/Catalog", {
            templateUrl: "catalog.html",
            controller: "CatalogCtrl"
        });
        $routeProvider.when("/Book/:bookId", {
            templateUrl: "book.html",
            controller: "BookCtrl"
        });
        $routeProvider.when("/Cart", {
            templateUrl: "cart.html",
            controller: "CartCtrl"
        });
        $routeProvider.otherwise({
            redirectTo: "/Catalog"
        });
        cartProvider.setAlertHT(1000);
    })
    .filter("interval", function ($parse){
        return function (books, propertyExpression, min, max){
            var filteredBooks = [];
            
            //Parse l'expression
            var getter = $parse(propertyExpression);
            
            if(books != undefined){
                for(var i = 0; i < books.length; i++){
                    //Récupère la valeur de la propriété passé en paramètre
                    var value = getter(books[i]);
                    
                    if((!min || value >= min)
                        && (!max || value <= max)){
                        filteredBooks.push(books[i]);
                    }
                }
            }
            
            return filteredBooks;
        }
    });
