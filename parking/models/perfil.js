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
        
	findAll: function (params, success, error) {
            return $.ajax({
                url: 'http://localhost/slim_php/backend_parking/perfiles.php/perfiles',
                type: 'get',
                dataType: 'json',
                data: JSON.stringify(params),
                success: success,
                error: error
            });
        },
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