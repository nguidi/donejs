/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs')
.then(
    function(){
        
        can.Control("Sigma_Registrar",{
            defaults: {
                
            }
        },{
            'init': function() {
                var miObjeto = {
                    id: 1,
                    patente: 'KJS759',
                    imgClass: 'red'
                }
                this.element.html(can.view('init_mobile.ejs',miObjeto))
            }
        })
    }
);