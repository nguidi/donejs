/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/usuario/menu/menu.js',
    'parking/usuario/options/options.js',
    'parking/config.js',
    'parking/fixtures/usuarios.js',
    'parking/models/usuario.js',
    'parking/gadget/menu/menuGadget.js')
.then(
    function(){
        
        can.Control("Login",{
            defaults: {
                
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'login/button.ejs'))
            },
            
            'span.login click': function() {
                $.mobile.changePage(url+'login/form.html')
                var self = this
                $('#formPage').live( 'pagecreate',function(event){
                      $('input#passwordShow').hide()
                      $('a#login').bind('click',function(ev,el){
                          self.checkLogin({
                              username: $('input#usuario').val(),
                              password: $('input[name=password]:visible').val()
                          })
                      })
                      $('input#seePassword').bind('change',function(ev,el){
                          self.hideOrShowPassword($(ev.target))
                      })
                });
            },
            
            checkLogin: function(userInfo) {
                User.findAll(
                    // FILTRO DEL FINDALL
                    userInfo,
                    // SUCCESS
                    function(user){
                        if (user[0].perfil == 8) {
                            $.mobile.changePage(url+'usuario/usuario.html')
                            $('#usuarioPage').live( 'pagecreate',function(event){
                                new User_options( '#userOptionsMenu', {user: user[0]} )
                                new User_menu( '#mainMenu', {user: user[0]} )
                            });
                        } else {
                            if (user[0].perfil == 4) {
                                $.mobile.changePage(url+'gadget/menu/menuGadget.html')
                                $('#userInspectorGadgetPage').live( 'pagecreate',function(event){
                                    new Inspector_menu('div#mainInspector', {user: user[0]})
                                })
                            } else {
                                $.mobile.changePage(url+'login/error.html') 
                            }
                        }
                    },
                    // FAILURE
                    function() {
                        $.mobile.changePage(url+'login/error.html') 
                    }
                )               
            },
            
            hideOrShowPassword: function(es) {
                var val
                if (es.attr('checked') != undefined) {
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
