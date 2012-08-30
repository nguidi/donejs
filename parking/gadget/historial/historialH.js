/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/models/municipio.js',
    'parking/models/historial_inspector.js',
    './historial.css'
    )
.then(
    function(){

        can.Control("Historial",{
        
            defaults: {
                user: undefined
            }
        
        },{

            'init': function( element , options ) {
                if ($('div#histPage[data-role="page"]').length != 0) 
                    $('div#histPage[data-role="page"]').remove()
                
                element.append(can.view('//parking/gadget/historial/views/init.ejs',{
                            apellido: options.user.inspector.apellido,
                            nombre: options.user.inspector.nombre
                        }))
                
                element.find('#histPage #opciones').button()
                
                for (var i = new Date().getFullYear(); i > (new Date().getFullYear()-60); i--) {
                    $('#histPage select#select-choice-year').append('<option value="'+i+'">'+i+'</option>')    
                }
                
                $.mobile.changePage($('#histPage'))
            },
            
             showMeHistorial: function(options) {
                if (!isUndefined(options))
                    for (var attr in options)
                        this.options[attr] = options[attr]
                this.init(this.element,this.options)
            },            
            
            '#histPage select#select-choice-year change': function(element) {
                $('#histPage select#select-choice-month').empty()
                $('#histPage select#select-choice-day').empty()
                var max = (new Date().getFullYear() ==  $('#histPage select#select-choice-year').val()) ? new Date().getMonth() : 12
                    for (var i = max; i > 0; i--) {
                        $('#histPage select#select-choice-month').append('<option value="'+i+'">'+i+'</option>')    
                    }
            },
            
            '#histPage select#select-choice-month change':function(element){
                $('#histPage select#select-choice-day').empty()
                var i = 31
                var mes = $('#histPage select#select-choice-month').val()
                if (mes == 2) i = 28
                if (mes == 4 || mes == 6 || mes == 9 || mes == 11) i = 30
                if (($('#histPage select#select-choice-year').val() % 4) == 0 && $('#histPage select#select-choice-month').val() == 2) i = 29
                while (i > 0) {
                    $('#histPage select#select-choice-day').append('<option value="'+i+'">'+i+'</option>')
                    i--
                }
            },
            
            '#histPage a#aceptar click':function(){
                var patente = this.element.find('input#patente').val()
                var fecha = this.element.find('input#fecha').val()
                var self = this
                Historial_Inspector.registros(
                    {
                        id_usuario: this.options.user,
                        patente: patente,
                        fecha: fecha
                    }
                ).then(
                    function(registros){
                        $('#histPageConfirmar').remove()
                        this.element.append(can.view('//parking/gadget/historial/views/historial.ejs',{
                            apellido: self.options.user.inspector.apellido,
                            nombre: self.options.user.inspector.nombre
                        }))
                        self.element.find('#histPageConfirmar #opciones').button()
                        self.insertHistorial(registros)
                        $.mobile.changePage($('#histPageConfirmar'))
                    }
                )
            },
            
            insertHistorial: function(registros){
                var ul_element = this.element.find('#histPageConfirmado ul')
                var self = this
                $.each(registros,
                    function(i){
                        ul_element.append(
                            can.view(
                                '//parking/usuario/historial/views/li.ejs',
                                {
                                    detalle: self.parseHistorial(this),
                                    time: new Date(this.fecha).getHours()+':'+new Date(this.fecha).getMinutes()
                                }
                            )
                        )
                    }
                )
                $('#histPageConfirmado ul').listview()
            },
            
            parseHistorial: function(registro) {
                var detalle = 'Se realizo un chequeo del automovil patente '+registro.patente+' y marca '+registro.marca
                return detalle+' el cual estaba '+((registro.estado) ? 'correctamente' : 'incorrectamente')+' estacionado.'
            },
            
            '#histPage a[rel="back"] click': function() {
                $('body').gadget_main('showMeGadget',{user: this.options.user})
            }
       })
   }
)
