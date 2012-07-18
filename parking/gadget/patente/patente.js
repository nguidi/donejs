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
              
				if ((nroPatente.length>0)){
                   var aux=new Array()
                  
                  $.when(Estado.findAll({patente:nroPatente},
                   function(elem){
					   $.extend(aux,elem)
					})
				  ).done(function()
				 {new Stat('body',aux)})
                
                     

               
                }else{Reg_estacionamiento.findAll({patente:nroPatente},function(elem){console.log(elem)})}
               
               }
            }  
    )}
)
