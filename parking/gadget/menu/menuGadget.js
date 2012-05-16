/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/config.js',
    'parking/gadget/patente/patente.js'
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
            )}   
    })
      
})