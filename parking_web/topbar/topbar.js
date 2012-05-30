/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/models/menu.js',
    'parking/fixtures/fixtures.js',
    'parking_web/config.js',
    'bootstrap/js/bootstrap-dropdown.js',
    './topbar.css',
    'parking_web/zonas/zonas.js')
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
                    self.element.html(can.view('./topbar/topbar.ejs', {base_url: url+'images/',username: self.options.user.username,data: menu}))
                    $('.dropdown-toggle').dropdown()
                })
            },
            'ul.nav li click': function(element, options){
                if(element.find('a').attr('href') == '#menu-zonas')
                {
                    new ZonasWeb("#content")
                }
            },
            'a.brand click': function(element, options){
                    new Home("#content")
            }
        })
    }
);

