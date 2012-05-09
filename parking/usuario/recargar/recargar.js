/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/usuario/options/options.js')
.then(
    function(){
        
        can.Control("User_recargar",{
            defaults: {}
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'usuario/recargar/recargar.ejs'))
            },
            
            '#aceptar click': function() {
                $.mobile.changePage(url+'usuario/usuario.html')
                $('#usuarioPage').live( 'pagecreate',function(event){
                    new User_options( '#optionsMenu', {} )
                    new User_menu( '#mainMenu', {} )
                });    
            }           
        })
    }
);
