steal(
    'can/control/control.js',
    'can/view/ejs')
.then(
    function(){
        
        can.Control("ZonasWeb",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view('zonas/main.ejs'))
            }
        })
    }
);

