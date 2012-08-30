/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(  'jquery/jquery.js',
        'can/control/control.js',
        'can/view/ejs',
        'sigma/common.js',
        './paginador.css')
.then( 
    function($){
        can.Control('Paginador',
        /** @Static */
        {
                defaults : {
                    toPaginate: undefined,
                    perPage: undefined,
                    maxIndex: undefined,
                    pageChangeEvent: undefined,
                    currentPage: 1,
                    count: 0
                }
        },
        /** @Prototype */
        {
                'init' : function(element , options){
                    if (isUndefined(options.toPaginate))
                        console.log('toPaginate no definido')
                    else 
                        this.createPaginador(element, options)
                },
                
                createPaginador: function(element, options) {
                    var pages = Math.ceil(options.count/options.perPage)
                    element.append('<div class="pagination"></div>')
                    element.find('.pagination').html(can.view('//sigma/paginador/view/init.ejs',{
                            numOfPages: pages,
                            maxIndex: options.maxIndex
                        }
                    ))
                    element.find('.pagination ul li.jumpTo:first').click()
                },
                
                rePaginate: function(options) {
                    var pages = Math.ceil(options.count/this.options.perPage)
                    this.element.find('.pagination').html(can.view('//sigma/paginador/view/init.ejs',{
                            numOfPages: pages,
                            maxIndex: this.options.maxIndex
                        }
                    ))
                    this.element.find('.pagination ul li.jumpTo:first').click()
                },
                
                getActive: function() {
                    return parseInt(this.element.find('.pagination ul li.active').text())
                },
                
                newActive: function(toActive) {
                    this.element.find('.pagination ul li.active').removeClass('active')
                    this.element.find('.pagination ul li').each(function(i,e){
                        if (parseInt($(e).text()) == toActive) $(e).addClass('active')
                    })
                    this.options.currentPage = toActive
                },

                getRows: function() {
                    return $(this.options.toPaginate)
                },

                getNumOfRows: function() {
                    return this.getRows().length
                },
                
                ".jumpTo:not('.active') click": function(e){
                    var toJumpTo = parseInt(e.text())
                    if (this.canJump(toJumpTo)) {
                        var perPage = this.options.perPage
                        var min = (toJumpTo-1)*perPage
                        var max = (toJumpTo-1)*perPage + perPage
                        this.jump(min,max,true)
                    }
                },

                ".jumpNext:not('.disabled') click": function(){
                    var next = this.getActive()+1
                    this.element.find('.pagination ul li.jumpTo[page="'+next+'"]').click()
                },

                ".jumpPrev:not('.disabled') click": function(e){
                    var prev = this.getActive()-1
                    this.element.find('.pagination ul li.jumpTo[page="'+prev+'"]').click()
                },

                ".jumpLast:not('.disabled') click": function() {
                    this.element.find('.pagination ul li.jumpTo:last').click()
                },

                ".jumpFirst:not('.disabled') click": function() {
                    this.element.find('.pagination ul li.jumpTo:first').click()
                },

                canJump: function(toJumpTo) {
                    var active = this.getActive()
                    var bool = false
                    if (active != toJumpTo) bool = true
                    return bool
                },

                jump: function(min,max,to) {
                    var toActive = (min/this.options.perPage) + 1
                    if (!isUndefined(this.options.pageChangeEvent))
                        can.trigger(this.element,this.options.pageChangeEvent,{
                            min: min,
                            max: max,
                            hiddenClass: 'paginated'
                        })
                    else
                        this.getRows().each(function(i,e){
                            if (i >= min && i < max) $(e).removeClass('paginated');
                            else $(e).addClass('paginated')
                        })
                    this.newActive(toActive)
                    this.disableEnableLI(toActive)
                    this.resolveMiddle(this.getActive())
                },
                
                disableEnableLI: function(toActive) {
                    var li = this.element.find('.pagination ul li[page="'+toActive+'"]')
                    if (li.next().hasClass('jumpNext'))
                        this.disableNext()
                    else
                        this.enableNext()
                    if (li.prev().hasClass('jumpPrev'))
                        this.disablePrev()
                    else
                        this.enablePrev()
                },

                nextIsDisabled: function() {
                    return this.element.find('.pagination ul li.jumpNext').hasClass('disabled')
                },

                prevIsDisabled: function() {
                    return this.element.find('.pagination ul li.jumpPrev').hasClass('disabled')
                },

                enableNext: function() {
                    if (this.nextIsDisabled()){
                        this.element.find('.pagination ul li.jumpNext').removeClass('disabled')
                        this.element.find('.pagination ul li.jumpLast').removeClass('disabled')    
                    }
                },

                enablePrev: function() {
                    if (this.prevIsDisabled()){
                        this.element.find('.pagination ul li.jumpPrev').removeClass('disabled')
                        this.element.find('.pagination ul li.jumpFirst').removeClass('disabled')  
                    }
                },

                disableNext: function() {
                    this.element.find('.pagination ul li.jumpNext').addClass('disabled')
                    this.element.find('.pagination ul li.jumpLast').addClass('disabled')
                },

                disablePrev: function() {
                    this.element.find('.pagination ul li.jumpPrev').addClass('disabled')
                    this.element.find('.pagination ul li.jumpFirst').addClass('disabled')
                },

                getLeftSide: function() {
                    var count = ((Math.floor(this.options.maxIndex/2)) - ((this.options.maxIndex % 2 == 0 ) ? 1 : 0))
                    var leftSide = new Array()
                    for (var i=0; i < count; i++) 
                        leftSide.push(parseInt($(this.element.find('.pagination ul li.jumpTo')[i]).attr('page')))
                    return leftSide
                },
            
                getRightSide: function() {
                    var count = (Math.floor(this.options.maxIndex/2))
                    var total = this.element.find('.pagination ul li.jumpTo').length
                    var rightSide = new Array()
                    for (var i=total; i > total-count; i--) 
                        rightSide.splice(0,0,parseInt($(this.element.find('.pagination ul li.jumpTo')[i-1]).attr('page')))
                    return rightSide
                },

                getLeftLimit: function() {
                    return getLast(this.getLeftSide())
                },
                
                getRightLimit: function() {
                    return getFirst(this.getRightSide())
                },

                isLimit: function(toActive) {
                    return (toActive <= this.getLeftLimit() || toActive >= this.getRightLimit())
                },

                toHide: function(e,min,max) {
                    return ($(e).attr('page') < min || $(e).attr('page') > max)
                },

                toggleLimits: function(min,max) {
                    var self = this
                    this.element.find('.pagination ul li.jumpTo').each(function(i,elem){
                        if (self.toHide(elem,min,max))
                            $(elem).hide()
                        else
                            $(elem).show()
                    })
                },
                
                resolveMiddle: function(toActive) {
                    var min,max
                    if (this.isLimit(toActive)) {
                        min = (this.getLeftSide().indexOf(toActive) > -1) ? 1 : (getLast(this.getRightSide()) - this.options.maxIndex + 1)
                        max = (this.getLeftSide().indexOf(toActive) > -1) ? this.options.maxIndex : getLast(this.getRightSide())
                    } else {
                        min = toActive - this.getLeftSide().length
                        max = toActive + this.getRightSide().length
                    }
                    this.toggleLimits(min,max)
                },
                
                // ALL GETTER
                
                get: function(string){
                    var toReturn
                    switch(string) {
                        case 'min':
                            toReturn = (this.options.currentPage-1)*this.options.perPage
                            break;
                        case 'max':
                            toReturn = (this.options.currentPage-1)*this.options.perPage + this.options.perPage
                            break;
                        case 'class':
                            toReturn = 'paginated'
                            break;
                        default:
                            console.log('Valor no definido')
                            break;
                    }
                    return toReturn
                }
        })
    }
)