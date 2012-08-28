steal('can/model')
.then(function(){

/**
 * @class Menu
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend usuario services.  
 */
can.Model('Menu',
/* @Static */
{
	//findAll: "/menus",
  	findOne : "/menus/{id}",
  	create : "/menus",
 	update : "/menus/{id}",
  	destroy : "/menus/{id}",
        findAll: function (params, success, error) {
            return $.ajax({
                url: 'http://localhost/slim_php/backend_parking/menu.php/menus',
                type: 'get',
                dataType: 'json',
                data: params,
                success: function(data){
                },
                error: error
            });
        },
        findByPerfil: function (params, success, error) {
            return $.get('http://localhost/slim_php/backend_parking/menu.php/menus/perfil/'+params);
        },
        models  : function(data){
            return data.items;
        } 
},
/* @Prototype */
{
});

})