/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal('can/model')
.then(function(){
    

    can.Model("Tarifa",{
        findOne : 'GET /slim_php/backend_parking/tarifas.php/tarifas/{id}',
        findByZona: function (params, success, error) {
            return $.ajax({
                url: '/tarifas/findByZona',
                type: 'GET',   
                dataType: 'json',
                data: params
                //data: JSON.stringify(params)
            });
        }     
    }, {})
    
    can.Model('Tarifa_select',
        /* @Static */
        {
                findAll: function(params, success, error) {
                    return $.ajax({
                        url: '/slim_php/backend_parking/tarifas.php/tarifas',
                        type: 'GET',
                        dataType: 'json'
                    })
                },
                models  : function(data){
                    var newData = new Array()
                    $.each(data,function(index,elem){
                        newData.push({
                            value: elem.id,
                            text: elem.tiempo+' Minutos = $'+elem.precio
                        })
                    })
                    return newData
                } 
        },
        /* @Prototype */
        {}
    );

})