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
        
        can.Control("Graficas",{
            defaults: {
                data: undefined,
                type: undefined
            }
        },{
            'init': function( element , options ) {
                var data = this.options.data;
                if(data != undefined && this.options.type != undefined){
                    switch(this.options.type){
                        case 'columns': this.mostrar_barras(data); break;
                        case 'columns_horizontal': this.mostrar_barras_horizontales(data); break;
                    }
                }
             },
            'mostrar_barras':function(params){
                var categories = params.categories;
                var dias = params.data
                var subcategories = params.subcategories
                var chart;
                var colors = Highcharts.getOptions().colors,
                    name = params.name_x
                var data = $.map(categories,function(ite, index){
                        var c = colors[aleatorio(0,9)];
                        if(subcategories != undefined){
                            return { y: dias[index], color: c}
                        }
                        else {
                            return {
                                y: dias[index][0] + dias[index][1] + dias[index][2] + dias[index][3], 
                                color: c,
                                drilldown: { name: "Dia " + ite, categories: subcategories , data: dias[index], color: c }
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
                 var drill = (subcategories != undefined)?{ cursor: 'pointer', point: { events: { click: function() { var drilldown = this.drilldown;
                    if (drilldown) { setChart(drilldown.name, drilldown.categories, drilldown.data, drilldown.color);} else { setChart(name, categories, data);}
                 }}}}:{}
                 var column_options = $.extend(drill,
                        {dataLabels: {enabled: true,color: colors[0],style: { fontWeight: 'bold' },formatter: function() {return params.formato_adicional_barras + this.y;}}
                 })       
                        
			
			chart = new Highcharts.Chart({
				chart: { renderTo: params.element_html, type: 'column'},
				title: {text: params.titulo_general},
				subtitle: {text: params.subtitulo_general},
				xAxis: {categories: categories},
				yAxis: {title: { text:params.name_y } },
				plotOptions: {
					column: column_options
				},
				tooltip: {
					formatter: function() {
						var point = this.point,
							s = 'Dia ' + this.x +' :<b> '+ this.y +' estacionados</b><br/>';
						if (point.drilldown) {
							s += (params.texto_barras==undefined)?'':params.texto_barras;
						} else {
							s += (params.texto_barras_drilldown==undefined)?'':params.texto_barras_drilldown;
						}
						return s;
					}
				},
				series: [{name: name ,data: data}],
				exporting: {enabled: false}
			});
               },
               "mostrar_barras_horizontales": function(params){
                        var colors = Highcharts.getOptions().colors;
                        var data = $.map(params.categories,function(ite, index){
                            var c = colors[aleatorio(0,9)];
                            return {
                                y: params.data[index],
                                color: c
                            }
                        })
                        var chart;
                        $(document).ready(function() {
                            chart = new Highcharts.Chart({
                                chart: {
                                    renderTo: params.element_html,
                                    type: 'bar'
                                },
                                title: {
                                    text: params.titulo_general
                                },
                                legend: {
                                    enabled: false
                                },
                                subtitle: {
                                    text: params.subtitulo_general
                                },
                                xAxis: {
                                    categories: params.categories,
                                    title: {
                                        text: params.name_x
                                    }
                                },
                                yAxis: {
                                    min: 0,
                                    title: {
                                        text: params.name_y,
                                        align: 'high'
                                    }
                                },
                                tooltip: {
                                    formatter: function() {
                                        return params.formato_adicional_barras + this.y;
                                    }
                                },
                                plotOptions: {
                                    bar: {
                                        dataLabels: {
                                            enabled: true,
                                            formatter: function() {
                                                return params.formato_adicional_barras + this.y;
                                            }
                                        }
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                series: [{
                                    data: data
                                }]
                            });
                        });

               }
        })
    }
);

