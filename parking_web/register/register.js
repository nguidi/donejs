/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking_web/config.js',
    './style.css',
    'jquery/dom/form_params',
    'parking/fixtures/usuarios.js',
    'parking/models/usuario.js',
    'bootstrap/js/bootstrap-alert.js')
.then(
    function(){
        
        can.Control("Register",{
            defaults: {
                error: ''
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'register/register_page.ejs',{message: options.error}));
            },
            /*'a[data-rel="back"] click': function() {
                $.mobile.changePage($('#mainPage'))
            },*/
            'div.btn click': function(element) {
                var self = this;
                switch(element.attr('id')){
                    case "guardar": 
                        console.log(element.parents().formParams());
                        var data = element.parents().formParams();
                        console.log(data.password == data.repPassword)
                        if(data.password == data.repPassword){
                            var u = new User(data);
                            u.save(function() {
                                $(".alert-error").alert('close');
                                $(".alert").removeClass('invisible');
                            });
                        }
                        else{
                            $(".alert-error").find('span#error_msg').text('Las claves ingresadas no coinciden entre sí');
                            $(".alert-error").removeClass('invisible');
                        }
                        break;
                }
            },
            "div#volver click": function(element){
                new LoginWeb( '#mainPage', {view: 'login/views/init_user.ejs'});
            },
            "div#cancelar click": function(element){
                new LoginWeb( '#mainPage', {view: 'login/views/init_user.ejs'});
            }
        })
    }
);