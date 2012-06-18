/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal('can/model')
.then(function(){
    

    can.Model("Recaudacion",{
        findAll : 'GET /recaudacions',
        findOne : 'GET /recaudacions/{id}',
        create  : 'POST /recaudacions',
        update  : 'PUT /recaudacions/{id}',
        destroy : 'DELETE /recaudacions/{id}',
        models  : function(data){
            return data.items;
        }
     
    }, {})
    
    can.Model("Autos",{
        findAll : 'GET /recaudacions',
        models  : function(data){
            var newData = new Array()
            $.each(data.items,function(i,elem){
               newData.push({
                    id: elem.id,
                    usuario_id: elem.usuario_id,
                    fecha: elem.fecha,
                    autos: elem.autos
                })
            })
            return newData
        }     
    }, {})

})