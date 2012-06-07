/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/route/route.js',
    'can/view/ejs')
.then(
    function(){
        
        can.Control("Mobile_Route",{
            defaults: {
                
            }
        },{
            'init': function( element , options ) {
                console.log('Mobile Route Initialized')
            },
            
            'route': function() {
                console.log('try')
            },
                        
            'body pagebeforechange': function(element,event,cp_options) {
            },
            
            'body pagechange': function(element,event,cp_options) {
                console.log('Page Changed')
                console.log(cp_options.toPage[0].id)
                //  can.route.attr({frame: cp_options.toPage[0].id})
            },
            
            'body pagechangefailed': function(element,event,cp_options) {
            }
        })
    }
);