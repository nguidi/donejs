/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    './mobile_alert.css')
.then(
    function(){
        can.Control("Mobile_alert",{
            
        },{
            'init': function( element , options ) {
                var self = this
                can.bind.call(element,'alert_error',function(ev,object){
                    self.addAlert({
                        tipo: 'error',
                        mensaje: object.mensaje
                    })
                })
                can.bind.call(element,'alert_warning',function(ev,object){
                    self.addAlert({
                        tipo: 'warning',
                        mensaje: object.mensaje
                    })
                })
                can.bind.call(element,'alert_info',function(ev,object){
                    self.addAlert({
                        tipo: 'info',
                        mensaje: object.mensaje
                    })
                })
                can.bind.call(element,'alert_success',function(ev,object){
                    self.addAlert({
                        tipo: 'success',
                        mensaje: object.mensaje
                    })
                })
            },
            
            addAlert: function(alertData) {
                var self = this
                $.mobile.activePage.append(can.view('//sigma/mobile_alert/views/alert.ejs',alertData))
                var alert = $.mobile.activePage.find('.alert_mobile')
                alert
                    .delay(100)
                    .animate(
                        {opacity: 1}, 
                        "slow"
                    )
                setTimeout(function(){
                    self.removeAlert(alert)
                }, 4500);
            },
            
            '.alert_mobile button.close_alert click': function(element) {
                this.removeAlert(element.parent('.alert_mobile'))
            },
            
            removeAlert: function(element) {
                console.log(element)
                element
                    .delay(100)
                    .animate(
                        {opacity: 0}, 
                        "slow",
                        function(){
                            element.remove();
                        }
                    )
            }
        })
    }
);