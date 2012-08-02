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
    'parking_web/reportes/infracciones/grafica_infracciones_web.js')
.then(
    function(){
        
        can.Control("Infracciones_mes",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'reportes/common/main.ejs',{mensaje: 'Cantidad de infracciones por mes: '}))
                this.table_est = new Table_reportes("#tabla_reportes", {
                    model: Infracciones_rep, 
                    user: options.user, 
                    msg_total: 'CANTIDAD TOTAL DE AUTOS EN INFRACCIÓN: ', 
                    recipe: 'reportes/infracciones/recipe.ejs',
                    parse: 'Int'
                });
                this.grafica_est = new Grafica_infracciones("#grafica_reportes", {model: Infracciones_rep, user: options.user});
            }
        })
    }
);

