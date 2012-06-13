/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function aleatorio(inferior,superior){ 
	var numPosibilidades = superior - inferior;
	var aleat = Math.random() * numPosibilidades; 
	aleat = Math.round(aleat);
	return parseInt(inferior) + aleat; 
} 

steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking_web/config.js',
    'highcharts/js/highcharts.js')
.then(
    function(){
        
        can.Control("Grafica_recaudacion_web",{
            defaults: {
                user: undefined,
                model: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'reportes/recaudacion/graf_recaudacion.ejs'))
                var self = this;
                var mes = 1//document.find('select#mes').val();
                var anio = 2012//document.find('select#anio').val();
                this.options.model.findAll({muni_id: options.user.municipio, fecha: {mes: mes, anio: anio}}).then(function(obj){
                    self.mostrar_barras({categories: $.map(obj,function(it){ return it.fecha}),
                                    subcategories: ['7:00 - 10:00', '10:00 - 13:00', '13:00 - 16:00', '16:00 - 19:00'],
                                    data: $.map(obj,function(it){ return it.importe}),
                                    name_x: 'Dias',
                                    element_html: 'grafica_rec',
                                    titulo_general: 'Recaudación correspondiente al mes '+ array_mes[mes] +' del año '+ anio,
                                    subtitulo_general: 'Hacer click en cada columna y ver detalles por hora, hacer click nuevamente para volver',
                                    name_y: {text: 'Cantidad de dinero'}})
                })
                
            },
            'mostrar_barras':function(params){
                var categories = params.categories;
                var dias = params.data
                var subcategories = params.subcategories
                var chart;
                var colors = Highcharts.getOptions().colors,
                    name = params.name_x,
                    data = $.map(categories,function(ite, index){
                        var c = colors[aleatorio(0,9)];
                        return {
                            y: dias[index],//dias[index][0] + dias[index][1] + dias[index][2] + dias[index][3], 
                            color: c,
                            drilldown: {
				name: "Dia " + ite,
				categories: subcategories ,
				data: dias[index],
				color: c
                            }
			}
                    })
			
                    function setChart(name, categories, data, color) {
				chart.xAxis[0].setCategories(categories);
				chart.series[0].remove();
				chart.addSeries({
					name: name,
					data: data,
					color: color || 'white'
				});
			}
			
			chart = new Highcharts.Chart({
				chart: { renderTo: params.element_html, type: 'column'},
				title: {text: params.titulo_general},
				subtitle: {text: params.subtitulo_general},
				xAxis: {categories: categories},
				yAxis: {title: params.name_y},
				plotOptions: {
					column: {
						cursor: 'pointer',
						point: {
							events: {
								click: function() {
									var drilldown = this.drilldown;
									if (drilldown) { // drill down
										setChart(drilldown.name, drilldown.categories, drilldown.data, drilldown.color);
									} else { // restore
										setChart(name, categories, data);
									}
								}
							}
						},
						dataLabels: {enabled: true,color: colors[0],style: { fontWeight: 'bold' },formatter: function() {return this.y;}}
					}
				},
				tooltip: {
					formatter: function() {
						var point = this.point,
							s = 'Dia ' + this.x +' :<b> $'+ this.y +' recaudados</b><br/>';
						if (point.drilldown) {
							s += 'Click para ver lo recaudado por horarios';
						} else {
							s += 'Click para ver lo recaudado por día';
						}
						return s;
					}
				},
				series: [{name: name ,data: data}],
				exporting: {enabled: false}
			});
               }
        })
    }
);

