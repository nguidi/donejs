/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/models/provincia.js',
    'parking/fixtures/provincias.js')
.then(
    function(){
        
        can.Control("PrincipalWeb",{
            'init': function( element , options ) {
                var self = this
                $.when(Provincia.findAll())
                .then(function(provincias) {
                    self.element.html(can.view('./principal/main.ejs',provincias))
                })
            }
        })
    }
);

