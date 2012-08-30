steal(
    'can/control/control.js',
    'can/view/ejs',
    'sigma/common.js',
    './countdown.css')
.then(
    function(){
        can.Control("Countdown",{
            defaults: {
                countFormat: ['Dias','Horas','Minutos','Segundos'],
                countdown: undefined,
                gradient: 55,
                left: 0,
                onTimeOut: function() {
                    console.log('Termino el Countdown')
                }
            }
        },{
            'init': function( element , options ) {   
                
                element.addClass('countdownHolder');
                
                $.each(options.countFormat,function(i){
                    element.append(can.view('//sigma/countdown/views//digit.ejs',this))
                    if ( this != 'Segundos')
                        element.append('<span class="countDiv countDiv'+i+'"></span>');
                }) 
                this.setSecLeft()
                this.tick()
            },
            
            updateCountdown: function(countdown) {
                this.options.countdown = countdown
                this.setSecLeft()
            },
            
            setSecLeft: function() {
                for (var attr in this.options.countdown) {
                    switch(attr) {
                        case 'horas':
                            this.options.left += this.options.countdown[attr]*(60*60)
                            break;
                        case 'minutos':
                            this.options.left += this.options.countdown[attr]*(60)
                            break;
                        case 'segundos':
                            this.options.left += this.options.countdown[attr]
                            break;
                    }
                }
            },
            
            tick: function(endTime) {
                var left, d, h, m, s, self = this
                                           
                left = this.options.left
                
                d = Math.floor(left / (24*60*60));
                if (this.has('Dias')) 
                    this.update('Dias',d);
                left -= d*(24*60*60);
                
                h = Math.floor(left / (60*60));
                if (this.has('Horas'))
                    this.update('Horas',h);
                left -= h*(60*60);
                
                m = Math.floor(left / 60);
                if (this.has('Minutos')) 
                    this.update('Minutos',m);
                left -= m*60;
                
                s = left;
                if (this.has('Segundos'))
                    this.update('Segundos',s)
                
                this.options.left -= 1
                
                if (h == 0 && m < 10) {
                    if ((this.options.left%5) == 0)
                        this.options.gradient = 55+((600-this.options.left)/5)
                    this.changeCSS(this.options.gradient)
                }               

                if (this.options.left < 0)
                    this.options.onTimeOut()
                else
                    setTimeout(function(){
                        self.tick()
                    }, 1000);
            },
            
            update: function(timeName, time) {
                var positions = this.element.find('span.count'+timeName+' .position')
                this.switchDigit(positions.eq(0),Math.floor(time/10)%10);
                this.switchDigit(positions.eq(1),time%10);
            },
            
            switchDigit: function(position,number){
		var digit = position.find('.digit')
		
		if(digit.is(':animated'))
			return false;
		
		if(position.data('digit') == number)
			return false;
		
		position.data('digit', number);
		
		var replacement = $('<span>',{
			'class':'digit',
			css:{
				top:'-2.1em',
				opacity:1
			},
			html:number
		});
		
		digit
                    .before(replacement)
                    .removeClass('static')
                    .animate({top:'2.5em', opacity: 0},'fast',function(){
                            digit.remove();
                    })

		replacement
                    .delay(100)
                    .animate({top:0,opacity: 1},'fast')
            },
            
            changeCSS: function(i) {
                $('.digit').css('background-color','rgb('+i+',0,0)')
            },
            
            has: function(time) {
                return (this.options.countFormat.indexOf(time) != -1) ? true : false
            }
        })
});