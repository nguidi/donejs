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
                this.element.html(can.view('./main.ejs'))
                new TopBar("#header",{user: this.options.user});
                new Home("#content");
                
            }
        })
    }
);

