/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/config.js')
.then(
    function(){
        
        can.Control("Registrarse",{
            defaults: {}
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'register/button.ejs'))
            },
            
            'span.register click': function() {
                $.mobile.changePage(url+'register/form.html')
            }
        })
    }
);