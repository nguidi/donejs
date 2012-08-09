steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/fixtures/fixtures.js',
    'parking/models/inspector.js',
    'parking_web/inspectores/handler/inspectores.css',
    'parking_web/config.js',
    'bootstrap/js/bootstrap-tab.js')
.then(
    function(){
        
        can.Control("AltaZona",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'zonas/alta/alta.ejs'));
            }
        })
    }
);

