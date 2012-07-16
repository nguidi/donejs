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
        destroy : 'DELETE /marcas/{id}',
        models  : function(data){
            return data.items;
        }
},
/* @Prototype */
{});

can.Model('Marca_select',
/* @Static */
{
	findAll : 'GET /marcas',
        findOne : 'GET /marcas/{id}',
        create  : 'POST /marcas',
        update  : 'PUT /marcas/{id}',
        destroy : 'DELETE /marcas/{id}',
        models  : function(data){
            var newData = new Array()
            $.each(data.items,function(index,elem){
                newData.push({
                    value: elem.id,
                    text: elem.marca
                })
            })
            return newData
        }
},can.Model('Marca_nombre',
/* @Static */
{
        findOne : 'GET /marcas/{id}',
        model  : function(elem){
            return elem.marca
        }
},
/* @Prototype */
{});

})
