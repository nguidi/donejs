/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(  'jquery/jquery.js',
        'can/control/control.js',
        'can/view/ejs',
        'sigma/paginador',
        'sigma/common.js',
        './tabla.css')
.then( 
    function($){
        /**
        * @class Oficios.Tabla
        */
        can.Control('Tabla',
        /** @Static */
        {
                defaults : {
                    model: undefined,
                    head : undefined,
                    row : undefined,
                    tableStyle: undefined,
                    tableClass: undefined,
                    tableId: undefined,
                    offset: undefined,
                    paginate: false,
                    select: false,
                    paginador: undefined
                }
        },
        /** @Prototype */
        {
                'init' : function(element , options){
                    if (isUndefined(options.model))
                        console.log('Modelo no definido')
                    else 
                        this.createTable(element, options)
                },
                
                createTable: function(element, options) {
                    options.model.findAll(
                        {
                            offset: options.offset
                        },
                        function(data){
                            element.html(can.view('view/plainTable'))
                            // compruebo si se paso o no una estilo
                            if (!isUndefined(options.tableStyle))
                                element.find('table').addClass(options.tableStyle)
                            
                            // compruebo si se paso o no una clase
                            if (!isUndefined(options.tableClass))
                                element.find('table').addClass('class',options.tableClass)
                            
                            // compruebo si se paso o no un identificador
                            if (!isUndefined(options.tableId))
                                element.find('table').attr('id',options.tableId)
                            
                            // compruebo si se suministro un template para el head, sino lo genero
                            if (isUndefined(options.head)) {
                                element.find('thead').html('<tr></tr>')
                                for (var attr in data[0]) 
                                    element.find('thead tr').append('<th>'+attr+'</th>')
                            } else
                                element.find('thead').html(can.view(options.head))
                            
                            // compruebo si se suministro un template para los rows, sino los genero
                            if (isUndefined(options.row)) {
                                $.each(data,function(index,rawData){
                                    element.find('tbody').append('<tr index='+index+'></tr>')
                                    for (var attr in rawData) 
                                        element.find('tbody tr[index="'+index+'"]').append('<td>'+rawData[attr]+'</td>')
                                })
                            } else
                                $.each(data,function(index,element){
                                    element.find('tbody').append(can.view(options.head,element[index]))     
                                })
                            if (options.paginate)
                                options.paginador = new Paginador(element,{
                                    toPaginate: options.paginate.toPaginate,
                                    perPage: options.paginate.perPage,
                                    maxIndex: options.paginate.maxIndex
                                })
                        },
                        function(){
                            console.log('Error en el findAll')
                        })
                }
        })

});