/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/usuario/options/options.js',
    'parking/fixtures/fixtures.js',
    'parking/models/cuenta_corriente.js',
    'parking/models/control.js')
.then(
    function(){
        
        can.Control("User_cuenta_corriente",{
            defaults: {
                user: new Object()
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'usuario/cuentaCorriente/cuentaCorriente.ejs'))
                Cuenta_corriente_deb.findAll({usuario_id: options.user.id},
                    // successs
                    function(resumen_cuenta) {
                        
                        $('table.cc tbody').html(can.view(url+'usuario/cuentaCorriente/tds.ejs',resumen_cuenta))
                    
                        Cuenta_corriente.findAll({usuario_id: options.user.id},
                            // successs
                            function(resumen_cuenta) {
                                var importeTotal = 0
                                $.each(resumen_cuenta,function(index,resumen) {
                                    importeTotal+= parseInt((resumen.debcred != 1) ? resumen.importe : -1*resumen.importe)
                                })
                                $('table.cc tbody tr:last td b').html('TOTAL DEBITADO : '+importeTotal)
                            }
                        )
                    }
                )
            }
        })
    }
);