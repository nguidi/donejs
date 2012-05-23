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
    'parking/models/usuario.js')
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
                User.findAll().then(function(){})
                if (user== 'gadget' && pass == 'password') {
                    alert('gadget')
                } else {
                    if (user== 'usuario' && pass == 'usuario') {
                        $.mobile.changePage(url+'usuario/usuario.html')
                        $('#usuarioPage').live( 'pagecreate',function(event){
                            new User_options( '#userOptionsMenu', {username: "Gise Martinez"} )
                            new User_menu( '#mainMenu', {} )
                        });
                    } else 
                        $.mobile.changePage(url+'login/error.html')    
                }                
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
