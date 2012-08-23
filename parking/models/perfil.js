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
        
	findAll: "GET /perfils",
  	findOne : "GET /perfils/{id}",
  	create : "POST /perfils",
 	update : "PUT /perfils/{id}",
  	destroy : "DELETE /perfils/{id}",
        models  : function(data){
            return data;
        } 
        
},
/* @Prototype */
{

});

})