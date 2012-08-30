/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/options/options.js',
    'parking/models/cuenta_corriente.js',
    'sigma/common.js',
    './cuentaCorriente.css')
.then(
    function(){
        
        can.Control("User_cuenta_corriente",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                if ($('div#userCuentaCorrientePage[data-role="page"]').length != 0) 
                    $('div#userCuentaCorrientePage[data-role="page"]').remove()
                var self = this, fecha
                element.append(can.view('//parking/usuario/cuentaCorriente/views/init.ejs',{
                        username: options.user.username,
                        saldo: options.user.saldo
                    }))
                var ul_element = element.find('#userCuentaCorrientePage #cuentaCorrienteList ul')
                Cuenta_corriente
                    .findByUsuario({id: options.user.id})
                    .then(function(transaccion) {
                        $.each(transaccion,function(i){
                            fecha = createDate(this.fecha)
                            if (ul_element.find('div.'+self.getTime(fecha)).length == 0)
                            ul_element.append(
                                can.view(
                                    '//parking/usuario/cuentaCorriente/views/list_head.ejs',
                                    {
                                        headClass: self.getTime(fecha),
                                        dia: spanishDate(fecha)
                                    }
                                )
                            )
                            ul_element.find('div.'+self.getTime(fecha)).append(
                                can.view(
                                    '//parking/usuario/cuentaCorriente/views/list_body.ejs',
                                    {
                                        hora: self.getTimeInHsAndMin(fecha),
                                        detalle: self.parseDetalle(this)
                                    }
                                )
                            )
                        })
                        $('#userCuentaCorrientePage #cuentaCorrienteList ul').listview()

                    })
                element.find('#userCuentaCorrientePage a#opciones').button();
                $.mobile.changePage($('#userCuentaCorrientePage')) 
            },

            showMeCuentaCorriente: function(options) {
                if (!isUndefined(options))
                    for (var attr in options)
                        this.options[attr] = options[attr]
                $.mobile.changePage($('#userCuentaCorrientePage'))
            },
            
            '#userCuentaCorrientePage a#opciones click': function() {
                new User_options ( 'body' , {
                    user: this.options.user
                })
            },
            
            getTimeInHsAndMin: function(fecha) {
                return fecha.getHours()+':'+((fecha.getMinutes().toString().length == 2) ? fecha.getMinutes() : '0'+fecha.getMinutes())
            },
            
            getTime: function(fecha){
                return fecha.getFullYear()+''+fecha.getMonth()+''+fecha.getDate()
            },
            
            parseDetalle: function(transaccion) {
                var detalle
                if (transaccion.tipo == 1)
                    detalle = 'Se realizo una Recarga'
                else
                    detalle = 'Estaciono el vehiculo con patente '+transaccion.detalle
                return detalle+' en el municipio '+transaccion.municipio+' por un importe igual a $'+transaccion.importe
            },
            
            '#userCuentaCorrientePage a[rel="back"] click': function() {
                $('body').user_main('showMeUserMain',{user: this.options.user})
            }
        })
    }
);