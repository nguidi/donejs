/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/config.js',
    'parking/fixtures/usuarios.js',
    'parking/models/usuario.js',
    'parking/usuario/main/usuario_main.js')
.then(
    function(){
        
        can.Control("Login",{
            defaults: {
                
            }
        },{
            'init': function( element , options ) {
                this.element.append(can.view(url+'login/login_page.ejs'))
                $('input#passwordShow').hide()
                $.mobile.changePage($('#loginFormPage'))
            },
            
            'a[data-rel="back"] click': function() {
                $.mobile.changePage($('#mainPage'))
            },
            
            'a#login click': function() {
                User.findAll(
                    // FILTRO DEL FINDALL
                    {
                        username: $('input#usuario').val(),
                        password: $('input[name=password]:visible').val()
                    },
                    // SUCCESS
                    function(user){
                        if (user[0].perfil == 8) {
                            console.log('user')
                            new User_main( 'body', {user: user[0]} )
                        } else {
                            if (user[0].perfil == 4) {
                                console.log('gadget')
                                new Inspector_main( 'body', {user: user[0]} )
                            } else {
                                this.element.append(can.view(url+'login/error_page.ejs'))
                                $.mobile.changePage('#errorLoginDialog') 
                            }
                        }
                    },
                    // FAILURE
                    function() {
                        $.mobile.changePage(url+'login/error.html')
                    }
                )
            },
            
            'input#seePassword change': function(element) {
                if (element.attr('checked') != undefined) {
                    $('input#passwordHide').hide()
                    $('input#passwordShow')
                        .show()
                        .attr('value',$('input#passwordHide').val())
                } else {
                    $('input#passwordShow').hide()
                    $('input#passwordHide')
                        .show()
                        .attr('value',$('input#passwordShow').val())
                }
            }
            
        })
    }
);
