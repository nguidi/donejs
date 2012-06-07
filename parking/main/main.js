/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/config.js',
    'parking/register/register.js',
    'parking/login/login.js')
.then(
    function(){
        can.Control("Main",{
            defaults: {}
        },{
            'init': function( element , options ) {          
                this.element.append(can.view(url+'main/main_page.ejs',{img_url: url}))
            },
            
            'div#register click': function() {
                new Register( 'body', {} );
            },
            
            'div#login click': function() {
                new Login( 'body', {} );
            }
            
        })
    }
);