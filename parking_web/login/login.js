steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/models/usuario.js',
    'parking/fixtures/usuarios.js',
    'parking_web/login/login.css',
    'parking/config.js').then('./views/init.ejs', function($){    // A este steal le agrego una pantalla ejs o algo asi
         can.Control('LoginWeb',
         {
             listensTo:["loginOn","loginError","logOut","loginSessionOff"], // A la espera de estos eventos...
             defaults : {
                 title: 'Sistema de Parking',
                 error: ''
             }
         },
         {
             'init' : function(){ // inicializacion
                 this.element.html(can.view('./login/views/init.ejs',{message: this.options.error, img_url: "http://localhost/donejs/parking_web/images"})); // La idea es mostrar el elemento login.ejs
                 document.getElementById("username").focus();
             },
             'submit' : function(el, evento){
                 evento.preventDefault(); // Seteo informacion por defecto
                 this.element.find('[type=submit]').val('Verificando'); //modifica valor del boton submit
                 var user = User.findAll({username: el.find('input#username').val(), password: el.find('input#password').val()}); // Consulto al modelo, para validar los parametros de usuario
                 user.then(function(obj)
                 {
                     console.log(obj)
                     if(obj.length > 0)
                     {
                         /*$(document).sigma_session({
                             inactivity: 400000, //Tiempo de inactividad permitido
                             noconfirm: 10000, // Tiempo de popup abierto en caso de no confirmacion
                             sessionAlive: 3000, // Si yo no defino un sessionAlive... por defecto es de 10 minutos
                             user: obj.data, // solo hace falta pasarlo en caso de pooling o de timeout
                             element: "#mainframe"
                         });*/
                         can.data(can.$("#mainPage"),'element','principal_web').remove()
                         new PrincipalWeb("#mainPage",{user_data: obj.data})
                         //el.trigger("loginOn",[obj.data]); // disparo un evento con dos handlers... uno en principal y el otro local...
                     }
                     else
                        el.trigger("loginError");
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
             "loginSessionOff": function() //bindea la sesión vencida
             {
                 if(typeof($(document).controller()) == 'undefined')
                 {
                     $(document).controller().logout();
                 }
                 this.element.html(this.view('init.ejs',{message: 'Sesión vencida, debe volver a ingresar'}));
                 document.getElementById("username").focus();
                 $('h1').text(this.options.title);
             },
             "logOut": function() //logout voluntario
             {
                 this.init();
             }
         }
     );


     });
