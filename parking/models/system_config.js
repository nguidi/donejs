steal('jquery/model',
        function(){

/**
 * @class Oficios.Models.Usuario
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend usuario services.  
 */
$.Model('SystemConfig',
/* @Static */
{
        
	findAll: "/system_configs.json",
  	findOne : "/system_configs/{id}.json",
  	create : "/system_configs.json",
 	update : "/system_configs/{id}.json",
  	destroy : "/system_configs/{id}.json"
        
},
/* @Prototype */
{

});

})