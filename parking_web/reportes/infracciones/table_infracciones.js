/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking_web/config.js')
.then(
    function(){
        
        can.Control("Table_infracciones",{
            defaults: {
                user: undefined,
                model: undefined,
                msg_total: undefined,
                recipe: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'reportes/autos_estacionados/tabla_autos_estacionados.ejs'));
                if(options.user != undefined && options.model != undefined)
                {
                    this.mostrar_tabla({muni_id: options.user.municipio, fecha: {mes: element.find('select#mes').val(), anio: element.find('select#anio').val()}});
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
                this.options.model.findAll(params,
                    function(resumen) {
                        $('table.cc tbody').html(can.view(url+self.options.recipe,resumen))
                        var cant = 0
                        $.each(resumen,function(index,resume) {
                            cant+= parseInt(resume.autos)
                        })
                        if(self.options.msg_total != undefined){
                            $('table.cc tbody tr:last td b').html(self.options.msg_total + ' ' + cant)
                        }
                    }, function(error){
                        console.log(error)
                        console.log('Error en la consulta...')
                    }
                )
            }
        })
    }
);

