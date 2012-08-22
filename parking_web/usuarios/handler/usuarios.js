steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking_web/usuarios/handler/usuarios.css',
    'parking_web/config.js',
    'parking/fixtures/fixtures.js',
    'parking_web/usuarios/alta/alta.js',
    'parking/models/usuario.js',
    'sigma/tabla/tabla.js')
.then(
    function(){
        
        can.Control("Usuarios",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'usuarios/handler/main.ejs'));
                this.tabla = new Tabla("#tabla_usuarios",{
                    head: url + 'usuarios/tabla/head.ejs',
                    model: User,
                    row: url + 'usuarios/tabla/recipe.ejs',
                    tableStyle: 'table usuarios'
                });
                this.alta = new AltaUsuarios('#alta_usuarios')
            },
            "ul.nav li click": function(el) {
                if (!el.hasClass('active')) {
                    var toTab = this.element.find('div.tabbable ul.nav li.active').find('a').attr('href')
                    var toUntab = el.find('a').attr('href')
                    this.applyTab(toTab,toUntab)
                }
            },
            'applyTab': function(toTab,toUntab) {
                this.element.find('div.tabbable ul.nav li.active').removeClass('active');
                this.element.find('div.tab-content div.active').removeClass('active');
                this.element.find('div.tab-content div#'+toUntab).addClass('active');
                this.element.find('div.tabbable ul.nav li a[href='+toUntab+']').parent('li').addClass('active');
            }
        })
    }
);

