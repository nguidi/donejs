/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/fixtures/fixtures.js',
    'parking_web/reportes/common/reportes.css',
    'parking/models/multa.js',
    'parking_web/config.js',
    'parking_web/reportes/common/table_reportes.js',
    'parking_web/reportes/infracciones/grafica_infracciones_web.js')
.then(
    function(){
        
        can.Control("Infracciones_dia",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'reportes/infracciones_dia/main.ejs',{mensaje: 'Cantidad de infracciones por día: '}))
                this.table_est = new Table_reportes("#tabla_reportes", {
                    model: Multa, 
                    user: options.user, 
                    msg_total: 'CANTIDAD TOTAL DE AUTOS EN INFRACCIÓN: ', 
                    recipe: 'reportes/infracciones_dia/recipe.ejs',
                    table_main: 'reportes/infracciones_dia/tabla_infracciones.ejs'
                });
                //this.grafica_est = new Grafica_infracciones("#grafica_reportes", {model: Infracciones_rep, user: options.user});
            }
        })
    }
);

