/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'can/control/plugin',
    'parking/register/register.js',
    'sigma/login',
    'parking/models/municipio.js',
    'parking/usuario/main/usuario_main.js',
    'parking/gadget/main/gadget_main.js',
    'parking/usuario/patente/patente.js')
.then(
    function(){
        can.Control("Main",{
            defaults: {}
        },{
            'init': function( element , options ) {
                this.element.append(can.view('main/main_page.ejs'))
            },
            
            showMeMain: function() {
                if ($('div[data-role="page"]#mainPage').length != 0)
                    $('div[data-role="page"]#mainPage').remove()
                this.element.append(can.view('main/main_page.ejs'))
                $.mobile.changePage($('#mainPage'))
            },
            
            'div#patente click': function() {
                new User_patente( 'body', {} );
            },
            
            'div#register click': function() {
                new Register( 'body', {} );
            },
            
            'div#login click': function() {
                var self = this
                new Login('body',{
                    mobile: true,
                    content: '//parking/main/mobile.ejs',
                    onLoad: function() {
                        Municipio_select.findAll({},
                            function(municipios) {
                                $('#loginPage div#muncipioSelect').html(
                                    can.view('//parking/usuario/estacionar/views/select.ejs',
                                    {
                                        name: stringToRE('Municipios'),
                                        label: 'Municipios',
                                        title: 'Seleccione un Municipio',
                                        options: municipios
                                    }
                                )).find('select').selectmenu();
                            }
                        )
                    },
                    success: function(user,form) {
                        user['municipio'] = form.municipios
                        switch(user.perfil) {
                            case 8:
                                new User_main( 'body' , {
                                    user: user,
                                    login: true
                                })
                                break;
                            case 4:
                                new Gadget_main( 'body' , {
                                    user: user
                                })
                                break;
                            default: 
                                console.log('Perfil No Mobile')
                                self.element.find("span.error_tag").html('El tipo de usuario al que intenta acceder no posee un sitio mobile')
                                $.mobile.changePage($('#registerFormPage'))                
                                self.element.find("span.error_tag").show()
                        }
                    },
                    back: '#mainPage'
                })
            }
            
        })
    }
);