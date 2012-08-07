steal('can/model')
.then(function(){

/**
 * @class Menu
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend usuario services.  
 */
can.Model('Menu',
/* @Static */
{
	findAll: "/menus",
  	findOne : "/menus/{id}",
  	create : "/menus",
 	update : "/menus/{id}",
  	destroy : "/menus/{id}",
        models  : function(data){
            return data.items;
        } 
},
/* @Prototype */
{
});

})