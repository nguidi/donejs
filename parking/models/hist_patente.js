/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal('can/model')
.then(function(){


    can.Model("Hist_patente",{
        findAll : 'GET /hist_patentes',
        findOne : 'GET /hist_patentes/{id}',
        create  : 'POST /hist_patentes',
        update  : 'PUT /hist_patentes/{id}',
        destroy : 'DELETE /hist_patentes/{id}',
        models  : function(data){
            return can.Model.models.call(this,data.items);
        }
    }, {})

})