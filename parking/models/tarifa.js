/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal('can/model')
.then(function(){
    

    can.Model("Tarifa",{
        findAll : 'GET /tarifas',
        findOne : 'GET /tarifas/{id}',
        create  : 'POST /tarifas',
        update  : 'PUT /tarifas/{id}',
        destroy : 'DELETE /tarifas/{id}',
        models  : function(data){
            return data.items;
        }
     
    }, {})
    
    can.Model("Tarifa_select",{
        findAll : 'GET /tarifas',
        findOne : 'GET /tarifas/{id}',
        create  : 'POST /tarifas',
        update  : 'PUT /tarifas/{id}',
        destroy : 'DELETE /tarifas/{id}',
        models  : function(data){
            var newData = new Array()
            $.each(data.items,function(index,elem){
                newData.push({
                    value: elem.id,
                    text: elem.tiempo
                })
            })
            return newData
        } 
     
    }, {})

})