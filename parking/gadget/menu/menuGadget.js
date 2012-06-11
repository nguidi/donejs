/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/config.js',
    'parking/gadget/patente/patente.js',
    'parking/gadget/historial/historialH.js'
    )
.then(
    function(){

        can.Control("Inspector_menu",{
            'init': function( element , options ) {
                this.element.append(can.view(url+'gadget/menu/menuGadget.ejs'))
             },
            'a#patente click': function(){          
                 new Patente_pantalla( 'body', {} )
            }
            ,
            'a#historial click':function(){
                 new Historial( 'body', {} )
             }
            
            
    })
})