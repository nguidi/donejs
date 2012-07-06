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
                this.element.append(can.view(url +'gadget/patente/patente.ejs'))
                $.mobile.changePage($('#patentePage'))

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
              
                if ((marcaId>0)&&(nroPatente.length>0)){
                   
                   Reg_estacionamiento.findAll({patente:nroPatente,marca_auto_id:marcaId},
                   function(elem){console.log(elem)})
                     

               
                }else{ Reg_estacionamiento.findAll({patente:nroPatente},function(elem){console.log(elem)})}
//               
              }
            }  
    )}
)