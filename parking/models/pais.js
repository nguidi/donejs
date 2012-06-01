steal('jquery/model',
        function(){

/**
 * @class Oficios.Models.Usuario
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend usuario services.  
 */
$.Model('Pais',
/* @Static */
{
        
	findAll: "/pais.json",
  	findOne : "/pais/{id}.json",
  	create : "/pais.json",
 	update : "/pais/{id}.json",
  	destroy : "/pais/{id}.json"
        
},
/* @Prototype */
{

});

})