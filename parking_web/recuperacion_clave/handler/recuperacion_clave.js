steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking_web/recuperacion_clave/handler/recuperacion_clave.css',
    'parking_web/config.js',
    'bootstrap/js/bootstrap-tab.js',
    'parking/fixtures/fixtures.js',
    'parking_web/recuperacion_clave/palabra_clave/palabra_clave.js',
    'parking_web/recuperacion_clave/sin_datos/sin_datos.js',
    'parking_web/recuperacion_clave/patente/patente.js',
    'parking/models/zona.js')
.then(
    function(){
        
        can.Control("RecuperacionClave",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'recuperacion_clave/handler/main.ejs'));
                this.clave = new PalabraClave("#palabra_clave");
                this.patente = new Patente('#patente');
                this.sindatos = new SinDatos('#sin_datos')
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

