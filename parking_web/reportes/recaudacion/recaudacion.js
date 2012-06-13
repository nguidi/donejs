/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/fixtures/fixtures.js',
    'parking_web/reportes/recaudacion/recaudacion.css',
    'parking/models/recaudacion.js',
    'parking_web/config.js',
    'parking_web/reportes/recaudacion/table_recaudacion.js',
    'parking_web/reportes/recaudacion/grafica_recaudacion_web.js')
.then(
    function(){
        
        can.Control("Recaudacion_web",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                console.log('Recaudacion init')
                this.element.html(can.view(url+'reportes/recaudacion/recaudacion.ejs'))
                this.table_rec = new Table_recaudacion_web("#tabla_recaudacion", {model: Recaudacion, user: options.user});
                this.grafica_rec = new Grafica_recaudacion_web("#grafica_recaudacion", {model: Recaudacion, user: options.user});
            }
        })
    }
);

