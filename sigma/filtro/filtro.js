/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs')
.then(
    function(){
        
        can.Control("Filtro",{
            defaults: {
                
            }
        },{
            'init': function( element , options ) {
                console.log('Filtro Initialized')
            }
        })
    }
);