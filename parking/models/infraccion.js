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
can.Model("Infraccion",{
        findAll : 'GET /rpt_infracciones',
        findOne : 'GET /rpt_infracciones/{id}',
        create  : 'POST /rpt_infracciones',
        update  : 'PUT /rpt_infracciones/{id}',
        destroy : 'DELETE /rpt_infracciones/{id}',
        models  : function(data){
            return data;
        }
},
/* @Prototype */
{})
});