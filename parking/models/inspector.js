/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal('can/model')
.then(function(){

/**
 * @class Inspector
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend candidato services.
 */
can.Model("Inspector",{
        findAll: function (params, success, error) {
            return $.ajax({
                url: 'http://localhost/slim_php/backend_parking/inspectores.php/inspectores',
                type: 'get',
                dataType: 'json',
                //data: JSON.stringify(params),
                success: success,
                error: error
            });
        },
        findOne : 'GET /inspectors/{id}',
        create: function (params, success, error) {
            return $.ajax({
                url: 'http://localhost/slim_php/backend_parking/inspectores.php/inspectores',
                type: 'post',
                dataType: 'json',
                data: JSON.stringify(params),
                success: success,
                error: error
            });
        },
        update  : 'PUT /inspectors/{id}',
        destroy: function (params, success, error) {
            return $.ajax({
                url: 'http://localhost/slim_php/backend_parking/inspectores.php/inspectores/'+params,
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
{})
});