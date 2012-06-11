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
    )}
)