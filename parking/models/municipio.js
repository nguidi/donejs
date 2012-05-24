steal('can/model')
.then(function(){

/**
 * @class Oficios.Ciudad
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend candidato services.  
 */
can.Model('Municipio',
/* @Static */
{
	findAll: "/municipios",
  	findOne : "/municipios/{id}", 
  	create : "/municipios",
 	update : "/municipios/{id}",
  	destroy : "/municipios/{id}"
},
/* @Prototype */
{});

})