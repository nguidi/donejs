/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal('can/model')
.then(function(){
    

    can.Model("Credito_habilitado",{
        findbyCodigo: function (params, success, error) {
            return $.ajax({
                url: '/slim_php/backend_parking/credito_habilitado.php/credito_habilitado/findCodigo/'+params.codigo_carga,
                type: 'GET',   
                dataType: 'json'
            });
        }
    }, {})
})