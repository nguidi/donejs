/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/models/control_log.js',
    'sigma/common.js',
    './historial.css')
.then(
    function(){
        
        can.Control("User_historial",{
            defaults: {
                user: new Object()
            }
        },{
            'init': function( element , options ) {
                if ($('div#userHistorialPage[data-role="page"]').length != 0)
                    $('div#userHistorialPage[data-role="page"]').remove()
                element.append(can.view('//parking/usuario/historial/views/init.ejs',{
                        username: options.user.username
                }))
                this.fillControl(element, options)
                element.find('#userHistorialPage a#opciones').button();
                $.mobile.changePage($('#userHistorialPage'))
            },
            
            showMeHistorial: function(options) {
                if (!isUndefined(options))
                    for (var attr in options)
                        this.options[attr] = options[attr]
                this.init(this.element,this.options)
            },
            
            '#userHistorialPage a#opciones click': function() {
                new User_options ( 'body' , {
                    user: this.options.user
                })
            },
            
            fillControl: function(element, options) {
                var fecha, ul_element, self = this
                Control_log
                    .findByUsuario({id: options.user.id})
                    .then(
                        function(controls) {
                            ul_element = element.find('#userHistorialPage .estacionamiento ul')
                            $.each(controls,function(i){
                                fecha = createDate(this.ingreso)
                                if (ul_element.find('div.'+self.getTime(fecha)).length == 0)
                                    ul_element.append(
                                        can.view(
                                            '//parking/usuario/historial/views/list_head.ejs',
                                            {
                                                headClass: self.getTime(fecha),
                                                dia: spanishDate(fecha)
                                            }
                                        )
                                    )
                                ul_element.find('div.'+self.getTime(fecha)).append(
                                    can.view(
                                        '//parking/usuario/historial/views/list_body.ejs',
                                        {
                                            detalle: self.parseControl(this),
                                            importe: this.precio,
                                            egreso: self.getTimeInHsAndMin(createDate(this.egreso)),//createDate(this.egreso).getHours()+':'+createDate(this.egreso).getMinutes(),
                                            ingreso: self.getTimeInHsAndMin(createDate(this.ingreso))//createDate(this.ingreso).getHours()+':'+createDate(this.ingreso).getMinutes()
                                        }
                                    )
                                )
                            })
                            $('#userCuentaCorrientePage #cuentaCorrienteList ul').listview()
                        }
                    )
            },
            
            getTimeInHsAndMin: function(fecha) {
                return fecha.getHours()+':'+((fecha.getMinutes().toString().length == 2) ? fecha.getMinutes() : '0'+fecha.getMinutes())
            },
            
            getTime: function(fecha){
                return fecha.getFullYear()+''+fecha.getMonth()+''+fecha.getDate()
            },
            
            parseControl: function(control) {
                var detalle = ''
                if (control.id_marca == null) 
                    detalle += 'Se estaciono el auto con patente '+control.patente
                else 
                    detalle += 'Se estaciono un '+control.marca+' cuya patente termina en '+control.patente
                detalle += ' del municipio de '+control.municipio+'.'
                return detalle
            },
            
            '#userHistorialPage a[rel="back"] click': function() {
                $('body').user_main('showMeUserMain',{user: this.options.user})
            }
        })
    }
);