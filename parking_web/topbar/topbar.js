/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/models/menu.js',
    'parking/fixtures/fixtures.js',
    'parking_web/config.js',
    'bootstrap/js/bootstrap-dropdown.js',
    './topbar.css',
    'parking_web/zonas/handler/zonas.js',
    'parking_web/reportes/infracciones/infracciones.js',
    'parking_web/reportes/infracciones_dia/infracciones_dia.js',
    'parking_web/reportes/recaudacion/recaudacion.js',
    'parking_web/reportes/autos_estacionados/autos_estacionados.js',
    'parking_web/reportes/autos_estacionados_dia/autos_estacionados_dia.js')
.then(
    function(){
        
        can.Control("TopBar",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                var self = this
                $.when(Menu.findAll({perfil: this.options.user.perfil}))
                .then(function(menu) {
                    self.element.html(can.view(url+'topbar/topbar.ejs', {base_url: url+'images/',username: self.options.user.username,data: menu}));
                    $('.dropdown-toggle').dropdown();
                })
            },
            'ul.nav li click': function(element, options){
                var click = element.find('a').attr('href');
                switch(click){
                    case '#menu-zonas': new ZonasWeb("#content"); break;
                    case '#submenu_infracciones_dia': new Infracciones_dia("#content",{ user: this.options.user}); break;
                    case '#submenu_recaudacion': new Recaudacion_web("#content",{ user: this.options.user}); break;
                    case '#submenu_autos_estacionados_mes': new Autos_estacionados_mes("#content",{ user: this.options.user}); break;
                    case '#submenu_autos_estacionados_dia': new Autos_estacionados_dia("#content",{ user: this.options.user}); break;
                    case '#submenu_infracciones_mes': new Infracciones_mes("#content",{ user: this.options.user}); break;
                }
            },
            'a.brand click': function(element, options){
                    new Home("#content");
            }
        })
    }
);

