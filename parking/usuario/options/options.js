/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/config.js')
.then(
    function(){
        
        can.Control("User_options",{
            defaults: {}
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'usuario/options/init.ejs'))
            },
            
            'a#options click': function() {
                $.mobile.changePage(url+'usuario/options/menu/menu.html')
                $(document).bind('pagechange',function() {
                    $('#edit').bind('click',function(){
                        alert('editar')
                    })
                    $('#details').bind('click',function(){
                        alert('detalles')
                    })
                    $('#salir').bind('click',function(){
                        alert('salir')
                    })
                })
            }
        })
    }
);