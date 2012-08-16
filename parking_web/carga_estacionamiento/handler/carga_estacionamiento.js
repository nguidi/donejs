steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking_web/carga_estacionamiento/handler/carga_estacionamiento.css',
    'parking_web/config.js',
    'bootstrap/js/bootstrap-tab.js',
    'parking/fixtures/fixtures.js',
    'parking_web/carga_estacionamiento/datos_ticket/datos_ticket.js',
    'parking_web/carga_estacionamiento/cuenta_corriente/cuenta_corriente.js',
    'parking/models/zona.js')
.then(
    function(){
        
        can.Control("Carga_estacionamiento",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'carga_estacionamiento/handler/main.ejs'));
                this.cc = new Cuenta_corriente('#cuenta_corriente')
                this.dt = new Datos_ticket('#datos_ticket')
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

