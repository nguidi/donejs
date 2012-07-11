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
                   fechaHora: new Date((elem.fecha).replace(" ","T")),
                   tiempo:( (new Date())-(this.fechaHora)  )/60000),//obtener minutos ya q un minuto son 60000 milisegundos
                   status:this.tiempo>=elem.tarifa_id
               })
            })
            return newData
        }
    }, {})}
)
