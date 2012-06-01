/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/config.js',
    'parking/fixtures/usuarios.js',
    'parking/models/municipio.js',
    'parking/models/hist_patente.js',
    'parking/fixtures/inspectores.js'
    )
.then(
    function(){

        can.Control("Historial",{

            'init': function( element , options ) {
                this.element.html(can.view(url+'gadget/historial/historial.ejs'))


                Municipio_select.findAll({},function(municipios) {
                     $('div#municipiosSelect').html(
                        can.view(url+'gadget/historial/select.ejs',
                        {
                            label: "Municipios",
                            title: "Seleccione un Municipio",
                            options: municipios
                        }
                     )).find('select').selectmenu();
                })
            },
            'a#aceptar click':function(){
               var idMuni=this.element.find('select#municipios').val()
               var nroPatente = this.element.find('input#patente').val()
               var date=this.element.find('input#fecha').val()
               Hist_patente.findAll({muni:idMuni, patente:nroPatente,fecha_ins:date},function(){
                   $.each(aux,function(index,elem){
                       console.log(elem)})})
               }
       })
   }
)
