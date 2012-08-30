steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/fixtures/fixtures.js',
    'parking/models/inspector.js',
    'parking_web/inspectores/handler/inspectores.css',
    'parking_web/config.js',
    'jquery/dom/form_params',
    'bootstrap/js/bootstrap-alert.js')
.then(
    function(){
        
        can.Control("AltaInspectores",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'inspectores/alta/alta.ejs'));
            },
            "div.guardar click": function(element){
                var self = this;
                var z = new Inspector($.extend($(element).parents('form').formParams(),{id_municipio: this.options.user.id_municipio}));
                z.save(function(obj){
                    self.cartel({ta:'alert-success', msg_p: 'Éxito!', msg_s: 'El inspector se dió de alta correctamente.'});
                },function(obj){
                    self.cartel({ta:'alert-error', msg_p: 'Error!', msg_s: 'No se pudo crear el inspector correspondiente: error interno de la aplicación.'});
                });
            },
            cartel: function(vars){
                $("#alertas_alta_zonas").append(can.view(url+'zonas/alta/alert.ejs',
                    {tipo_alerta:vars.ta, mensaje_primario: vars.msg_p, mensaje_secundario: vars.msg_s}));
                $("."+vars.ta).alert();
                setTimeout(function(){
                    $("."+vars.ta).alert('close');
                },3000);
            }
        })
    }
);

