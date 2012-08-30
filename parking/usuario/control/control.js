steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/options/options.js',
    './control.css')
.then(
    function(){
        
        can.Control("User_control",{
            defaults: {
                user: undefined,
                control: undefined,
                patente: false
            }
        },{
            'init': function( element , options ) {
                if ($('div#userControlPage[data-role="page"]').length != 0) 
                    $('div#userControlPage[data-role="page"]').remove()
                element.append(
                    can.view('//parking/usuario/control/views/init.ejs',{
                        username: (options.patente) ? 'Invitado' : options.user.username,
                        img: (this.numeroImagen(options.control) < 0) ? 0 : this.numeroImagen(options.control),
                        control: options.control
                    })
                )
                element.find('#userControlPage a#opciones').button();
                $.mobile.changePage($('#userControlPage'))
            },
            
            numeroImagen: function(control) {
                 var maxmin = (createDate(control.egreso) - createDate(control.ingreso))/(1000*60)
                 return Math.floor((control.tiempo_restante*10)/maxmin)
            },
            
            showMeControl: function(options) {
                if (!isUndefined(options))
                    for (var attr in options)
                        this.options[attr] = options[attr]
                this.init(this.element,this.options)
            },
            
            '#userControlPage a#opciones click': function() {
                if (this.options.patente == false)
                    new User_options ( 'body' , {
                        user: this.options.user
                    })
            },
            
            '#userControlPage a#extender click': function() {
                if ($('div#userControlPage[data-role="page"]').length == 0) {
                    new User_estacionar( 'body' , {
                        user: this.options.user,
                        extender: this.options.control.id
                    })    
                } else 
                    $('body').user_estacionar('showMeEstacionar',{
                        user: this.options.user,
                        extender: this.options.control.id
                    })
            },
            
            '#userControlPage a[rel="back"] click': function() {
                $('body').user_main('showMeUserMain',{user: this.options.user})
            },
            
            '#userControlPage a#logout click': function() {
                if (confirm("¿Esta seguro que desa salir?")) {
                    if ($('div[data-role="page"]#mainPage').length != 0)
                        new Main( 'body', {});
                    } else 
                        $('body').main('showMeMain')
            }
        })
    }
);