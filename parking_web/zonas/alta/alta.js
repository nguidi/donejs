steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/fixtures/fixtures.js',
    'parking/models/inspector.js',
    'parking_web/inspectores/handler/zonas.css',
    'parking_web/config.js',
    'jquery/dom/form_params',
    'sigma/avisos-bootstrap')
.then(
    function(){
        
        can.Control("AltaZona",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'zonas/alta/alta.ejs'));
            },
            "div.guardar click": function(element){
                var self = this;
                // Como el framework hay que actualizarlo, dejo comentado esto... 
                // tira error con el archivo attributes.js al invocar save()
                //var z = new Zona($.extend($(element).parents('form').formParams(),{id_municipio: this.options.user.id_municipio}));
                //z.save(function(obj){
                this.cartel = new Cartel('#alertas_alta_zonas');
                Zona.create($.extend($(element).parents('form').formParams(),{id_municipio: this.options.user.id_municipio}),function(obj){
                    $('table.zonas').append(can.view(url+'zonas/tabla/recipe.ejs',obj));
                    this.cartel.aviso(
                        {
                            tipo_alerta:'exito', 
                            mensaje_primario: 'Éxito!', 
                            mensaje_secundario: 'La zona se dió de alta correctamente.'
                        });
                },function(obj){
                    self.cartel(
                    {
                        tiempo_alerta:'error', 
                        mensaje_primario: 'Error!', 
                        mensaje_secundario: 'No se pudo crear la zona correspondiente: error interno de la aplicación.'
                    });
                });
            },
            cartel: function(vars){
                console.log("asdfsa");
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

