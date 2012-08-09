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
        
	findAll: "GET /zonas",
  	findOne : "GET /zonas/{id}",
  	create : "POST /zonas",
 	update : "PUT /zonas/{id}",
  	destroy : "DELETE /zonas/{id}",
        models  : function(data){
            return data.items;
        } 
        
},
/* @Prototype */
{

});

})