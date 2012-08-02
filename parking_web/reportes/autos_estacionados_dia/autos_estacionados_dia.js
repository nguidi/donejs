/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/fixtures/fixtures.js',
    'parking_web/reportes/common/reportes.css',
    'parking/models/registro_estacionamiento.js',
    'parking_web/config.js',
    'parking_web/reportes/common/table_reportes.js')
.then(
    function(){
        
        can.Control("Autos_estacionados_dia",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'reportes/autos_estacionados_dia/main.ejs',{mensaje: 'Autos estacionados por día: '}))
                this.table_est = new Table_reportes("#tabla_reportes", {
                    model: Reg_estacionamiento, 
                    user: options.user,
                    msg_total: 'CANTIDAD TOTAL DE AUTOS ESTACIONADOS: ',
                    recipe: 'reportes/autos_estacionados_dia/recipe.ejs',
                    parseResult: 'Int',
                    table_main: 'reportes/autos_estacionados_dia/tabla_autos_estacionados.ejs'
                });
                //this.grafica_est = new Grafica_autos_estacionados("#grafica_reportes", {model: Autos, user: options.user});
            }
        })
    }
);

