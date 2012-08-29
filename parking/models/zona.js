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
        
	findAll: function (params, success, error) {
            return $.ajax({
                url: 'http://localhost/slim_php/backend_parking/zonas.php/zonas',
                type: 'get',
                dataType: 'json',
                //data: JSON.stringify(params),
                success: success,
                error: error
            });
        },
  	findOne : "GET /zonas/{id}",
  	create: function (params, success, error) {
            return $.ajax({
                url: 'http://localhost/slim_php/backend_parking/zonas.php/zonas',
                type: 'post',
                dataType: 'json',
                data: JSON.stringify(params),
                success: success,
                error: error
            });
        },
 	update : "PUT /zonas/{id}",
        destroy: function (params, success, error) {
            return $.ajax({
                url: 'http://localhost/slim_php/backend_parking/zonas.php/zonas/'+params,
                type: 'delete',
                dataType: 'json',
                //data: JSON.stringify(params),
                success: success,
                error: error
            });
        },
        models  : function(data){
            return data;
        } 
        
},
/* @Prototype */
{

});

})