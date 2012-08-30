steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/models/perfil.js',
    'parking/fixtures/fixtures.js',
    'parking/models/usuario.js',
    'parking_web/config.js',
    'sigma/tabla/tabla.js',
    'parking_web/common.css')
.then(
    function(){
        
        can.Control("TablaUsuarios",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'usuarios/tabla/tabla.ejs'));
                this.tabla = new Tabla("#mostrar_datos_usuarios",{
                    head: url + 'usuarios/tabla/head.ejs',
                    model: User,
                    row: url + 'usuarios/tabla/recipe.ejs',
                    tableStyle: 'table usuarios'
                });
                //{perfil: this.options.user.perfil}
                Perfil.findAll().then(function(obj){
                    $.each(obj,function(i,item){
                        $("select[name=perfil]").append("<option value="+item.id+">"+item.descripcion+"</option>")
                    });
                });
                
            }
        })
    }
);

