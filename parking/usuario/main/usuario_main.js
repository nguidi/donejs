/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/options/options.js',
    'parking/usuario/estacionar/estacionar.js',
    'parking/usuario/historial/historial.js',
    'parking/usuario/cuentaCorriente/cuentaCorriente.js',
    'parking/usuario/recargar/recargar.js',
    'parking/usuario/control/control.js',
    'parking/models/noticia.js')
.then(
    function(){
        can.Control("User_main",{
            defaults: {
                user: undefined,
                login: false,
                log_data: new Object()
            }
        },{
            'init': function( element , options ) {
                var self = this
                Cliente.estado({id: options.user.id})
                .then(function(estado){
                    if (estado.length == 0 || options.login == false || estado.tiempo_restante < 0)
                        self.openMainPage(element , options, estado.length)
                    else 
                        self.openControlPage(options, estado)
                })
            },
            
            openControlPage: function(options,control) {
                this.options.login = false
                new User_control( 'body', {
                    user: options.user,
                    control: control
                });
            },
            
            openMainPage: function(element, options, estado) {
                element.append(
                    can.view('//parking/usuario/main/usuario_main_page.ejs',{
                        username: options.user.username
                    })
                )
                if (options.user.saldo <= 0)
                    $('#usuarioMainPage a#estacionar').remove()
                element.find('#usuarioMainPage a#opciones').button();
                new Noticia( 'body' , {})
                $.mobile.changePage($('#usuarioMainPage'))
            },
            
            showMeUserMain: function(options) {
                if (!isUndefined(options))
                    for (var attr in options)
                        this.options[attr] = options[attr]
                Cliente.estado({id: options.user.id})
                .then(function(estado){
                    if (estado.length == 0)
                        $('#usuarioMainPage a#estacionar span.ui-btn-text').html('Estacionar')
                    else 
                        $('#usuarioMainPage a#estacionar span.ui-btn-text').html('Control')
                })
                $.mobile.changePage($('#usuarioMainPage'))
            },
            
            '#usuarioMainPage a#noticias click': function() {
                if ($('div#noticiasPage[data-role="page"]').length != 0)
                    $('div#noticiasPage[data-role="page"]').remove()
                this.element.append(can.view('//parking/usuario/main/noticia_init.ejs'))
                Noticia.findAll().then(function(noticias){
                    $.each(noticias, function() {
                        $('div#noticiasPage[data-role="page"] div#main ul').append(
                            can.view('//parking/usuario/main/new.ejs',this)
                        )     
                    })  
                })
                $.mobile.changePage($('div#noticiasPage'))
            },
            
            '#usuarioMainPage a#opciones click': function() {
                new User_options ( 'body' , {
                    user: this.options.user
                })
            },

            '#usuarioMainPage a#estacionar click': function(elem) {
                var self = this
                if (elem.text() == 'Estacionar')
                    if (isUndefined(this.options.log_data.estacionar)) {
                        this.options.log_data.estacionar = true
                        new User_estacionar( 'body' , {
                            user: this.options.user
                        })
                    } else 
                        $('body').user_estacionar('showMeEstacionar',{user: this.options.user})
                else
                    Cliente.estado({id: this.options.user.id})
                    .then(function(control){
                        if (isUndefined(self.options.log_data.control)) {
                            self.options.log_data.control = true
                            new User_control( 'body', {
                                user: self.options.user,
                                control: control
                            });
                        } else 
                            $('body').user_control('showMeControl',{user: self.options.user, control: control})
                    })
            },
            
            '#usuarioMainPage a#historial click': function() {
                if (isUndefined(this.options.log_data.historial)) {
                    this.options.log_data.historial = true
                    new User_historial( 'body' , {
                        user: this.options.user
                    })
                } else 
                    $('body').user_historial('showMeHistorial',{user: this.options.user})
            },
            
            '#usuarioMainPage a#cuentaCorriente click': function() {
                if (isUndefined(this.options.log_data.ctacte)) {
                    this.options.log_data.ctacte = true
                    new User_cuenta_corriente( 'body' , {
                        user: this.options.user
                    })
                } else 
                    $('body').user_cuenta_corriente('showMeCuentaCorriente',{user: this.options.user})
            },
            
            '#usuarioMainPage a#recargar click': function() {
                if (isUndefined(this.options.log_data.recargar)) {
                    this.options.log_data.recargar = true
                    new User_recargar( 'body' , {
                        user: this.options.user
                    })
                } else 
                    $('body').user_recargar('showMeRecargar',{user: this.options.user})
            },
            
            '#usuarioMainPage a#salir click': function() {
                if (confirm("¿Esta seguro que desa salir?"))
                    new Main('body', {} );
            }
        })
    }
);