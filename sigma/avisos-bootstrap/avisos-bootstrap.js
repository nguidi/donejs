/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(  'can/control/control.js',
        'can/view/ejs',
        'sigma/common.js',
        'bootstrap/js/bootstrap-alert.js')
.then( 
    function($){
        can.Control('Cartel',
        /** @Static */
        {
                defaults : {
                    template: undefined
                }
        },
        /** @Prototype */
        {
            'init' : function(element , options){
                
            },
            'aviso': function(vars) { //invocar este método para levantar el cartel
                var tipo_alerta = 'alert-success';
                switch(vars.tipo_alerta)
                {
                    case "error": tipo_alerta = 'alert-error'; break;
                    case "exito": tipo_alerta = 'alert-success'; break;
                }
                self.cartel($.extend(vars,{tipo_alerta: tipo_alerta}))
                //var params = {tipo_alerta:vars.ta, mensaje_primario: vars.msg_p, mensaje_secundario: vars.msg_s};
                
            },//implemento el cartel
            cartel: function(vars){
                var url_tem = systemPath() + 'avisos-bootstrap/view/alert.ejs'; //template por defecto
                if(this.options.template != undefined) // si le paso un template personalizado lo implemento
                    url_tem = this.options.template;
                $(this.element).append(can.view(url_tem,vars)); // muestro cartel
                if(vars.tipo_alerta != undefined){
                    $("."+vars.tipo_alerta).alert(); // implemento librería de bootstrap para alerts
                    setTimeout(function(){ // le pongo un tiempo de vida...
                        $("."+vars.tipo_alerta).alert('close'); // al vencerse el tiempo de vida, rompo el cartel
                    },3000);
                }
                else{
                    console.log("No se le pasó correctamente el tipo de cartel");
                }
                
            }
        })
    }
)