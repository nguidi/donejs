steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/fixtures/fixtures.js',
    'parking/models/inspector.js',
    'parking_web/config.js',
    'bootstrap/js/bootstrap-tab.js')
.then(
    function(){
        
        can.Control("Consulta_infracciones",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'consultas/infracciones/infracciones.ejs'));
            }
        })
    }
);

