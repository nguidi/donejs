/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal('can/model')
.then(function(){
    

    can.Model("User",{
        findAll : 'GET /users',
        findOne : 'GET /users/{id}',
        create  : 'POST /users',
        update  : 'PUT /users/{id}',
        destroy : 'DELETE /users/{id}',
        findUser: function (params, success, error) {
                        return $.ajax({
                            url: '/users/findUser',
                            type: 'POST',   
                            dataType: 'json',
                            data: params
                            //data: JSON.stringify(params)
                        });
        },
        models  : function(data){
            return data
        } 
    }, {})
    

})
