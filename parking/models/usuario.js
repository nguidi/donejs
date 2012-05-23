/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal('can/model')
.then(function(){
    

    can.Model("User",{
        findAll : 'GET /users',
        findOne : 'GET /users/{username}',
        create  : 'POST /users',
        update  : 'PUT /users/{id}',
        destroy : 'DELETE /users/{id}',
        models  : function(data){
            return data.items;
        } 
    }, {})

})