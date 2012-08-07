/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal('can/model')
.then(function(){

/**
 * @class Inspector
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend candidato services.
 */
can.Model("Inspector",{
        findAll : 'GET /inspectors',
        findOne : 'GET /inspectors/{id}',
        create  : 'POST /inspectors',
        update  : 'PUT /inspectors/{id}',
        destroy : 'DELETE /inspectors/{id}',
        models  : function(data){
            return data;
        }
},
/* @Prototype */
{})
});