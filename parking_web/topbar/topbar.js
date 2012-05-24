/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/models/menu.js',
    'parking/fixtures/fixtures.js')
.then(
    function(){
        
        can.Control("TopBar",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                var self = this
                $.when(Menu.findAll({perfil: this.options.user.perfil}))
                .then(function(menu) {
                    console.log(menu)
                    self.element.html(can.view('./topbar/topbar.ejs', {username: self.options.user.username,data: menu}))
                })
            }
        })
    }
);

