steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/models/usuario.js',
    'parking/fixtures/usuarios.js',
    'parking_web/login/login.css',
    'parking/config.js',
    'parking_web/principal/principal.js',
    'parking_web/register/register.js').then( function($){    // A este steal le agrego una pantalla ejs o algo asi
         can.Control('LoginWeb',
         {
             defaults : {
                 title: 'Sistema de Parking',
                 error: '',
                 view: ''
             }
         },
         {
             'init' : function(element, options){ // inicializacion
                 this.element.html(can.view(url + this.options.view,{message: this.options.error, img_url: "http://localhost/donejs/parking_web/images"})); // La idea es mostrar el elemento login.ejs
                 document.getElementById("username").focus();
             },
             'submit' : function(el, evento){
                 var self = this;
                 evento.preventDefault(); // Seteo informacion por defecto
                 this.element.find('[type=submit]').val('Verificando'); //modifica valor del boton submit
                 var user = User.findAll({username: el.find('input#username').val(), password: el.find('input#password').val()}); // Consulto al modelo, para validar los parametros de usuario
                 user.then(function(obj)
                 {
                     if(obj.items.length > 0)
                     {
                         console.log("ok!!!!")
                         /*$(document).sigma_session({
                             inactivity: 400000, //Tiempo de inactividad permitido
                             noconfirm: 10000, // Tiempo de popup abierto en caso de no confirmacion
                             sessionAlive: 3000, // Si yo no defino un sessionAlive... por defecto es de 10 minutos
                             user: obj.data, // solo hace falta pasarlo en caso de pooling o de timeout
                             element: "#mainframe"
                         });*/
                         self.loginOn();
                         self.principal_web = new PrincipalWeb("#mainPage",{user: obj.items[0]});
                     }
                     else
                        self.loginError()
                 });
             },
             "loginOn" : function(){ //handler del evento de login correcto
                 this.element.find('[type=submit]').val('Acceder');
                 $('.error_tag').text('');
             },
             "loginError": function(){//bindea un error de logueo
                 this.element.find('[type=submit]').val('Acceder');
                 $('.error_tag').text('Nombre de usuario o contraseña incorrecto');
             },
             "a click": function(element) 
             {
                 switch(element.attr('href'))
                 {
                     case '#newuser': this.register = new Register('#mainPage'); break;
                 }
                 
             },
             'a.salir click': function(element, options)//bindea la sesión vencida
             {
                 this.on();
                 this.principal_web.destroy();
                 this.init()
             }
         }
     );


     });
