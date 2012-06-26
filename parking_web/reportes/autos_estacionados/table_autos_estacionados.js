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
        
        can.Control("Table_autos_estacionados",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'reportes/autos_estacionados/tabla_autos_estacionados.ejs'))
                this.mostrar_tabla({muni_id: options.user.municipio, fecha: {mes: element.find('select#mes').val(), anio: element.find('select#anio').val()}});
            },
            'select change': function(element){
                this.mostrar_tabla({muni_id: this.options.user.municipio, fecha: {mes: this.element.find('select#mes').val(), anio: this.element.find('select#anio').val()}});
            },
            'mostrar_tabla': function(params){
                Recaudacion.findAll(params,
                    function(resumen) {
                        $('table.cc tbody').html(can.view(url+'reportes/autos_estacionados/recipe.ejs',resumen))
                        var cantAutos = 0
                        $.each(resumen,function(index,resume) {
                            cantAutos+= parseInt(resume.autos)
                        })
                        $('table.cc tbody tr:last td b').html('CANTIDAD TOTAL DE AUTOS: ' + cantAutos)
                    }
                )
            }
        })
    }
);

