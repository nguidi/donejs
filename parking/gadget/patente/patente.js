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
     'parking/gadget/estadoUsuario/estadoUsuario.js',
     'parking/fixtures/inspectores.js').
then(
    function(){
        can.Control( "Patente_pantalla",{  
            'init':function(element ,options ){
                this.element.html(can.view(url +'gadget/patente/patente.ejs'))
                }
            ,

            'a#aceptar click':function(){
               var nroPatente = this.element.find('input#patente').val()
               Hist_patente.findOne(nroPatente).then(function(objeto){
            
               if(!($.isEmptyObject(objeto._data))&& (objeto.estado=="OK!")){
                    $.mobile.changePage(url +'gadget/estadoUsuario/estadoUsuario.html')
                    $('#pageEstado').live( 'pagecreate',function(event){
                         new Luz_verde( '#mainEstado', {status:true} )
                    })
                }else{
                     $.mobile.changePage(url +'gadget/estadoUsuario/estadoUsuario.html')
                     $('#pageEstado').live( 'pagecreate',function(event){
                         new Luz_verde( '#mainEstado', {} )
                        })}
               })
               }
            }  
    )}
)