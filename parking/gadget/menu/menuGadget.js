/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/config.js',
    'parking/gadget/patente/patente.js',
    'parking/gadget/historial/historialH.js'
    )
.then(
    function(){

        can.Control("Inspector_menu",{
            'init': function( element , options ) {
                this.element.html(can.view(url+'gadget/menu/menuGadget.ejs'))
             },
            'a#patente click': function() {
                $.mobile.changePage(url +'gadget/patente/patente.html')
                $('#patentePage').live( 'pagecreate',function(event){          
                 new Patente_pantalla( '#mainResults', {} )
                  }
            )},
            'a#historial click':function(){
                $.mobile.changePage(url +'gadget/historial/historialH.html')
                $('#histPage').live( 'pagecreate',function(event){
                 new Historial( '#mainHist', {} )
                  }
            )
            }
    })
})