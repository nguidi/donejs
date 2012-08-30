/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal(
    'can/control/control.js',
    'can/view/ejs',
    'sigma/mobile_alert',
    'parking/models/credito_habilitado.js',
    'parking/models/cliente.js',
    'sigma/common.js',
    './recargar.css')
.then(
    function(){
        
        can.Control("User_recargar",{
            defaults: {
                user: undefined,
                carga: undefined
            }
        },{
            'init': function( element , options ) {
                if ($('div#userSaldoPage[data-role="page"]').length != 0) 
                    $('div#userSaldoPage[data-role="page"]').remove()
                element.append(can.view('//parking/usuario/recargar/views/init.ejs',{
                    username: options.user.username
                }))
                element.find('#userSaldoPage #opciones').button()
                $.mobile.changePage($('#userSaldoPage'))
            },
            
            showMeRecargar: function(options) {
                if (!isUndefined(options))
                    for (var attr in options)
                        this.options[attr] = options[attr]
                this.init(this.element,this.options)
                self.options.carga = undefined
            },
            
            '#userSaldoPage a#opciones click': function() {
                new User_options ( 'body' , {
                    user: this.options.user
                })
            },
            
            '#userSaldoPage #checkRecargar click': function() {
                $('#confirmarRecargaPage').remove()
                this.element.append(can.view('//parking/usuario/recargar/views/confirmar.ejs',{
                    username: this.options.user.username
                }))
                var self = this
                var cod_carga = this.element.find('input#cod_carga').val()
                Credito_habilitado.findbyCodigo({codigo_carga: cod_carga})
                .then(function(credito){
                    self.options.carga = credito
                    if (credito != false) {
                        $('#confirmarRecargaPage div#mainConfirmarRecarga').html(can.view('//parking/usuario/recargar/views/success.ejs'))
                        $('#confirmarRecargaPage dl dd#cod_carga').html(credito.cod_carga)
                        $('#confirmarRecargaPage dl dd#credito').html('$ '+credito.importe)
                        $('#confirmarRecargaPage dl dd#fecha').html(spanishDate(credito.fecha))    
                    } else
                        $('#confirmarRecargaPage div#mainConfirmarRecarga').html(can.view('//parking/usuario/recargar/views/error.ejs',{cod_carga: cod_carga}))              
                    $('#confirmarRecargaPage a').button()
                })
                $.mobile.changePage($('#confirmarRecargaPage'))
            },
            
            '#confirmarRecargaPage #confirmar click': function() {
                var self = this
                var cod_carga = this.element.find('input#cod_carga')
                Cliente
                    .recargar(
                        {
                            codigo_carga: cod_carga.val(), 
                            id_usuario: this.options.user.id, 
                            id_municipio: this.options.user.municipio, 
                            importe: this.options.carga.importe
                        }
                    )
                    .then(function(obj){
                        $('body').user_main('showMeUserMain',{user: self.options.user})
                        if (obj.success) {
                            can.trigger(self.element,'alert_success',{
                                mensaje: 'La recarga fue satisfactoria, su nuevo saldo es de: $'+obj.recarga.saldo+'.'
                            })
                            cod_carga.attr('value','')  
                        }
                        else {
                            can.trigger(self.element,'alert_error',{
                                mensaje: 'Ocurrio un error en la recarga.'
                            })
                        }
                        self.options.carga = undefined
                    })
            },
            
            '#userSaldoPage a[rel="back"], #confirmarRecargaPage a[rel="back"] click': function() {
                $('body').user_main('showMeUserMain',{user: this.options.user})
            },
            
            '#confirmarRecargaPage a#intentar click': function() {
                $.mobile.changePage($('#userSaldoPage'))
            }
        })
    }
);
