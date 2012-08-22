steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/fixtures/fixtures.js',
    'parking/models/usuario.js',
    'parking_web/config.js')
.then(
    function(){
        
        can.Control("AltaUsuarios",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'usuarios/alta/alta.ejs'));
            }
        })
    }
);

