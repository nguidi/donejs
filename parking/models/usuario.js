/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal('can/model')
.then(function(){
    

    can.Model("User",{
        findOne : 'GET /users/{id}',
        create  : 'POST /users',
        update  : 'PUT /users/{id}',
        destroy : 'DELETE /users/{id}',
        findAll: function (params, success, error) {
            return $.ajax({
                url: 'http://localhost/slim_php/backend_parking/clientes.php/clientes',
                type: 'get',
                dataType: 'json',
                data: JSON.stringify(params),
                success: success,
                error: error
            });
        },
        autenticar: function (params, success, error) {
            return $.ajax({
                url: 'http://localhost/slim_php/backend_parking/login.php/login',
                type: 'post',
                dataType: 'json',
                data: JSON.stringify(params),
                success: success,
                error: error
            });
        },
        models  : function(data){
            return data;
        }
    }, {})
    

})
