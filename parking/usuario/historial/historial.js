/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/usuario/options/options.js',
    'parking/fixtures/fixtures.js',
    'parking/models/control.js')
.then(
    function(){
        
        can.Control("User_historial",{
            defaults: {
                user: new Object()
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'usuario/historial/historial.ejs'))
                //SELECT * from control where usuario_id= '$con_user_id' order by ingreso desc, patente
                Control.findAll({usuario_id: options.user.id},
                    // successs
                    function(controls) {
                        console.log(controls)
                        console.log($('table.historial tbody'))
                        $('table.historial tbody').append(can.view(url+'usuario/historial/tds.ejs',controls))
                    }
                )
            }
        })
    }
);