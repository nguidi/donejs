steal(
    'can/control/control.js',
    'can/view/ejs',
	'parking_web/config.js')
.then(
    function(){
        
        can.Control("ZonasWeb",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'zonas/handler/main.ejs'))
            }
        })
    }
);

