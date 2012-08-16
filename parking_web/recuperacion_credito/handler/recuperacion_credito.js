steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking_web/recuperacion_credito/handler/recuperacion_credito.css',
    'parking_web/config.js',
    'parking/fixtures/fixtures.js',
    'parking/models/zona.js')
.then(
    function(){
        
        can.Control("RecuperacionCredito",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'recuperacion_credito/handler/main.ejs'));
            }
        })
    }
);

