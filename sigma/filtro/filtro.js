/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/view/ejs',
    'sigma/common.js',
    'sigma/filtro/filtro.css')
.then(
    function(){
        
        can.Control("Filtro",{
            defaults: {
                filterType: '',
                customView: '',
                filterData: new Array(),
                filterPath: new Array(),
                filterFunction: function(path){
                    console.log('Funcion por defecto')
                    console.log(path)
                }
            }
        },{
            'init': function( element , options ) {
                if (options.filterType == 'cascada'){
                    element.html(can.view('view/cascada/mainMenu.ejs'))
                    this.insertCascada(0,options.filterData,'mainmenu')
                } 
                else {
                    element.html(can.view('view/init.ejs',stringToRE(options.filterType)))
                    this.insert(options.filterType,options.filterData)
                    element.append(can.view('view/buscar.ejs'))  
                }
            },
            
            insertCascada: function(level,filterData,from) {
                var element = this.element.find('div[filter-level="'+level+'"] div[from="'+stringToRE(from)+'"]')
                $.each(filterData, function(i , filter ) {
                    element.append(can.view('view/cascada/menuOptions.ejs',{
                        menu_option: filter.title,
                        field: isUndefined(filter.value) ? '' : filter.value
                    }))
                })
            },
            
            insert: function(elemClass,filterData) {
                var self = this
                $.each(filterData,function(index,filter){
                    //self.element.append(can.view('view/'+elemClass+'.ejs'))
                    self.element.find('div.'+stringToRE(elemClass)+':last')
                        .append(
                            can.view('view/label.ejs'),
                            {
                                label: filter.label
                            }
                        )
                        .append(
                            can.view('view/'+filter.type+'.ejs'),
                            {
                                label: filter.label,
                                value: filter.value,
                                data: filter.selectOptions
                            }
                        )
                })
            },

            add: function(options) {
                var fromArray
                var self = this
                if ($.isArray(options.from))
                    fromArray = options.from
                else
                    fromArray = new Array(options.from)
                $.each(fromArray,function(i, from){
                    var level = self.getLevelFrom(from) + 1, compareLevel
                    self.addFilterLevel(level)
                    self.addFilterFrom(level,from)
                    if (options.type == 'menu') 
                        self.insertCascada(level,options.filterData,from)
                    else {
                        if (options.type == 'autocomplete' || options.type == 'input')
                            self.element.find('div[filter-level="'+level+'"] div[from="'+stringToRE(from)+'"]')
                                .append(can.view('view/input.ejs'))
                        else {
                            self.element.find('div[filter-level="'+level+'"] div[from="'+stringToRE(from)+'"]')
                                    .append(can.view('view/cascada/'+options.type+'.ejs'))
                            if (options.type == 'compare'){
                                compareLevel = level + 1
                                self.addFilterLevel(compareLevel)
                                self.addFilterFrom(compareLevel,from)
                                self.element.find('div[filter-level="'+compareLevel+'"] div[from="'+stringToRE(from)+'"]')
                                    .append(can.view('view/input.ejs'))
                            }
                        }
                    }    
                })
            },

            addFilterLevel: function(level) {
                if (this.element.find('div[filter-level="'+level+'"]').length == 0)
                    this.element.append(can.view('view/cascada/filterLevel.ejs',{
                        filter_level: level
                    }))
            },
            
            addFilterFrom: function(level,from) {
                if (this.element.find('div[filter-level="'+level+'"] div[from="'+stringToRE(from)+'"]').length == 0)
                    this.element.find('div[filter-level="'+level+'"]').append(can.view('view/cascada/from.ejs',{
                        from: stringToRE(from)
                    }))
            },

            getLevel: function(element) {
                if (this.element.filterType == 'cascada')
                    return parseInt(element.parents('div.filterLevel').attr('filter-level')) 
                else
                    return 0
            },

            getFrom: function(element) {
                return element.parent('div.filterOptions').attr('from')  
            },

            getLevelFrom: function(from) {
                var element
                this.element.find('div.filterOption:contains("'+from+'")').each(function(i,match){
                    if ($.trim($(match).text()) === from) 
                        element = match      
                })
                return parseInt($(element).parents('div.filterLevel').attr('filter-level'))
            },
            
            getOption: function(option) {
                return this.options[option]
            },
            
            getFilterType: function(element) {
                var type
                switch(element.attr('filter-type')) {
                    case 'si': 
                        type = true
                        break;
                    case 'no':
                        type = false
                        break;
                    default:
                        type = element.attr('filter-type')
                        break
                }
                return type
            },
            
            getFilterObject: function(element) {
                return {
                    level: this.getLevel(element),
                    type: this.getFilterType(element),
                    value: (element.is('input')) ? element.val() : $.trim(element.text()),
                    field: (element.attr('filter-field') == "" || isUndefined(element.attr('filter-field'))) ? undefined : element.attr('filter-field')
                }
            },
            
            indexOfCurrentLevel: function(level) {
                var index = -1
                $.each(this.options.filterPath,function(i,elem) {
                    var bool = new Array()
                    if (elem.level == level)
                        index = i
                    if (index >= 0)
                        return false
                })
                return index
            },
            
            updateFilterPath: function(element) {
                var index = (this.indexOfCurrentLevel(this.getLevel(element)) == -1) ? this.options.filterPath.length : this.indexOfCurrentLevel(this.getLevel(element)) 
                var restOfItems = this.options.filterPath.length - index
                this.options.filterPath
                    .splice(
                        index,
                        restOfItems,
                        this.getFilterObject(element)
                    )
            },
            
            'div.filterOption click': function(element) {
                if (element.hasClass('chosenOne')) {
                    this.hideFrom(element) 
                }else {
                    this.hideRestOfIt(element)
                    this.showFrom(element)
                    this.updateFilterPath(element)
                }
            },
            
            hideRestOfIt: function(element) {
                var level = this.getLevelFrom($.trim(element.text()))
                this.element.find('div.filterLevel:not(div[filter-level="'+level+'"])').each(function(i,filter){
                    if (parseInt($(filter).attr('filter-level')) > level)
                        $(filter).find('div.filterOptions:visible').each(function(j,e){
                            $(e).css('display','none').find('div.chosenOne').removeClass('chosenOne')
                        })
                })
            },
            
            showFrom: function(element) {
                element.parent().find('div.chosenOne').removeClass('chosenOne')
                element.addClass('chosenOne')
                var level = this.getLevelFrom($.trim(element.text()))+1
                this.element.find('div[filter-level="'+level+'"] div[from="'+stringToRE(element.text())+'"]').css('display','block')
            },
            
            hideFrom: function(element) {
                element.removeClass('chosenOne')
                var level = this.getLevelFrom($.trim(element.text()))+1
                this.element.find('div[filter-level="'+level+'"] div[from="'+stringToRE(element.text())+'"]').css('display','none').find('div.chosenOne').removeClass('chosenOne')
            },
            
            'div.filterOption[filter-type="si"], div.filterOption[filter-type="no"] click': function(element) {
                this.options.filterFunction(this.options.filterPath)
            },
            
            'div.filterOption[filter-type="igual"], div.filterOption[filter-type="menor"], div.filterOption[filter-type="mayor"] click': function(element) {
                var level = this.getLevel(element)+1
                this.element.find('div[filter-level="'+level+'"] div[from="'+this.getFrom(element)+'"]').css('display','block')
            },
            
            'input[filter-type="input"] keyup': function(element,event){
                if (event.keyCode == 13 && this.options.filterType == 'cascada') {
                    this.updateFilterPath(element)
                    this.options.filterFunction(this.options.filterPath)
                }
            },
        
            'button.filtrar click': function() {
                var self = this
                this.element.find('input, select').each(function(i,filter) {
                    self.updateFilterPath(filter)
                })
                console.log(this.options.filterPath)
            }
        }
    )}
);