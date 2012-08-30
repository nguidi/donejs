/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal(
    'can/control/control.js',
    'can/view/ejs',
    './estado.css'
    )
.then(
  function(){

        can.Control("Estado_usuario",{
            defaults: {
                user: undefined,
                control: undefined,
                marca: undefined,
                patente: undefined
            }
        },{
           'init':function(element ,options ){
                    if ($('div#estadoPage[data-role="page"]').length != 0)
                        $('div#estadoPage[data-role="page"]').remove()
                    var buttonClass, buttonIcon, buttonLabel, estado, marca
                    if (isEmptyArray(options.control)) {
                        buttonClass = 'infraccion'
                        buttonIcon = 'alert'
                        buttonLabel = 'Infraccion'
                        estado = false
                    } else {
                        buttonClass = 'ok'
                        buttonIcon = 'check'
                        buttonLabel = 'OK!'
                        estado = {
                            ingreso: this.getTime(options.control[0].ingreso),
                            egreso: this.getTime(options.control[0].egreso),
                            restante: options.control[0].restante+' Minutos'
                        }
                        marca = options.control.marca
                    }
                    element.append(
                        can.view('//parking/gadget/estadoUsuario/estadoUsuario.ejs',{
                            apellido: options.user.inspector.apellido,
                            nombre: options.user.inspector.nombre,
                            buttonClass: buttonClass,
                            icon: buttonIcon,
                            label: buttonLabel,
                            estado: estado,
                            marca: marca,
                            patente: options.patente.toUpperCase()
                        })
                    )
                    if (marca == undefined)
                        Marca.findOne({id: options.marca}).then(function(obj_marca){
                            element.find('#estadoPage dd.marca').html(obj_marca[0].descripcion)
                        })

                    element.find('#estadoPage a#opciones').button();

                    $.mobile.changePage($('#estadoPage'))

                },

                showMeEstado: function(options) {
                    if (!isUndefined(options))
                        for (var attr in options)
                            this.options[attr] = options[attr]
                    this.init(this.element,this.options)
                },
                
                getTime: function(date) {
                    return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
                },
                
                '#estadoPage a#reintentar click': function() {
                    if ($('div#patentePage[data-role="page"]').length == 0)  {
                        new Patente_pantalla( 'body',{
                            user: this.options.user 
                        })
                    } else 
                        $('body').patente_pantalla('showMePatente',{user: this.options.user})
                },
                
                '#estadoPage a#confirmar click': function() {
                    Historial_Inspector.create({
                        id_usuario: this.options.user.id,
                        id_municipio: this.options.user.municipio,
                        id_marca: this.options.marca,
                        patente: this.options.patente,
                        estado: (isEmptyArray(this.options.control)) ? 'Infraccion' : 'OK'
                    }).then(function(){
                        if ($('div#patentePage[data-role="page"]').length == 0)  {
                            new Patente_pantalla( 'body',{
                                user: this.options.user 
                            })
                        } else 
                            $('body').patente_pantalla('showMePatente',{user: this.options.user})    
                    })
                },
                
                '#estadoPage a[rel="back"] click': function() {
                    $('body').gadget_main('showMeGadget',{user: this.options.user})
                }
            })
})
