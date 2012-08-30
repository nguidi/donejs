steal(
    'can/control/control.js',
    'can/view/ejs',
    'jquery/dom/form_params',
    './login.css',
    'sigma/common.js'
).then(
    function($){    // A este steal le agrego una pantalla ejs o algo asi
         can.Control('Login',
         {
             defaults : {
                 title: 'Sistema de Parking',
                 mobile: false,
                 error_msg: 'Fallo de Autentificacion',
                 success: undefined,
                 model: undefined,
                 view: undefined,
                 back: undefined
             }
         },
         {
             'init' : function( element , options ){ // inicializacion
                 if (options.view === undefined) {
                     if(options.mobile) {
                         if ($('div#loginPage[data-role="page"]').length != 0)
                             $('div#loginPage[data-role="page"]').remove()
                         element.append(can.view(options.content,{message: options.error_msg, img_url: options.image_url}));
                         if (!isUndefined(options.onLoad))
                             options.onLoad()
                         $.mobile.changePage($('#loginPage'))
                         if (!isUndefined(options.back))
                             $('div#loginPage a[data-rel="back"]').bind('click', function() {
                                $.mobile.changePage($(options.back))
                            });
                     } else {
                         options.view = './views/web.ejs'                 
                         element.html(can.view(options.view,{message: options.error_msg, img_url: options.image_url}));
                     }
                 }
                 element.find("input#username").focus();
                 element.find("span.error_tag").hide()
                 element.find('input#visiblePassword').hide()
             },
             
             submit: function(el, evento) {
                 var self = this;
                 evento.preventDefault(); // Seteo informacion por defecto
                 this.element.find('[type=submit]').val('Verificando'); //modifica valor del boton submit
                 var user = User.findUser({username: el.find('input#username').val(), password: el.find('input#password').val()}); // Consulto al modelo, para validar los parametros de usuario
                 console.log({username: el.find('input#username').val(), password: el.find('input#password').val()})
                 user.then(function(obj)
                 {
                     if(obj.length > 0)
                     {
                         /*$(document).sigma_session({
                             inactivity: 400000, //Tiempo de inactividad permitido
                             noconfirm: 10000, // Tiempo de popup abierto en caso de no confirmacion
                             sessionAlive: 3000, // Si yo no defino un sessionAlive... por defecto es de 10 minutos
                             user: obj.data, // solo hace falta pasarlo en caso de pooling o de timeout
                             element: "#mainframe"
                         });*/
                         self.loginOn();
                         if (isUndefined(self.options.success))
                             console.log("Func Success Undefined")
                         else 
                             self.options.success(obj[0],$('form').formParams())
                     }
                     else
                        self.loginError()
                 });
             },
             
             loginOn: function() { //handler del evento de login correcto
                 this.element.find('[type=submit]').val('Acceder');
                 this.element.find("span.error_tag").hide()
             },
             
             loginError: function() {//bindea un error de logueo
                 this.element.find('[type=submit]').val('Acceder');
                 this.element.find("span.error_tag").show()
             },
             
             loginSessionOff: function() { //bindea la sesión vencida
                 this.principal_web.destroy();
                 this.element.html(this.view('init.ejs',{message: 'Sesión vencida, debe volver a ingresar'}));
                 document.getElementById("username").focus();
                 $('h1').text(this.options.title);
             },
             
             prueba: function() {
                 console.log('asd')
             },
             
             "input.invertedPassword keyup": function(input, event) {
                 this.element.find("[name=password]").val(input.val())
             },
             
             "input#seePassword change": function(input, event) {
                 switch(input.is(':checked')) {
                     case true:
                         this.element.find('input#password').hide()
                         this.element.find('input#visiblePassword').show()
                         break;
                     case false:
                         this.element.find('input#visiblePassword').hide()
                         this.element.find('input#password').show()
                         break;
                 }
             }
         }
     );
});