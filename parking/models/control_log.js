/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal('can/model')
.then(function(){
    

    can.Model("Control_log",{
        findByUsuario: function (params, success, error) {
            return $.ajax({
                //url: '/control_log/findByUsuario',
                url: '/slim_php/backend_parking/control_log.php/control_log/usuarios/'+params.id,
                type: 'GET',   
                dataType: 'json'
                //data: JSON.stringify(params)
            });
        }
    }, {})
    

})