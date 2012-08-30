/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/gadget/estadoUsuario/estadoUsuario.js',
    'parking/options/options.js',
    'parking/models/control.js',
    'parking/models/marca.js'
     ).
then(
    function(){
        can.Control( "Patente_pantalla",
            {
                defaults: {
                    user: undefined
                }
            },{
                'init':function(element ,options ){
                    if ($('div#patentePage[data-role="page"]').length != 0) 
                        $('div#patentePage[data-role="page"]').remove()
                    var self = this

                    element.append(
                        can.view('//parking/gadget/patente/patente.ejs',options.user.inspector)
                    )

                    Marca_select.findAll({},function(marcas) {
                        self.initSelect('div#marcasSelect','Marcas','Seleccione una Marca',marcas)
                    })

                    element.find('#patentePage a#opciones').button();

                    $.mobile.changePage($('#patentePage'))

                },

                showMePatente: function(options) {
                    if (!isUndefined(options))
                        for (var attr in options)
                            this.options[attr] = options[attr]
                    this.init(this.element,this.options)
                },

                initSelect: function(select,label,title,options) {
                    $('#patentePage '+select).html(
                        can.view('//parking/gadget/patente/selectP.ejs',
                        {
                            name: stringToRE(label),
                            label: label,
                            title: title,
                            options: options
                        }
                    )).find('select').selectmenu();
                },
                
                '#patentePage a[rel="back"] click': function() {
                    $('body').gadget_main('showMeGadget',{user: this.options.user})
                },

                '#patentePage a#opciones click': function() {
                    new User_options ( 'body' , {
                        user: this.options.user
                    })
                },

                '#patentePage a#aceptar click':function(){
                    var nroPatente = this.element.find('input#patente').val()

                    var marcaId = this.element.find('select#marcas').val()

                    var self = this
                    
                    if ((nroPatente.length>0)&&(marcaId>0)){
                        Control.estadoPatente(
                            {
                                id_marca: marcaId,
                                patente: nroPatente
                            }
                        ).then(
                            function(automovil) {
                                if ($('div#estadoPage[data-role="page"]').length == 0)  {
                                    new Estado_usuario( 'body',{
                                        user: self.options.user, 
                                        control: automovil,
                                        patente: nroPatente,
                                        marca: marcaId
                                    })
                                } else 
                                    $('body').estado_usuario('showMeEstado',{user: self.options.user, control: automovil, patente: nroPatente, marca: marcaId})
                            }
                        )
                    } else {
                        alert("Debe ingresar patente y elegir una marca")
                    }
                }
            }
        )
    }
)
