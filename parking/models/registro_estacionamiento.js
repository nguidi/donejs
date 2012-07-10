steal('can/model')
.then(function(){
 can.Model('Reg_estacionamiento',{
     /* @Static */

        findAll : 'GET /reg_estacionamientos',
        findOne : 'GET /reg_estacionamientos/{id}',
        create  : 'POST /reg_estacionamientos',
        update  : 'PUT /reg_estacionamientos/{id}',
        destroy : 'DELETE /reg_estacionamientos/{id}',
        models  : function(data){
            return data.items;
        }
        },
        /* @Prototype */
        {

        }


    ),
    can.Model("Status",{
        findAll : 'GET /reg_estacionamientos',
        models  : function(data){
            var newData = new Array()
            $.each(data.items,function(index,elem){
               newData.push({
                   id: elem.id,
                   marca:elem.marca_auto_id,
                   dias:getday(new Date(elem.fecha))
                   tiempo:((new Date("2012-03-13 14:04:23")-(new Date("2012-03-13 14:03:10")))/1000)
                   debito: (elem.debcred == 1) ? elem.importe : 0,
                   credito: (elem.debcred == 2) ? elem.importe : 0,
                   detalle: elem.detalle
               })
            })
            return newData
        }
    }, {})}
)