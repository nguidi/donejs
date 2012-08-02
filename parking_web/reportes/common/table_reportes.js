/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'sigma/paginador/paginador.js',
    'parking_web/config.js')
.then(
    function(){
        
        can.Control("Table_reportes",{
            defaults: {
                user: undefined,
                model: undefined,
                msg_total: undefined,
                recipe: undefined,
                parseResult: undefined,
                table_main: undefined
            }
        },{
            'init': function( element , options ) {
                if(options.table_main != undefined){
                    this.element.html(can.view(url+options.table_main));
                    if(options.user != undefined && options.model != undefined)
                    {
                        this.mostrar_tabla({muni_id: options.user.municipio, fecha: {mes: element.find('select#mes').val(), anio: element.find('select#anio').val()}});
                    }
                }
                else{
                    console.log("Error, archivos de tabla no encontrado")
                }
                
            },
            'select change': function(element){
                if(this.options.user != undefined && this.options.model != undefined)
                {
                    this.mostrar_tabla({muni_id: this.options.user.municipio, fecha: {mes: this.element.find('select#mes').val(), anio: this.element.find('select#anio').val()}});
                }
            },
            'mostrar_tabla': function(params){
                var self = this;
                $.when(this.options.model.findAll(params,
                    function(resumen) {
                        console.log(resumen)
                        $('table.cc tbody').html(can.view(url+self.options.recipe,resumen))
                        var cant = 0;
                        $.each(resumen,function(index,resume) {
                            if(self.options.parseResult == 'Float'){
                                cant+= parseFloat(resume.importe);
                            }
                            else if(self.options.parseResult == 'Int'){
                                cant+= parseInt(resume.autos);
                            }
                            else{
                                cant+= resume.autos;
                            }
                        })
                        if(self.options.parseResult == 'Float'){
                                cant = Math.round(cant);
                            }
                        if(self.options.msg_total != undefined){
                            $('table.cc tbody tr:last td b').html(self.options.msg_total + ' ' + cant)
                            $('table.cc tbody tr:last').addClass('unPaginated')
                        }
                    }, function(error){
                        console.log(error)
                        console.log('Error en la consulta...')
                    }
                )).then(function(obj){
                    var config = {
                            toPaginate: $('#tabla').find('tbody tr:not(.unPaginated)'),
                            perPage: 11,
                            maxIndex: 3,
                            count: obj.length
                        }
                    if(self.paginator == undefined){
                        self.paginator = new Paginador('#tabla',config);
                    }
                    else{
                        self.paginator.destroy();
                        self.element.find('.pagination').remove();
                        self.paginator = new Paginador('#tabla',config);
                    }
                });
                
            }
        })
    }
);

