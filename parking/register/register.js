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
        
        can.Control("Registrarse",{
            defaults: {}
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'register/button.ejs'))
            },
            
            'span.register click': function() {
                var self = this
                $.mobile.changePage(url+'register/form.html')
                $('#formPage').live( 'pagecreate',function(event){
                    $('a#addPatente').bind('click',function(){
                       self.addPatente()
                    })
                })
                
            },
            
            addPatente: function() {
                var count = 1
                if ($('div#patentesList ul').length > 0){
                    count = $('div#patentesList ul#listaPatente li').length+1
                    $('div#patentesList ul').append(can.view(url+'register/li.ejs',{
                        numero: count,
                        patente: $('input#patente').val()
                    }))
                }  
                else {                    
                    $('div#patentesList').html(can.view(url+'register/ul.ejs',$('input#patente').val()))
                    $('label[for="patente"]').html("Agregar otra patente:")
                }
                $('input#patente').attr('value','')
            }
        })
    }
);