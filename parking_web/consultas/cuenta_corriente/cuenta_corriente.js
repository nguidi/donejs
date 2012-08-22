steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/fixtures/fixtures.js',
    'parking/models/cuenta_corriente.js',
    'parking_web/config.js',
    'parking_web/common.css',
    'sigma/tabla/tabla.js',
    'jquery/dom/form_params',
    'bootstrap/js/bootstrap-alert.js')
.then(
    function(){
        
        can.Control("Consulta_cuenta_corriente",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'consultas/cuenta_corriente/cuenta_corriente.ejs'));
            },
            '#consultar_cuenta_corriente click': function(el, opt){
                var self = this;
                Infraccion.findAll($(el).parents('form').formParams()).then(function(data){
                    if(data.items.length > 0){
                        $(".alert-error").alert('close');
                        $(".alert").removeClass('invisible');
                        self.tabla = new Tabla("#table_resultados_inf",{
                            head: url + 'consultas/infracciones/head.ejs',
                            row: url + 'consultas/infracciones/recipe.ejs',
                            data: data,
                            tableStyle: 'table resultados_inf'
                        });
                    }
                    else {
                        $(".alert-error").find('span#error_msg').text('Puede probar nuevamente con otra búsqueda');
                        $(".alert-error").removeClass('invisible');
                    }
                    
                })
            }
        })
    }
);

