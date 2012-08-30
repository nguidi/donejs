steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/models/zona.js',
    'parking/models/tarifa.js',
    'parking/models/municipio.js',
    'parking/models/cliente.js',
    'parking/models/marca.js',
    './estacionar.css',
    'sigma/common.js',
    'parking/usuario/control')
.then(
    function(){
        
        can.Control("User_estacionar",{
            defaults: {
                user: new Object(),
                extender: undefined,
                log_data: new Object()
            }
        },{
            'init': function( element , options ) {
                var self = this
                element.append(
                    can.view('//parking/usuario/estacionar/views/init.ejs',{
                        username: options.user.username,
                        saldo: options.user.saldo
                    })
                )
                if (options.extender) 
                    $('#userEstacionarPage a#estacionar').html('Extender')
                Municipio.findOne({id: options.user.municipio}).then(function(municipio){
                    $('#userEstacionarPage dl dd.municipio').html(municipio.descripcion)    
                })
                Marca_select.findAll({},
                    function(marca){
                        self.initSelect('div#marcaSelect','Marca','Seleccione una Marca',marca)
                    }
                )
                Tarifa_select.findAll({},
                    function(tarifas){
                        self.initSelect('div#tarifaSelect','Tiempo','Seleccione un Tiempo',tarifas)
                    }
                )
                element.find('#userEstacionarPage #opciones').button()
                $.mobile.changePage($('#userEstacionarPage'))  
            },
            
            showMeEstacionar: function(options) {
                if (!isUndefined(options))
                    for (var attr in options)
                        this.options[attr] = options[attr]
                this.init(this.element,this.options)
            },
            
            '#userEstacionarPage a#opciones click': function() {
                new User_options ( 'body' , {
                    user: this.options.user
                })
            },

            initSelect: function(select,label,title,options) {
                $('#userEstacionarPage '+select).html(
                    can.view('//parking/usuario/estacionar/views/select.ejs',
                    {
                        name: stringToRE(label),
                        label: label,
                        title: title,
                        options: options
                    }
                )).find('select').selectmenu();
            },
            
            '#userEstacionarPage a[rel="back"] click': function() {
                $('body').user_main('showMeUserMain',{user: this.options.user})
            },
           
            '#userEstacionarConfirmPage #confirmar click': function() {
                var self = this, bool = new Array(), data = {
                    id_usuario: this.options.user.id,
                    id_municipio: this.options.user.municipio,
                    id_tarifa: parseInt($('#userEstacionarPage #tarifaSelect select').val()),
                    id_marca: parseInt($('#userEstacionarPage #marcaSelect select').val()),
                    patente: $('#userEstacionarPage input#patente').val()
                }
                for (var attr in data)
                    bool.push((data[attr] != '' && !isUndefined(data[attr])) ? true : false)
                if ($.unique(bool).length == 1 && $.unique(bool)[0] == true) {
                    if (!isUndefined(self.options.extender)) {
                        data['id_control'] = this.options.extender
                        Cliente.extender(data)
                            .then(
                                function(result) {
                                    self.callControl(result)
                                } 
                            )
                    } else
                        Cliente.estacionar(data)
                            .then(
                                function(result) {
                                    self.callControl(result)
                                } 
                            )
                } else
                    $('#userEstacionarPage #alert').html('Error: es necesario que todos los campos sean completados.')
            },
            
            '#userEstacionarPage #estacionar click': function() {
                $('#userEstacionarConfirmPage').remove()
                this.element.append(can.view('//parking/usuario/estacionar/views/confirmar.ejs',{
                    patente: $('#userEstacionarPage input#patente').val()
                }))
                Tarifa.findOne({id: $('#userEstacionarPage #tarifaSelect select').find('option:selected').val()}).then(function(data){
                        $('#userEstacionarConfirmPage dl dd#tiempo').html(data.tiempo+' Minutos')
                        $('#userEstacionarConfirmPage dl dd#debitar').html('$ '+data.precio)
                })
                $.mobile.changePage($('#userEstacionarConfirmPage'))
            },
            
            callControl: function(result){
                if (result.length > 0) {
                    this.options.user.saldo = this.options.user.saldo - result.precio
                    if ($('div#userControlPage[data-role="page"]').length == 0) {
                        new User_control( 'body', {
                            user: this.options.user,
                            control: result[0]
                        });
                    } else 
                        $('body').user_control('showMeControl',{user: this.options.user, control: result})    
                } else
                    console.log('ERROR')
            }
        })
    }
);