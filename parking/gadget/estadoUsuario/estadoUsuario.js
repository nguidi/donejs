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

        can.Control("Stat",{
        defaults: new Object
        },{
           'init': function( element , options ) {
              console.log(this.options[0])
              this.element.append(can.view(url+'gadget/estadoUsuario/estadoUsuario.ejs'
                ,this.options))
              $.mobile.changePage($('#statusPage'))
               }
    })
})
