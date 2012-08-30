steal('jquery/model',
        function(){

/**
 * @class Oficios.Models.Usuario
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend usuario services.  
 */
$.Model('Perfil',
/* @Static */
{
        
	findAll: "/perfils.json",
  	findOne : "/perfils/{id}.json",
  	create : "/perfils.json",
 	update : "/perfils/{id}.json",
  	destroy : "/perfils/{id}.json"
        
},
/* @Prototype */
{

});

})