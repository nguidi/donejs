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
    'parking_web/reportes/common/table_reportes.js',
    'parking_web/reportes/autos_estacionados/grafica_estacionados_web.js',
    'parking_web/common.css')
.then(
    function(){
        
        can.Control("Autos_estacionados_mes",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'reportes/common/main.ejs',{mensaje: 'Autos estacionados por mes: '}))
                this.table_est = new Table_reportes("#tabla_reportes", {
                    model: Autos, 
                    user: options.user,
                    msg_total: 'CANTIDAD TOTAL DE AUTOS ESTACIONADOS: ',
                    recipe: 'reportes/autos_estacionados/recipe.ejs',
                    parseResult: 'Int',
                    table_main: 'reportes/autos_estacionados/tabla_autos_estacionados.ejs'
                });
                this.grafica_est = new Grafica_autos_estacionados("#grafica_reportes", {model: Autos, user: options.user});
            }
        })
    }
);

