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
                filterData: new Array()
            }
        },{
            'init': function( element , options ) {
                console.log('Filtro Initialized')
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
                var level = this.getLevelFrom(options.from) + 1
                if (this.element.find('div[filter-level="'+level+'"]').length == 0)
                    this.element.append(can.view('view/filterLevel.ejs',{
                        filter_level: level
                    }))
                if (this.element.find('div[filter-level="'+level+'"] div[from="'+options.from+'"]').length == 0)
                    this.element.find('div[filter-level="'+level+'"]').append(can.view('view/from.ejs',{
                        from: stringToRE(options.from)
                    }))
                if (options.type == 'menu')
                    this.insert(level,options.filterData,options.from)
                else 
                    this.element.find('div[filter-level="'+level+'"]')
                        .append(can.view('views/'+options.type+'.ejs',options.filterData))
            },

            getLevelFrom: function(from) {
                return parseInt(this.element.find('div.filterOption:contains("'+from+'")')
                    .parents('div.filterLevel').attr('filter-level'))
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
                var level = this.getLevelFrom(element.text())
                this.element.find('div.filterLevel:not(div[filter-level="'+level+'"])').each(function(i,filter){
                    if (parseInt($(filter).attr('filter-level')) > level)
                        $(filter).find('div.filterOptions:visible').each(function(j,e){
                            $(e).css('display','none').find('div.chosenOne').removeClass('chosenOne')
                        })
                    
                })
            },
            
            showFrom: function(element) {
                element.addClass('chosenOne')
                var level = this.getLevelFrom(element.text())+1
                this.element.find('div[filter-level="'+level+'"] div[from="'+stringToRE(element.text())+'"]').css('display','block')
            },
            
            hideFrom: function(element) {
                element.removeClass('chosenOne')
                var level = this.getLevelFrom(element.text())+1
                this.element.find('div[filter-level="'+level+'"] div[from="'+stringToRE(element.text())+'"]').css('display','none')
            }
        })
    }
);