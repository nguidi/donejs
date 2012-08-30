steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/models/perfil.js',
    'parking/fixtures/fixtures.js',
    'parking/fixtures/usuarios.js',
    'parking/models/usuario.js',
    'jquery/dom/form_params',
    'parking_web/config.js',
    'bootstrap/js/bootstrap-alert.js')
.then(
    function(){
        
        can.Control("AltaUsuarios",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'usuarios/alta/alta.ejs'));
                //{perfil: this.options.user.perfil}
                Perfil.findAll().then(function(obj){
                    $.each(obj,function(i,item){
                        $("select[name=perfil_alta]").append("<option value="+item.id+">"+item.descripcion+"</option>")
                    })
                })
                
            },
            "div.guardar click": function(element){
                var self = this;
                //Zona.create($.extend($(element).parents('form').formParams(),{id_municipio: this.options.user.id_municipio}),function(obj){
                var z = new User($.extend($(element).parents('form').formParams(),{id_municipio: this.options.user.id_municipio}));
                z.save(function(obj){
                    //can.trigger(element, 'created', obj);
                    self.cartel({ta:'alert-success', msg_p: 'Éxito!', msg_s: 'El usuario se dió de alta correctamente.'});
                },function(obj){
                    self.cartel({ta:'alert-error', msg_p: 'Error!', msg_s: 'No se pudo crear el usuario correspondiente: error interno de la aplicación.'});
                });
            },
            cartel: function(vars){
                $("#alertas_alta_usuario").append(can.view(url+'zonas/alta/alert.ejs',
                    {tipo_alerta:vars.ta, mensaje_primario: vars.msg_p, mensaje_secundario: vars.msg_s}));
                $("."+vars.ta).alert();
                setTimeout(function(){
                    $("."+vars.ta).alert('close');
                },3000);
            }
        })
    }
);

