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
    'parking_web/reportes/infracciones/table_infracciones.js',
    'parking_web/reportes/infracciones/grafica_infracciones_web.js')
.then(
    function(){
        
        can.Control("Infracciones",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'reportes/common/main.ejs',{mensaje: 'Cantidad de infracciones: '}))
                this.table_est = new Table_infracciones("#tabla_reportes", {
                    model: Infracciones_rep, 
                    user: options.user, 
                    msg_total: 'CANTIDAD TOTAL DE AUTOS EN INFRACCIÓN:', 
                    recipe: 'reportes/infracciones/recipe.ejs'
                });
                this.grafica_est = new Grafica_infracciones("#grafica_reportes", {model: Infracciones_rep, user: options.user});
            }
        })
    }
);

