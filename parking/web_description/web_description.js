/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/config.js')
.then(
    function(){
        
        can.Control("Web_description",{
            defaults: {}
        },{
            'init': function( element , options ) {
                var self = this
                this.element.html(can.view(url+'web_description/main.ejs',1))
            },
            
            'img swipeleft, img swiperight': function() {
                var id = Math.floor(Math.random() * (4 - 1 + 1) + 1);
                this.element.find('img').hide('fade')
                this.element.html(can.view(url+'web_description/main.ejs',id))
                this.element.find('img').show('fade')
            }
            
        })
    }
);