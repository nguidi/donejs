/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal('can/model')
.then(function(){

/**
 * @class Oficios.Ciudad
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend candidato services.
 */
can.Model("Marca",{
        findAll : 'GET /marcas',
        findOne : 'GET /marcas/{id}',
        create  : 'POST /marcas',
        update  : 'PUT /marcas/{id}',
        destroy : 'DELETE /marcas/{id}'
},
/* @Prototype */
{});

can.Model('Marca_select',
/* @Static */
{
	findAll : 'GET /slim_php/backend_parking/marcas.php/marcas',
        models  : function(data){
            var newData = new Array()
            $.each(data,function(index,elem){
                newData.push({
                    value: elem.id,
                    text: elem.descripcion
                })
            })
            return newData
        }
},
/* @Prototype */
{});

})