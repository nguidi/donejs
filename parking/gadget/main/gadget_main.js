/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/gadget/patente/patente.js',
    'parking/gadget/historial/historialH.js'
    )
.then(
    function(){

        can.Control("Gadget_main",
            {
                defaults: {
                    user: undefined
                }
            },{
                'init': function( element , options ) {
                    
                    element.append(
                        can.view('//parking/gadget/main/gadget_main_page.ejs',options.user.inspector)
                    )
                        
                    element.find('#userInspectorPage a#opciones').button();
                    
                    $.mobile.changePage($('#userInspectorPage'))

                },
                
                showMeGadget: function(options) {
                    if (!isUndefined(options))
                        for (var attr in options)
                            this.options[attr] = options[attr]
                    $.mobile.changePage($('#userInspectorPage'))
                },
                
                '#userInspectorPage a#opciones click': function() {
                    new User_options ( 'body' , {
                        user: this.options.user
                    })
                },
                
                '#userInspectorPage a#patente click': function(){          
                    new Patente_pantalla( 'body', {
                        user : this.options.user
                    } )
                },
                
                '#userInspectorPage a#historial click':function(){
                    new Historial( 'body', {
                        user : this.options.user
                    } )
                }           
            }
        )
})