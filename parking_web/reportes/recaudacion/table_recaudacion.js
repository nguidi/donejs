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
        
        can.Control("Table_recaudacion_web",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'reportes/recaudacion/tabla_recaudacion.ejs'))
                this.mostrar_tabla({muni_id: options.user.municipio, fecha: {mes: element.find('select#mes').val(), anio: element.find('select#anio').val()}});
            },
            'select change': function(element){
                /*console.log(element.val());
                console.log(element.attr('id'));*/
                this.mostrar_tabla({muni_id: this.options.user.municipio, fecha: {mes: this.element.find('select#mes').val(), anio: this.element.find('select#anio').val()}});
            },
            'mostrar_tabla': function(params){
                Recaudacion.findAll(params,
                    function(resumen_cuenta) {
                        $('table.cc tbody').html(can.view(url+'reportes/recaudacion/recipe.ejs',resumen_cuenta))
                        var importeTotal = 0
                        $.each(resumen_cuenta,function(index,resumen) {
                            importeTotal+= parseFloat(resumen.importe)
                        })
                        $('table.cc tbody tr:last td b').html('RECAUDACION TOTAL : $'+importeTotal)
                    }
                )
            }
        })
    }
);

