/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/fixtures/fixtures.js',
    'parking_web/reportes/common/reportes.css',
    'parking/models/reportes.js',
    'parking_web/config.js',
    'parking_web/reportes/autos_estacionados/table_autos_estacionados.js',
    'parking_web/reportes/autos_estacionados/grafica_estacionados_web.js')
.then(
    function(){
        
        can.Control("Autos_estacionados",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'reportes/common/main.ejs',{mensaje: 'Autos estacionados por día: '}))
                this.table_est = new Table_autos_estacionados("#tabla_reportes", {model: Autos, user: options.user});
                this.grafica_est = new Grafica_autos_estacionados("#grafica_reportes", {model: Autos, user: options.user});
            }
        })
    }
);

