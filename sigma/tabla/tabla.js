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
                    offset: 0,
                    limit: 0,
                    paginate: undefined,
                    select: undefined,
                    paginador: undefined,
                    cached: undefined,
                    filter: undefined,
                    data: undefined
                }
        },
        /** @Prototype */
        {
                'init' : function(element , options){
                    if (isUndefined(options.model)){
                        console.log('Modelo no definido');
                        if(options.data != undefined){
                            this.createTable(element, options, options.data)
                        }
                    }
                    else 
                        this.fromModel(element, options)
                    var self = this
                    can.bind.call(this.element,'rowsUpdated',function(){
                        self.checkRowsDependencies()
                    })
                    can.bind.call(this.element,'checkPage',function(ev,object){
                        self.updateTable(object)
                    })
                    can.bind.call(this.element,'newFilter',function(ev,object){
                        self.filterTable(object)
                    })
                },
                
                fromModel: function(element, options){
                    var index, self = this;
                    options.model.findAll(
                        {
                            limit: options.limit,
                            offset: options.offset,
                            filter: options.filter
                        },
                        function(data){
                            self.createTable(element,options,data);
                        },
                        function(){
                            console.log('Error en el findAll')
                        })
                    
                },
                
                createTable: function(element, options, data) {
                    element.html(can.view('//sigma/tabla/view/plainTable'))
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
                        for (var attr in data.items[0]) 
                            element.find('thead tr').append('<th>'+attr+'</th>')
                    } else
                        element.find('thead').html(can.view(options.head))

                    // compruebo si se suministro un template para los rows, sino los genero
                    this.addRows(data)
                    options.cached = [options.offset,options.offset+data.items.length-1]

                    // compruebo si debo agregar un paginador
                    if (!isUndefined(options.paginate))
                        options.paginador = new Paginador(element,{
                            toPaginate: element.find('tbody tr:not(".filtered")'),
                            perPage: options.paginate.perPage,
                            maxIndex: options.paginate.maxIndex,
                            count: data.count,
                            pageChangeEvent: 'checkPage'
                        })
                },                
                
                updateTable: function(object,newFilter) {
                    var self = this
                    var min = object.min
                    var max = object.max
                    var newOffset = min - Math.floor((self.options.limit-(max-min))/2)
                    this.options.offset = (newOffset < 0) ? 0 : newOffset
                    if (this.options.cached[0] <= min && this.options.cached[1] >= max && !newFilter)
                        this.addClassToTr(min,max,object.hiddenClass)
                    else {
                        this.options.model.findAll({
                            offset: this.options.offset,
                            limit: self.options.limit,
                            filtro: self.options.filter
                        },
                        function(data){
                            self.addRows(data)
                            self.checkRowsDependencies(object)
                            if (newFilter)
                                self.options.paginador.rePaginate({count: data.count})
                            self.options.cached = [self.options.offset,self.options.offset+data.items.length-1]
                        },
                        function(){
                            console.log('Error en el findAll con nueva offset')
                        })
                    }
                        
                },
                
                filterTable: function(object) {
                    this.updateFilter(object.path)
                    this.updateTable({
                        min: 0,
                        max: this.options.paginate.perPage,
                        hiddenClass: "paginated"
                    },true)
                },
                
                isCompare: function(type) {
                    return (type == 'igual' || type == 'menor' || type == 'mayor') ? true : false
                },
                
                updateFilter: function(path){
                    var self = this
                    var filter= new Object()
                    $.each(path,function(i,elem){
                        if (!isUndefined(elem.field))
                            filter['campo'] = elem.field
                        if (self.isCompare(elem.type))
                            filter['comparar'] = elem.type
                        filter['valor'] = elem.value
                    })
                    self.addFilter(filter)
                },
            
                addFilter: function(nuevoFiltro) {
                    var bool = true
                    var self = this
                    if (isUndefined(this.options.filter))
                        this.options.filter = new Array(nuevoFiltro)
                    else {
                        $.each(this.options.filter,function(i,filtro){
                            if (filtro.campo == nuevoFiltro.campo) {
                                bool = false
                                self.options.filter.splice(i,1)
                                return false
                            }
                        })
                        this.options.filter.push(nuevoFiltro)  
                    }
                },
                            
                addRows: function(data) {
                    var self = this
                    self.element.find('tbody').empty()
                    if (isUndefined(self.options.row)) {
                        $.each(data.items,function(index,rawData) {
                            var i = index + self.options.offset
                            self.element.find('tbody').append('<tr index='+i+'></tr>')
                            for (var attr in rawData) 
                                self.element.find('tbody tr[index="'+i+'"]').append('<td>'+rawData[attr]+'</td>')
                        })
                    } else
                        $.each(data.items,function(index,element){
                            var i = index + self.options.offset
                            self.element.find('tbody').append(can.view(self.options.row,element))
                            self.element.find('tbody tr:last').attr('index',i)
                        })
                },
            
                checkRowsDependencies: function(object) {
                    if (!isUndefined(this.options.paginate)) {
                         this.addClassToTr(object.min,object.max,object.hiddenClass)
                    }
                },
            
                addClassToTr: function(min,max,trClass) {
                    this.element.find('table tbody tr').each(function(i,e){
                        if (parseInt($(e).attr('index')) >= min && parseInt($(e).attr('index')) < max) 
                            $(e).removeClass(trClass)
                        else 
                            $(e).addClass(trClass)
                    })
                }
        })

});