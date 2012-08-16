steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/fixtures/fixtures.js',
    'parking/models/inspector.js',
    'parking_web/carga_estacionamiento/handler/carga_estacionamiento.css',
    'parking_web/config.js',
    'bootstrap/js/bootstrap-tab.js')
.then(
    function(){
        
        can.Control("Datos_ticket",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'carga_estacionamiento/datos_ticket/datos_ticket.ejs'));
            }
        })
    }
);

