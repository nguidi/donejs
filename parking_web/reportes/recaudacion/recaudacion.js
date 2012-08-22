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
    'parking_web/reportes/recaudacion/grafica_recaudacion_web.js',
    'parking_web/common.css')
.then(
    function(){
        
        can.Control("Recaudacion_web",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'reportes/common/main.ejs',{mensaje: 'Recaudación: '}))
                this.table_rec = new Table_reportes("#tabla_reportes", {
                    model: Recaudacion, 
                    user: options.user, 
                    msg_total: 'RECAUDACION TOTAL : $', 
                    recipe: 'reportes/recaudacion/recipe.ejs',
                    parseResult: 'Float',
                    table_main: 'reportes/recaudacion/tabla_recaudacion.ejs'
                });
                this.grafica_rec = new Grafica_recaudacion_web("#grafica_reportes", {model: Recaudacion, user: options.user});
            }
        })
    }
);

