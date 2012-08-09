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
        
        can.Control("Home",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                if(options.user.perfil == 3){
                    this.element.html(can.view(url+'home/main.ejs'))
                    this.mostrar_barras({})
                }
               },
            'mostrar_barras':function(){
                var categories = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13',
                	'14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
                var dias = [];
                for(x=0; categories.length > x; x++){
                    dias[x] = [aleatorio(10, 300), aleatorio(50, 300), aleatorio(50, 200), aleatorio(10, 150)]
                }
                var subcategories = ['7:00 - 10:00', '10:00 - 13:00', '13:00 - 16:00', '16:00 - 19:00']
                var chart;
                var colors = Highcharts.getOptions().colors,
                    name = 'Dias',
                    data = $.map(categories,function(ite, index){
                        var c = colors[aleatorio(0,9)];
                        return {
                            y: dias[index][0] + dias[index][1] + dias[index][2] + dias[index][3], 
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
				chart: { renderTo: 'container_cantidad', type: 'column'},
				title: {text: 'Cantidad de autos estacionados mes de mayo'},
				subtitle: {text: 'Hacer click en cada columna y ver detalles por hora, hacer click nuevamente para volver'},
				xAxis: {categories: categories},
				yAxis: {title: {text: 'Cantidad de autos'}},
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
							s = 'Dia ' + this.x +' :<b>'+ this.y +' autos estacionados</b><br/>';
						if (point.drilldown) {
							s += 'Click para ver estacionados por horarios';
						} else {
							s += 'Click para ver estacionados por día';
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

