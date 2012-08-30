/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(
    'can/control/control.js',
    'can/route/route.js',
    'can/view/ejs',
    'sigma/common.js')
.then(
    function(){
        
        can.Control("Mobile_Route",{
            defaults: {
                mainPage: undefined,
                history: new Array
            }
        },{
            'init': function( element , options ) {
                console.log('Mobile Route Initialized')
                
            },
            
            handleHash: function(hpos) {
                can.route.attr({hh: hpos}, true)
            },
            
            '{can.route} change': function(el, ev, attr, how, newVal, oldVal) {
                var changePage = this.updateHistory(newVal,oldVal)
                console.log(ev.batchNum, attr, how, newVal, oldVal)
                if (isUndefined(can.route.attr().hh))
                    $.mobile.changePage($(this.options.mainPage))
                else 
                    if (changePage) $.mobile.changePage($(newVal))
            },
            
            updateHistory: function(newVal,oldVal) {
                this.options.history.push(newVal)
            }
            
            /*
            'route': function() {
                console.log('empty')
            },
            
            '/:type route': function(data) {
                console.log(data.type)
            },
                        
            'body pagebeforechange': function(element,event,cp_options) {
                console.log('before')
            },
            
            'body pagecreate': function() {
                console.log('create')
            },
            
            'body pagechange': function(element,event,cp_options) {
                console.log('Page Changed')
            },
            
            'body pagechangefailed': function(element,event,cp_options) {
            }
            */
        })
    }
);