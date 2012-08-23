steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/models/perfil.js',
    'parking/fixtures/fixtures.js',
    'parking/fixtures/usuarios.js',
    'parking/models/usuario.js',
    'jquery/dom/form_params',
    'parking_web/config.js')
.then(
    function(){
        
        can.Control("AltaUsuarios",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'usuarios/alta/alta.ejs'));
                Perfil.findAll({perfil: this.options.user.perfil}).then(function(obj){
                    $.each(obj.items,function(i,item){
                        $("select[name=perfil]").append("<option value="+item.id+">"+item.descripcion+"</option>")
                    })
                })
                
            },
            '#guardar_usuario_admin click':function(element){
                User.create(element.parents('form').formParams());
                /*var u = new User(element.parents('form').formParams());
                console.log(u)
                u.save(function(obj){
                    console.log(obj)
                });*/
            } 
        })
    }
);

