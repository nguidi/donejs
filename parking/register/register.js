/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'jquery/dom/form_params',
    'parking/models/cliente.js',
    './style.css')
.then(
    function(){
        
        can.Control("Register",{
            defaults: {
                back_page_id: '#registerFormPage'
            }
        },{
            'init': function( element , options ) {
                if ($('div#registerFormPage[data-role="page"]').length != 0)
                    $('div#registerFormPage[data-role="page"]').remove()
                this.element.append(can.view('register/register_page.ejs'))
                $.mobile.changePage($('#registerFormPage'))
            },
            
            'a[data-rel="back"] click': function() {
                $.mobile.changePage($('#mainPage'))
            },
            
            'a#guardar click': function() {
                var bool = true, self = this
                $('#registerFormPage form#register input').each(function(){
                    if ($(this).hasClass('required') && $(this).val().length == 0) {
                        self.isWrong($(this))
                        bool = false
                    } else 
                        self.isntWrong($(this))
                })
                var formParams = $('#registerFormPage form#register').formParams()
                bool = (formParams.password == formParams.confpassword) ? true: false
                if (bool)
                    Cliente.create(formParams)
                    .then(function(cliente){
                        $('div#registerFormPage[data-role="page"] div#mainForm').html(can.view('register/register_success.ejs'))
                        $('a#ingresar').button()
                    })
            },
            
            isWrong: function(input) {
                input.addClass('wrong')
                input.attr('placeholder','Este campo es obligatorio.')
            },
            
            isntWrong: function(input) {
                input.removeClass('wrong')
                input.attr('placeholder','')
            },
            
            'input.wrong change': function(elem) {
                if (elem.hasClass('required') && elem.val().length != 0)
                    this.isntWrong(elem)
            },
            
            'a#ingresar click': function() {
                $('div#mainPage[data-role="page"] div#login').click()
            }
        })
    }
);