/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal('can/model')
.then(function(){
    

    can.Model("Provincia",{
        findAll : 'GET /provincias',
        findOne : 'GET /provincias/{id}',
        create  : 'POST /provincias',
        update  : 'PUT /provincias/{id}',
        destroy : 'DELETE /provincias/{id}',
        models  : function(data){
            return can.Model.models.call(this,data.items);
        }
    }, {})

})