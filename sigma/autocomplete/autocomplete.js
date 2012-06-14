/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'jquery/jquery.js',
    'can/control/control.js',
    'can/view/ejs',
    'sigma/common.js',
    './autocomplete.css',
    'jqueryui/ui/jquery.ui.core.js',
    'jqueryui/ui/jquery.ui.widget.js',
    'jqueryui/ui/jquery.ui.position.js',
    'jqueryui/ui/jquery.ui.menu.js',
    'jqueryui/ui/jquery.ui.autocomplete.js',
    'jqueryui/ui/jquery.ui.button.js')
.then(    
    'jqueryui/themes/base/jquery.ui.base.css',
    'jqueryui/themes/base/jquery.ui.theme.css',
    'jqueryui/themes/base/jquery.ui.autocomplete.css')
.then(
    function(){
        
        can.Control("Autocomplete",{
                defaults : {
                    model: false,
                    multiple: false,
                    unique: true,
                    combobox: false,
                    clean: false,
                    template: 'init',
                    dataList: undefined,
                    dependency: new Array(),
                    timer: 0,
                    timeToWait: 500,
                    onSelect: false,
                    onFocus: false,
                    onLostFocus: false,
                    onSearch: false,
                    onChange: false,
                    onRemove: false,
                    onFocusItem: false,
                    onOpenMenu: false,
                    onCloseMenu: false,
                    onCreateMenu: false,
                    category: '',
                    onEmptyMenu: false,
                    msgOnEmptyMenu: 'Sin Coincidencias',
                    selected: new Array(),
                    query: false
                }
            },{
                'init': function() {                
                    
                    var self=this;
            
                    self.createInstance()

                    if (this.options.dependency.length > 0) self.activeDependency()

                    $(this.element)
                        .autocomplete({
                            minLength: 0,
                            create: function() {
                                if (self.options.onCreateMenu) self.options.onCreateMenu()
                            },
                            source: function(request,response){
                                if (self.checkSelfDependency())
                                    self.setDefaultList(request,response)
                                else
                                    return new Array()
                            },
                            focus: function() {
                                if (self.options.onFocusItem) self.options.onFocusItem()
                                return false;
                            },
                            search: function() {
                                if (self.options.onSearch) self.options.onSearch()
                            },
                            open: function() {                    
                                if (self.options.onOpenMenu) self.options.onOpenMenu()
                            },
                            select: function(event,ui) {
                                self.insertItem(ui.item.label)
                                if(!self.options.multiple){
                                self.cleanInstances()
                                }
                                self.addInstance(ui.item)

                                if (self.options.onSelect) self.options.onSelect()

                                return false;                 
                            },
                            close: function() {
                                if (self.options.onCloseMenu) self.options.onCloseMenu()
                            },
                            change: function() {
                                if (self.options.onChange) self.options.onChange()
                            }
                        })
                        .bind({
                            keyup: function(event){ 
                                self.checkKeys(event)
                            },
                            focusin: function(ev){
                                if (self.options.onFocus) self.options.onFocus()
                            },
                            focusout: function(ev){
                                if (self.options.onLostFocus) self.options.onLostFocus()
                            }
                        })
                        .data("autocomplete")._renderMenu = function(ul,items) {
                            self.renderMenu(ul,items)
                        }

                    if (this.options.combobox){
                        $(this.element).after(can.view('views/'+'combobox',this.element.attr('id')))
                        self.bindShowList()
                    }

                    if (this.options.clean) {
                        $(this.element).after(can.view('views/'+'clean',this.element.attr('id')))
                        self.bindCleanAutocomplete()
                    }

                },

                checkSelfDependency: function() {
                    var bool = true
                    $.each(this.options.dependency,function(i,depend) {
                        if (!isUndefined(depend.bidirectional)) {
                            bool= true 
                            return false
                        }
                        else bool = false
                    })
                    return bool
                },

                hasItem: function(item) {

                    if (this.options.dataList.get(item.id).length == 0) 
                        return false
                    else 
                        return true
                },

                renderItem: function(ul,item,category) {

                    var self = this

                    var html = can.view('views/'+self.options.template,item)
                    
                    $(html).data('ui-autocomplete-item',item)

                    if(!isUndefined(item)) {
                        if (self.options.unique) {
                            if(!self.hasItem(item)) {
                                if (isUndefined(category))
                                    ul.append($(html))
                                else
                                    ul.find('li#'+category).after($(html))
                            } 
                        }
                        else {
                            if (isUndefined(category))
                                    ul.append($(html))
                            else
                                ul.find('li#'+category).after($(html))
                        }
                    }
                },

                renderMenu: function(ul,items) {
                    var self = this, currentCategory = ""
                    $.each( items, function( index, item ) {
                        if (self.options.dependency.length > 0 || self.options.category != '') {
                            if ( self.options.category == '' ) {
                                var depends = self.options.dependency, categories = new Array()
                                $.each(depends,function(i,depend){
                                    var dependCategory = depend.foreignAc.controller().getAll("label",depend.primaryKey,item[depend.foreignKey])
                                    $.merge(categories,dependCategory)
                                })
                                item["category"] = $.unique(categories).sort().join(", ")
                            }
                            var category = item.category.replace(/ /g,'').replace(/,/g,'')

                            if ( item.category != currentCategory && category.length>0 && ul.find('li#'+category).length == 0) {
                                ul.append( "<li class='ui-autocomplete-category' id='"+category+"'>>> " + item.category + "</li>" )
                                currentCategory = item.category           
                            }

                            if (item.category == "") 
                                self.renderItem( ul, item )
                            else {
                                self.renderItem( ul, item, category )
                            }
                        } else 
                            self.renderItem( ul, item )
                    })
                    if (ul.find('li').length > 0)
                        return ul.css('visibility','visible')
                    else
                        return ul.css('visibility','hidden')
                },

                insertItem: function(label) {
                    if (this.options.multiple) {
                        var terms, item
                        if (this.element.is('input')) {
                            terms = commaSplit( this.element.attr("value") );
                            item = label
                        }
                        if (this.element.is('div')) {
                            terms = commaSplit(this.element.html())
                            item = "<span>"+label+"</span>"
                        }                            
                        terms.pop();
                        terms.push(item);
                        terms.push("");
                        if (this.element.is('input')) {
                            this.element.attr("value",terms.join( ", " ));

                        } 
                        if (this.element.is('div')) {
                            this.element.html(terms+", ");
                        }   
                    } else {
                        if (this.element.is('input')) {
                            this.element.attr("value",label);
                        } 
                        if (this.element.is('div')) {
                            this.element.html(label);
                        }
                    }
                },

                bindCleanAutocomplete: function(){
                    var self = this
                    var id = this.element.attr('id')
                    $('button.clean#' + id).bind('click',function(){
                        self.cleanInstances();
                        self.element.val('');
                        self.element.focus();
                    })
                },

                bindShowList: function(){
                    var self = this
                    var id = this.element.attr('id')
                    $('button.combobox#' + id).bind('click',function(){
                        if (self.element.autocomplete("widget").is(":visible") ) {
                            self.element.autocomplete("close");
                            return;
                        }
                        $(this).blur();
                        self.element.autocomplete("search","");
                        self.element.focus();
                    })    
                },

                setDefaultList: function(request,response){
                    var self = this            
                    self.options.model.findAll(
                        self.getFilter(request),
                        function(items){
                            return response(items)
                        }
                    ),
                    extractLast(request.term)    
                },

                getFilter: function(request) {
                    var self = this
                    var filter, query = {term: extractLast(request.term)}
                    if (this.options.query) {
                        filter = true;
                        for (var attr in this.options.query) {
                            query[attr] = this.options.query[attr]
                        }
                    }
                    return {
                        filter: filter,
                        query: query
                    }
                },

                activeDependency: function(){
                    var self = this
                    $.each(self.options.dependency,function(i,acDepends){
                        self.listBinding(acDepends)
                        self.updateDependency(acDepends)    
                    })
                },

                listBinding: function(acDepends) {
                    var self = this
                    if (acDepends.bidirectional) {
                        var aAutocomplete = {
                            foreignAc: this.element,
                            foreignKey: acDepends.primaryKey,
                            primaryKey: acDepends.foreignKey,
                            bidirectional: acDepends.bidirectional
                        }
                        this.options.dataList.bind("add remove", function(ev, items) {
                        acDepends.foreignAc.controller().updateDependency(aAutocomplete)
                        self.updateQueries(ev.type,aAutocomplete,acDepends.foreignAc.controller().options.selected,items[0])
                        })
                    }
                    acDepends.foreignAc.controller().options.dataList.bind("add remove", function(ev, item){
                        self.updateDependency(acDepends)
                        acDepends.foreignAc.controller().updateQueries(ev.type,acDepends,self.options.selected,item[0])   
                })    
                },

                updateDependency: function(acDepends){
                    var toReturn, self = this

                    self.element.autocomplete("option","source",
                            function(request,response) {
                                self.options.model.findAll(
                                    self.getFilter(request),
                                    function(instances){
                                        if(self.options.selected.length==0){
                                            if (acDepends.bidirectional)
                                                toReturn = instances
                                            else {
                                                toReturn = new Array()
                                            }
                                        } else {
                                            toReturn = $.grep( instances, function(instance) {
                                                return self.isAQueryOf(self.options.selected,instance)
                                            }) 
                                        }
                                        return	response(toReturn);
                                    }
                                ),
                                extractLast(request.term)
                            }
                    )
                },

                isAQueryOf: function(queries,instance) {
                    var bool = new Array()
                    $.each(queries,function(i,query){
                        bool.push((instance[query.attr] == query.value) ? true : false)
                    })
                    return ($.unique(bool).length == 1 && bool[0] == true) ? true : false
                },

                updateQueries: function(type,ac,queryToUpdate,instance) {
                    var self = this
                    switch(type) {
                        case "add":
                            queryToUpdate.push({attr: ac.foreignKey, value: instance[ac.primaryKey]})
                            break;
                        case "remove":
                            queryToUpdate.splice(indexOfObject(queryToUpdate,{attr: ac.foreignKey, value: instance[ac.primaryKey]}),1)
                            break;
                    }
                },

                checkKeys: function(event){
                    var self = this

                    if((event.which == 46 || event.which == 8) && $(self.element).val().length==0){
                        self.cleanInstances()
                        self.element.autocomplete("search","");
                        self.element.focus();
                    }
                    else{
                        clearTimeout(self.options.timer);
                        self.options.timer = setTimeout(function(){
                            self.checkTerms()
                        },self.options.timeToWait)
                    }
                },

                checkTerms: function() {
                    var self = this
                    var value = commaSplit($(self.element).val())
                    var toRemove = self.options.dataList

                        $.each(value,function(i,label){
                            if (label.length) {
                                self.options.model.findOne(
                                    //consulta
                                    {name: label},
                                    //success
                                    function(el){
                                        if (!isEmptyArray(el)) {
                                            if ($.isPlainObject(el)) {
                                                self.addInstance(el)
                                            }    
                                        }
                                    },
                                    function(){
                                        console.log('FALLO EL CHECK TERMS')
                                    }
                                )
                                toRemove = $.grep(toRemove, function(i){
                                    return (i.label != $.trim(label))
                                })
                            }    
                        })
                        self.removeInstances(toRemove)
                },

                createInstance: function(){
                    this.options.dataList = new this.options.model.List()
                },

                cleanInstances: function() {
                    var self = this
                    $.each(this.options.dataList, function(i,instance){
                        self.removeInstance(instance)
                    })
                },

                addInstance: function(instance) {
                    if (this.options.dataList.get(instance.id).length == 0) {
                        this.options.dataList.push(instance)    
                    }
                    if (this.options.onSelect) this.options.onSelect()
                },

                removeInstances: function(toRemove) {
                    var self = this
                    $.each(toRemove,function(i,instance){
                        self.removeInstance(instance)
                        if (self.options.onRemove) self.options.onRemove()
                    })
                },

                removeInstance: function(instance){
                    this.options.dataList.remove(instance.id)
                },

                get: function(attrToGet) {
                    var elemToGet = ''
                    if(this.options.dataList.length){
                        elemToGet = this.options.dataList[0]
                        if (attrToGet) {
                            elemToGet = elemToGet[attrToGet]
                        } 
                    }
                    return elemToGet
                },

                getAll: function(attrToGet,attrToLookFor,valToCompare) {
                    var elemsToGet = new Array()
                    if(this.options.dataList.length){
                        $.each(this.options.dataList,function(i,elem) {
                            if (attrToLookFor && valToCompare) {
                                if (elem[attrToLookFor] == valToCompare) {
                                    if (attrToGet) {
                                        elemsToGet.push(elem[attrToGet])
                                    } else 
                                        elemsToGet.push(elem)    
                                }
                            } else {
                                if (attrToGet) {
                                    elemsToGet.push(elem[attrToGet])
                                } else 
                                    elemsToGet.push(elem)    
                            }
                        })
                    }
                    return elemsToGet
                },
                
                getSelected: function() {
                    return this.options.dataList
                }

            }
        )
        
    }
)