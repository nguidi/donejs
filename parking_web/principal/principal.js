/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking_web/topbar/topbar.js',
    'parking_web/home/home.js')
.then(
    function(){
        
        can.Control("PrincipalWeb",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view('./principal/main.ejs'))
                new TopBar("#header",{user: this.options.user});
                new Home("#content");
            }
        })
    }
);

