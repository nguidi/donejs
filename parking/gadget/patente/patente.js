/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/models/hist_patente.js',
    'parking/fixtures/inspectores.js',
    'parking/config.js',
     'parking/gadget/estadoUsuario/estadoUsuario.js').
then(
    function(){
        can.Control( "Patente_pantalla",{  
            'init':function(element ,options ){
                this.element.html(can.view(url +'gadget/patente/patente.ejs'))
                }
            ,

            'a#aceptar click':function(){
               var nroPatente = this.element.find('input#patente').val()

               if (nroPatente=='kmm875'){

                $.mobile.changePage(url +'gadget/estadoUsuario/estadoUsuario.html')
                $('#pageEstado').live( 'pagecreate',function(event){
                     new Luz_verde( '#mainEstado', true )
                    })
                }else
                     $.mobile.changePage(url+'login/error.html')
               }
            }  
    )}
)