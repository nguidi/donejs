steal('jquery/model',
        function(){

/**
 * @class Oficios.Models.Usuario
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend usuario services.  
 */
$.Model('Menu',
/* @Static */
{
	findAll: "/menus.json",
  	findOne : "/menus/{id}.json",
  	create : "/menus.json",
 	update : "/menus/{id}.json",
  	destroy : "/menus/{id}.json"
},
/* @Prototype */
{
});

})