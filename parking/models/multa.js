/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal('can/model')
.then(function(){
    

    can.Model("Multa",{
        findAll : 'GET /multas',
        findOne : 'GET /multas/{id}',
        create  : 'POST /multas',
        update  : 'PUT /multas/{id}',
        destroy : 'DELETE /multas/{id}',
        models  : function(data){
            return data.items;
        } 
    }, {})
    

})