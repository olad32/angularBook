/************
 * Module des Services
 ************/
"use strict";

angular.module("bookStoreSrv", [])
    /****** Service fournissant la valeur de la tva *******/
    .value("tvaRate", 0.196)
    /****** Cart Service ********/
    .provider("cart", function (){
        var alertHT;
        
        this.setAlertHT = function (alert){
            alertHT = alert;
        }
        
        this.$get = function (tvaRate){
            return {
                rows: {},
                add: function(item){

                    if(!this.rows[item._id.$oid]){
                        this.rows[item._id.$oid] = {
                            item: item,
                            quantity: 1
                        }
                    }else{
                        this.rows[item._id.$oid].quantity++;
                    }

                },
                remove: function(row){
                    delete this.rows[row.item._id.$oid];
                },
                computeHT: function(row){
                    return row.quantity * row.item.price;
                },
                computeTTC: function(row){
                    return this.computeHT(row) * (1 + tvaRate);
                },
                computeHTSum: function(){
                    var sum = 0;

                    for(var key in this.rows){
                        sum += this.computeHT(this.rows[key]);
                    }

                    return sum;
                },
                computeTTCSum: function(){
                    var sum = 0;

                    for(var key in this.rows){
                        sum += this.computeTTC(this.rows[key]);
                    }

                    return sum;
                },
                alertHT: function(row){
                    return this.computeHT(row) > alertHT;
                }
            }
        };
    })
    /****** Service fournissant les critères de recherche *******/
    .value("searchCriteria", 
        {
            sortOptions: [
                {label: "Prix croissant", sortProperty: "price", sortOrder: "false"},
                {label: "Prix décroissant", sortProperty: "price", sortOrder: "true"},
                {label: "Titre", sortProperty: "title", sortOrder: "false"}]
        }
    )
    /****** Catalog Service ********/
    .provider("catalog", function (){
        this.$get = function ($http){
            var url = "https://api.mongolab.com/api/1/databases/books/collections/books/?apiKey=d3qvB8ldYFW2KSynHRediqLuBLP8JA8i";
            
            var booksPromise = $http.get(url).then(function (response){
                                    return response.data;
                                });
            
            return {
                getList: function (){
                    return booksPromise;
                },
                getBook: function (id){
                    return booksPromise.then(function (books){
                                var findedBook;
                                angular.forEach(books, function (book){
                                    if(book._id.$oid === id){
                                        findedBook = book;
                                    }
                                });
                                return findedBook;
                            });
                }
            };
        }
    });