/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/models/cliente.js',
    './options.css')
.then(
    function(){
        
        can.Control("User_options",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                if ($.mobile.activePage.find('#optionsMenuDialog').length == 0)
                    $.mobile.activePage.append(can.view('//parking/options/views/init.ejs'))
                else
                    this.showOrHideDialog()
            },
        
            showOrHideDialog: function() {
                if ($.mobile.activePage.find('#optionsMenuDialog').hasClass('visible'))
                    $.mobile.activePage.find('#optionsMenuDialog')
                        .delay(100)
                        .animate(
                            {opacity: 0}, 
                            "slow"
                        )
                        .removeClass('visible')
                else
                    $.mobile.activePage.find('#optionsMenuDialog')
                        .animate(
                            {opacity: 1}, 
                            "slow"
                        )
                        .addClass('visible')    
            },
            
            '#optionsMenuDialog .editarUsuario click': function() {
                var view = '//parking/options/views/'
                view += (this.options.user.perfil == 8) ? 'editar_usuario.ejs' : 'editar_inspector.ejs'
                this.element.append(
                    can.view(view,this.options.user)
                )
                $.mobile.changePage($('#editarFormPage'))
            },
            
            '#optionsMenuDialog .logout click': function() {
                if (confirm("¿Esta seguro que desa salir?"))
                    new Main('body', {} );
            }
            
        })
    }
);