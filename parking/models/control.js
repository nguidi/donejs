/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal('can/model')
.then(function(){
    

    can.Model("Control",{
        estadoPatente: function(params,success,error){
            return $.ajax({
                url: '/control/estadoPatente',
                type: 'POST',
                dataType: 'json',
                data: params
                // data: JSON.strongify(params)
            })
        }
    }, {})
    

})