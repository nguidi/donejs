/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/config.js',
    './style.css')
.then(
    function(){
        
        can.Control("Register",{
            defaults: {
                back_page_id: '#registerFormPage'
            }
        },{
            'init': function( element , options ) {
                this.element.append(can.view(url+'register/register_page.ejs'))
                $.mobile.changePage($('#registerFormPage'))
            },
            
            'a[data-rel="back"] click': function() {
                $.mobile.changePage($('#mainPage'))
            },
                      
            'a#addPatente click': function() {
                if ($('input#patente').val().length > 0){
                    if ($('div#patentesList ul').length > 0){
                        $('div#patentesList ul').append(can.view(url+'register/li.ejs',{
                            patente: $('input#patente').val()
                        }))
                    }  
                    else {                    
                        $('div#patentesList').html(can.view(url+'register/ul.ejs',$('input#patente').val()))
                        $('label[for="patente"]').html("Agregar otra patente:")
                    }
                    $('input#patente').attr('value','')    
                } else
                    alert("Por favor ingrese una patente y vuelvalo a intentar")
            },
            
            'ul#listaPatente li span.ui-icon-delete click': function(clickedSpan) {
                clickedSpan.parents('li').remove()
            }
        })
    }
);