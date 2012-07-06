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
        defaults: {elemento: new Object}
        },{
           'init': function( element , options ) {
               console.log("llega")
              this.element.append(can.view(url+'gadget/estadoUsuario/estadoUsuario.ejs'
                ,this.options.elemento))
              $.mobile.changePage($('#statusPage'))
               }
    })
})