/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal('can/model')
.then(function(){
    

    can.Model("Control",{
        findAll : 'GET /controls',
        findOne : 'GET /controls/{id}',
        create  : 'POST /controls',
        update  : 'PUT /controls/{id}',
        destroy : 'DELETE /controls/{id}',
        models  : function(data){
            return data.items;
        } 
    }, {})
    

})