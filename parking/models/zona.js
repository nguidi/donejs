steal('jquery/model',
        function(){

/**
 * @class Oficios.Models.Usuario
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend usuario services.  
 */
$.Model('Zona',
/* @Static */
{
        
	findAll: "/zonas.json",
  	findOne : "/zonas/{id}.json",
  	create : "/zonas.json",
 	update : "/zonas/{id}.json",
  	destroy : "/zonas/{id}.json"
        
},
/* @Prototype */
{

});

})