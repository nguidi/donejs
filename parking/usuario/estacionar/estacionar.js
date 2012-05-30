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
    'parking/models/tarifa.js',
    'parking/models/municipio.js')
.then(
    function(){
        
        can.Control("User_estacionar",{
            defaults: {
                user: new Object()
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'usuario/estacionar/estacionar.ejs'))
                Cuenta_corriente.findAll({usuario_id: options.user.id},
                    // successs
                    function(resumen_cuenta) {
                        var importeTotal = 0
                        $.each(resumen_cuenta,function(index,resumen) {
                            importeTotal+= parseInt((resumen.debcred != 1) ? resumen.importe : -1*resumen.importe)
                        })
                        $('h4#userSaldo').html('Su saldo es: $ '+importeTotal)
                    }
                )
                Tarifa_select.findAll({},function(tarifas){
                    $('div#tarifasSelect').html(
                        can.view(url+'usuario/estacionar/select.ejs',
                        {
                            label: "Tarifas",
                            title: "Seleccione una Tarifa",
                            options: tarifas
                        }
                    )).find('select').selectmenu();
                    
                })
                Municipio_select.findAll({},function(municipios) {
                     $('div#municipiosSelect').html(
                        can.view(url+'usuario/estacionar/select.ejs',
                        {
                            label: "Municipios",
                            title: "Seleccione un Municipio",
                            options: municipios
                        }
                     )).find('select').selectmenu();
                })
            },
            
            '#aceptar click': function() {
                var user = this.options.user
                $.mobile.changePage(url+'usuario/usuario.html')
                $('#usuarioPage').live( 'pagecreate',function(event){
                    new User_options( '#optionsMenu', {user: user} )
                    new User_menu( '#mainMenu', {user: user} )
                });
            }
        })
    }
);