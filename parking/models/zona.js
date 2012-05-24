steal('can/model')
.then(function(){

/**
 * @class Oficios.Models.Usuario
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend usuario services.  
 */
can.Model('Zona',
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