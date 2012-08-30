/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal('can/model')
.then(function(){
    

    can.Model("Cuenta_corriente",{
        findByUsuario: function (params, success, error) {
            return $.ajax({
                url: '/slim_php/backend_parking/cuenta_corriente.php/cuenta_corriente/usuario/'+params.id,
                type: 'GET',   
                dataType: 'json'
                //data: JSON.stringify(params)
            });
        }
    }, {})
})