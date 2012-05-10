/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/usuario/options/options.js',
    'parking/usuario/estacionar/estacionar.js',
    'parking/usuario/recargar/recargar.js')
.then(
    function(){
        
        can.Control("User_menu",{
            'init': function( element , options ) {
                this.element.html(can.view(url+'usuario/menu/menu.ejs'))
            },
            
            'a#estacionar click': function() {
                $.mobile.changePage(url+'usuario/estacionar/estacionar.html')
                $('#userEstacionarPage').live( 'pagecreate',function(event){
                    new User_options( '#userEstacionarOptionsMenu', {} )
                    new User_estacionar( '#mainEstacionar', {} );
                });
            },
            
            'a#historial click': function() {
                $.mobile.changePage(url+'usuario/historial/historial.html')
            },
            
            'a#cuentaCorriente click': function() {
                $.mobile.changePage(url+'usuario/cuentaCorriente/cuentaCorriente.html')
            },
            
            'a#recargar click': function() {
                $.mobile.changePage(url+'usuario/recargar/recargar.html')
                $('#userRecargarPage').live( 'pagecreate',function(event){
                    new User_options( '#userRecargarOptionsMenu', {} )
                    new User_recargar( '#mainRecargar', {} );
                });
            },
            
            'a#salir click': function() {
                $.mobile.changePage(url+'usuario/menu/salir.html')
                $('#salirDialog').live( 'pagecreate',function(event){
                    $('#salirDialog a#salir').bind('click',function() {
                        $.mobile.changePage(url+'index.html')
                    })
                });
            }
        })
    }
);
