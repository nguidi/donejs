/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/config.js',
    'parking/usuario/menu/menu.js',
    'parking/usuario/options/options.js')
.then(
    function(){
        can.Control("User_main",{
            defaults: {
                user: {}
            }
        },{
            'init': function( element , options ) {
                this.element.append(can.view(url+'usuario/main/usuario_main_page.ejs'))
                new User_options( '#userOptionsMenu', options.user )
                new User_menu( '#userMenu', options.user )
                $.mobile.changePage($('#usuarioMainPage'))
            },
            
            'a[data-rel="back"] click': function() {
                $.mobile.changePage($('#mainPage'))
            }
            
        })
    }
);