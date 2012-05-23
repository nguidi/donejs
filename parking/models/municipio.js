steal('jquery/model', function(){

/**
 * @class Oficios.Ciudad
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend candidato services.  
 */
$.Model('Municipio',
/* @Static */
{
	findAll: "/municipios.json",
  	findOne : "/municipios/{id}.json", 
  	create : "/municipios.json",
 	update : "/municipios/{id}.json",
  	destroy : "/municipios/{id}.json"
},
/* @Prototype */
{});

})