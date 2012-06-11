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
                Recaudacion.findAll({muni_id: options.user.municipio, fecha: {mes: element.find('input#mes').val(), anio: element.find('input#anio').val()}},
                    function(resumen_cuenta) {
                        $('table.cc tbody').html(can.view(url+'reportes/recaudacion/recipe.ejs',resumen_cuenta))
                        var importeTotal = 0
                        $.each(resumen_cuenta,function(index,resumen) {
                            importeTotal+= parseInt((resumen.debcred != 1) ? resumen.importe : -1*resumen.importe)
                        })
                        $('table.cc tbody tr:last td b').html('RECAUDACION TOTAL : '+importeTotal)
                    }
                )
            }
        })
    }
);

