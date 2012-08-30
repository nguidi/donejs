/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    './patente.css')
.then(
    function(){
        can.Control("User_patente",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                if ($('div#loginPatentePage[data-role="page"]').length != 0)
                    $('div#loginPatentePage[data-role="page"]').remove()
                var self = this
                element.append(can.view('usuario/patente/views/init.ejs'))
                Marca_select.findAll({},
                    function(marca){
                        self.initSelect('div#marcaSelect','Marca','Seleccione una Marca',marca)
                    }
                )
                $.mobile.changePage($('div#loginPatentePage'))  
            },
            
            initSelect: function(select,label,title,options) {
                $('div#loginPatentePage '+select).html(
                    can.view('//parking/usuario/estacionar/views/select.ejs',
                    {
                        name: stringToRE(label),
                        label: label,
                        title: title,
                        options: options
                    }
                )).find('select').selectmenu();
            },
            
            '#loginPatentePage a#acceder click': function() {
                Cliente
                    .estadoPatente({
                        id_marca: $('#loginPatentePage #marcaSelect select').val(),
                        patente: $('#loginPatentePage input#patente').val()
                    })
                    .then(function(control){
                        if (control.length > 0)
                            if ($('#userControlPage[data-role="page"]').length == 0) {
                                new User_control( 'body', {
                                    control: control[0],
                                    patente: true
                                });
                            } else 
                                $('body').user_control('showMeControl',{user: 'Invitado', control: control[0]})
                        else 
                            console.log('ERROR')
                    })
            }
        })
    }
);