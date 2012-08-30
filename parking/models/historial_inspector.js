/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal('can/model')
.then(function(){


    can.Model("Historial_Inspector",{
        findAllByInspector : function (params, success, error) {
            return $.ajax({
                url: '/historial_inspector/registros',
                type: 'POST',   
                dataType: 'json',
                data: params
                //data: JSON.stringify(params)
            });
        }
    }, {})

})