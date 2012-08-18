steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking_web/consultas/handler/consultas.css',
    'parking_web/config.js',
    'bootstrap/js/bootstrap-tab.js',
    'parking/fixtures/fixtures.js',
    'parking_web/consultas/infracciones/infracciones.js',
    'parking_web/consultas/cuenta_corriente/cuenta_corriente.js',
    'parking/models/zona.js')
.then(
    function(){
        
        can.Control("Consultas",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'consultas/handler/main.ejs'));
                this.alta = new Consulta_cuenta_corriente('#consulta_cuenta_corriente');
                this.alta = new Consulta_infracciones('#consulta_infracciones');
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

