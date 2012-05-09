/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/gadget/modelInspector.js',
    'parking/fixtures/inspectores.js')
.then(
    function(){

        can.Control("ControllerInpector_status",{
            'init': function( element , options ) {
                var self = this
                $.when(Hist_patente.findAll())
                .then(function(inspectores) {
                    console.log(inspectores)
                })
            }
        })
    }
);
