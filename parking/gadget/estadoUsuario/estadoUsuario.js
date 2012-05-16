/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/config.js'

    )
.then(
  function(){

        can.Control("Luz_verde",{
            'init': function( element , options ) {
                this.element.html(can.view(url+'gadget/estadoUsuario/estadoUsuario.ejs'
//                ,{
//                    nPatente: "kmm875",
//                    luz: true
//                }
            )
            )
             }
    })
    
})