/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal('can/model')
.then(function(){
    

    can.Model("Cliente",{
        estacionar: function (params, success, error) {
            return $.ajax({
                url: '/slim_php/backend_parking/clientes.php/clientes/accion/0',
                type: 'POST',   
                dataType: 'json',
                data: JSON.stringify(params)
            });
        },
        extender: function (params, success, error) {
            return $.ajax({
                url: '/slim_php/backend_parking/clientes.php/clientes/accion/1',
                type: 'POST',   
                dataType: 'json',
                data: JSON.stringify(params)
            });
        },
        recargar: function (params, success, error) {
            return $.ajax({
                url: '/slim_php/backend_parking/clientes.php/clientes/recargar',
                type: 'POST',   
                dataType: 'json',
                data: JSON.stringify(params)
            });
        },
        estado: function(params, success, error) {
            return $.ajax({
                url: '/slim_php/backend_parking/clientes.php/clientes/estado/'+params.id,
                type: 'GET',   
                dataType: 'json'
            });
        },
        estadoPatente: function(params, success, error) {
            return $.ajax({
                url: '/slim_php/backend_parking/clientes.php/clientes/estadoPatente',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(params)
            })
        }
    }, {})
    

})