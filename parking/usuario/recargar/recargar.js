/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/usuario/options/options.js',
    'parking/fixtures/fixtures.js',
    'parking/models/cuenta_corriente.js')
.then(
    function(){
        
        can.Control("User_recargar",{
            defaults: {}
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'usuario/recargar/recargar.ejs'))
                Cuenta_corriente.findAll({usuario_id: options.user.id},
                    // successs
                    function(resumen_cuenta) {
                        var importeTotal = 0
                        $.each(resumen_cuenta,function(index,resumen) {
                            importeTotal+= parseInt((resumen.debcred != 1) ? resumen.importe : -1*resumen.importe)
                        })
                        $('h4#userSaldo').append(' '+importeTotal)
                    }
                )
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
