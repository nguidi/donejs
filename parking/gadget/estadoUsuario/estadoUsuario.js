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
        defaults: {status:false}
        },{
           'init': function( element , options ) {
              this.element.html(can.view(url+'gadget/estadoUsuario/estadoUsuario.ejs'
                ,this.options.status))
               }
    })
})