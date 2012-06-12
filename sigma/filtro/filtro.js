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
                filterData: new Array(),
                filterPath: new Array()
            }
        },{
            'init': function( element , options ) {
                element.html(can.view('view/mainMenu.ejs'))
                this.insert(0,options.filterData,'mainmenu')
            },
            
            insert: function(level,filterData,from) {
                var element = this.element.find('div[filter-level="'+level+'"] div[from="'+stringToRE(from)+'"]')
                $.each(filterData, function(i , filter ) {
                    element.append(can.view('view/menuOptions.ejs',{
                        menu_option: filter
                    }))
                })
            },
            
            add: function(options) {
                var fromArray
                var self = this
                if (!$.isArray(options.from))
                    fromArray = new Array(options.from)
                else
                    fromArray = options.from
                $.each(fromArray,function(i, from){
                    var level = self.getLevelFrom(from) + 1, compareLevel
                    self.addFilterLevel(level)
                    self.addFilterFrom(level,from)
                    if (options.type == 'menu') 
                        self.insert(level,options.filterData,from)
                    else {
                        if (options.type == 'autocomplete')
                            self.element.find('div[filter-level="'+level+'"] div[from="'+stringToRE(from)+'"]')
                                .append(can.view('view/input.ejs'))
                        else {
                            self.element.find('div[filter-level="'+level+'"] div[from="'+stringToRE(from)+'"]')
                                    .append(can.view('view/'+options.type+'.ejs'))
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
                    this.element.append(can.view('view/filterLevel.ejs',{
                        filter_level: level
                    }))
            },
            
            addFilterFrom: function(level,from) {
                if (this.element.find('div[filter-level="'+level+'"] div[from="'+stringToRE(from)+'"]').length == 0)
                    this.element.find('div[filter-level="'+level+'"]').append(can.view('view/from.ejs',{
                        from: stringToRE(from)
                    }))
            },

            getLevel: function(element) {
                return parseInt(element.parents('div.filterLevel').attr('filter-level')) 
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
            
            'div.filterOption click': function(element) {
                if (element.hasClass('chosenOne')) 
                    this.hideFrom(element) 
                else {
                    this.hideRestOfIt(element)
                    this.showFrom(element)
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
                console.log($.trim(element.text()))
            },
            
            'div.filterOption[filter-type="igual"], div.filterOption[filter-type="menor"], div.filterOption[filter-type="mayor"] click': function(element) {
                console.log(this.getFrom(element))
                var level = this.getLevel(element)+1
                console.log(level)
                this.element.find('div[filter-level="'+level+'"] div[from="'+this.getFrom(element)+'"]').css('display','block')
            }
        })
    }
);