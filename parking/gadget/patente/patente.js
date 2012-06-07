/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/fixtures/inspectores.js',
    'parking/fixtures/fixtures.js',
    'parking/gadget/estadoUsuario/estadoUsuario.js',
    'parking/config.js',
    'parking/models/registro_estacionamiento.js',
    'parking/models/hist_patente.js',
    'parking/models/marca.js'
     ).
then(
    function(){
        can.Control( "Patente_pantalla",{  
            'init':function(element ,options ){
                this.element.html(can.view(url +'gadget/patente/patente.ejs'))
                Marca_select.findAll({},function(marcas) {
                     $('div#marcasSelect').html(
                        can.view(url+'gadget/patente/selectP.ejs',
                        {
                            label: "Marcas",
                            title: "Seleccione una Marca",
                            options: marcas
                        }
                     )).find('select').selectmenu();
                })
                }
            ,

            'a#aceptar click':function(){
               var nroPatente = this.element.find('input#patente').val()
               var marcaId = this.element.find('select#marcas').val()
               
               //console.log((marcaId.is('select'))?'anda':'no anda')
               console.log(marcaId)
               console.log(nroPatente)
               if ((marcaId>0)&&(nroPatente.length>0)){

                 Reg_estacionamiento.findAll({patente:nroPatente,marca_auto_id:marcaId},function(registro){
                   console.log(registro)
                    })
               }
                else{
                     if (nroPatente.length > 0){
                        Reg_estacionamiento.findAll({patente:nroPatente},function(registro){
                         console.log(registro)
                       })
                     }
                      else{
                           if(marcaId>0){
                              Reg_estacionamiento.findAll({marca_auto_id:marcaId},function(registro){
                                console.log(registro)})
                           }
                            else{
                                 Reg_estacionamiento.findAll().then(function(registro){
                                   console.log(registro)})
                            }
                       }
                }

//        
//               if(!($.isEmptyObject(objeto._data))&& (objeto.estado=="OK!")){
//                    $.mobile.changePage(url +'gadget/estadoUsuario/estadoUsuario.html')
//                    $('#pageEstado').live( 'pagecreate',function(event){
//                         new Luz_verde( '#mainEstado', {status:true} )
//                    })
//                }else{
//                     $.mobile.changePage(url +'gadget/estadoUsuario/estadoUsuario.html')
//                     $('#pageEstado').live( 'pagecreate',function(event){
//                         new Luz_verde( '#mainEstado', {} )
//                        })}
//               })
              }
            }  
    )}
)