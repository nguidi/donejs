/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking_web/config.js')
.then(
    function(){
        
        can.Control("Grafica_recaudacion_web",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                //this.element.html(can.view(url+'reportes/recaudacion/recaudacion.ejs'))
            }
        })
    }
);

