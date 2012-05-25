/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal('can/model')
.then(function(){
    

    can.Model("Cuenta_corriente",{
        findAll : 'GET /cuenta_corrientes',
        findOne : 'GET /cuenta_corrientes/{id}',
        create  : 'POST /cuenta_corrientes',
        update  : 'PUT /cuenta_corrientes/{id}',
        destroy : 'DELETE /cuenta_corrientes/{id}',
        models  : function(data){
            return data.items;
        }
     
    }, {})
    
    can.Model("Cuenta_corriente_deb",{
        findAll : 'GET /cuenta_corrientes',
        findOne : 'GET /cuenta_corrientes/{id}',
        create  : 'POST /cuenta_corrientes',
        update  : 'PUT /cuenta_corrientes/{id}',
        destroy : 'DELETE /cuenta_corrientes/{id}',
        models  : function(data){
            var newData = new Array()
            $.each(data.items,function(index,elem){
               newData.push({
                   id: elem.id,
                   fecha: elem.fecha,
                   debito: (elem.debcred == 1) ? elem.importe : 0,
                   credito: (elem.debcred == 2) ? elem.importe : 0,
                   detalle: elem.detalle
               })
            })
            return newData
        }
     
    }, {})

})