/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking_web/config.js',
    'highcharts/js/highcharts.js',
    'parking_web/graficas/graficas.js')
.then(
    function(){
        
        can.Control("Grafica_autos_estacionados",{
            defaults: {
                user: undefined,
                model: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'reportes/common/graf_reportes.ejs'))
                var mes = 1//document.find('select#mes').val();
                var anio = 2011//document.find('select#anio').val();
                this.mostrar_grafica({muni_id: this.options.user.municipio, data:{fecha: {mes: mes, anio: anio}}});
                var self = this;
                this.element.parents().find('select').bind('change', function(){
                    if($(this).attr('id') == 'mes') mes = $(this).val();
                    else anio = $(this).val()
                    self.mostrar_grafica({muni_id: self.options.user.municipio, data:{fecha: {mes: mes, anio: anio}}});
                })
            },
            'mostrar_grafica': function(params){
                this.options.model.findAll(params).then(function(obj){
                    new Graficas('#grafica_est',
                        {data:{categories: $.map(obj,function(it){ return it.fecha.substring(0,it.fecha.search('/'))}),
                            //subcategories: ['7:00 - 10:00', '10:00 - 13:00', '13:00 - 16:00', '16:00 - 19:00'],
                            data: $.map(obj,function(it){ return it.autos}),
                            name_x: 'Dias',
                            element_html: 'grafica_est',
                            titulo_general: 'Cantidad de autos estacionados correspondiente al mes '+ array_mes[params.data.fecha.mes] +' del año '+ params.data.fecha.anio,
                            subtitulo_general: '',
                            name_y: 'Cantidad de autos'
                            },
                        type: 'columns'})
                });
            }
        })
    }
);

