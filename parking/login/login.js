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
    'parking/models/usuario.js'
    ,'parking/gadget/menu/menuGadget.js'
    )
.then(
    function(){
        
        can.Control("Login",{
            defaults: {
                
            }
        },{
            
            'init': function( element , options ) {
                this.element.html(can.view(url+'login/init.ejs'))
                this.element.find('input#passwordShow').hide()
            },
            
            '#login click': function() {
                var user = this.element.find('input#usuario').val()
                var pass = this.element.find('input[name=password]:visible').val()
                User.findAll(
                    // FILTRO DEL FINDALL
                    {username: user, password:pass},
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
                                    new Inspector_menu('div#mainInspector',{})
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
            
            '#ingresar click': function () {
            },
            
            'input#seePassword change': function(es) {
                var val
                if (es.attr('checked') != undefined) {
                    this.element.find('input#passwordHide').hide()
                    this.element.find('input#passwordShow')
                        .show()
                        .attr('value',this.element.find('input#passwordHide').val())
                } else {
                    this.element.find('input#passwordShow').hide()
                    this.element.find('input#passwordHide')
                        .show()
                        .attr('value',this.element.find('input#passwordShow').val())
                }
            }
            
        })
    }
);
