steal(
    'can/control/control.js',
    'can/view/ejs',
    'sigma/common.js')
.then(
    function(){
        can.Control("Parquimetro",{
            defaults: {
                minmax: 0,
                restmin: 0
            }
        },{
            'init': function( element , options ) {   
                
                this.drawParquimetro()
                
                this.drawCircle()
                
                this.drawAguja(options.restmin,options.minmax)
                
                //this.drawMarkers(options.minmax)
                
            },
            
            drawParquimetro: function(mins) {
                var self = this
                var canvas = document.getElementById('example');
                var context = canvas.getContext('2d');
                // ************ Afuera
                context.beginPath();
                context.arc(150, 150, 138, 0, Math.PI, true);
                context.lineWidth = 7;
                context.strokeStyle = "black";
                context.stroke();
                // ************ Dentro
                // Bien
                context.beginPath();
                context.arc(150, 150, 103, 1.2*Math.PI, 0, false);
                context.lineWidth = 5;
                context.strokeStyle = "green";
                context.stroke();
                // Peligro
                context.beginPath();
                context.arc(150, 150, 103, Math.PI, 1.2*Math.PI, false);
                context.lineWidth = 5;
                context.strokeStyle = "red";
                context.stroke();
                // Base
                context.beginPath();
                context.arc(150, 150, 100, 0, Math.PI, true);
                context.lineWidth = 1;
                context.strokeStyle = "black";
                context.stroke();
                // Minutos
                context.translate(150,150);
                for (var i=0;i<=Math.PI;i = i+(Math.PI/60)) {
                    var op=Math.sin(i)*(-105);
                    var ad=Math.cos(i)*105;
                    var exop = Math.sin(i)*(-120);
                    var exad = Math.cos(i)*120;
                    context.lineWidth=2;
                    context.beginPath();
                    context.moveTo(ad,op);
                    context.lineTo(exad,exop);
                    context.stroke();
                }
            },
            
            drawCircle: function() {
                var canvas = document.getElementById('example');
                var context = canvas.getContext('2d');
                context.beginPath();
                context.arc(0, 0, 20, 0, 2*Math.PI, false);
                context.closePath();
                context.lineWidth = 5;
                context.fillStyle = "grey";
                context.fill();
                context.strokeStyle = "black";
                context.stroke();
            },
            
            drawAguja: function(restmin,minmax){
                var canvas = document.getElementById('example');
                var context = canvas.getContext('2d');
                var i = -((restmin*60)/minmax)*(Math.PI/60)
                var exop = Math.sin(i)*130;
                var exad = -Math.cos(i)*130;
                context.lineWidth=5;
                context.beginPath();
                context.moveTo(0,0);
                context.lineTo(exad,exop);
                context.lineCap = "round";
                context.stroke();
            },
            
            drawMarkers: function(minmax){
                var canvas = document.getElementById('example');
                var context = canvas.getContext('2d');
                var minval = minmax, time = Math.floor(minmax/5), ang = 0, x = 0, y = 0
                context.font="20px Georgia";
                context.translate(150,150);
                for (var i=0;i<6;i++) {
                    ang = ang+(Math.PI/5)
                    minval = minmax-(i*time)
                    x = Math.sin(ang)*150;
                    y = -Math.cos(ang)*150;
                    console.log(i,minval+' Min',ang,x,y)
                    context.fillText(minval+' Min',x,y);
                    context.stroke();
                }
            }
            
//            draw: function() {
//                var self = this
//                var canvas = document.getElementById('example');
//                if (canvas.getContext) {
//                    var c2d=canvas.getContext('2d');
//                    c2d.clearRect(0,0,300,300);
//                    //Define gradients for 3D / shadow effect
//                    var grad1=c2d.createLinearGradient(0,0,300,300);
//                    grad1.addColorStop(0,"#D83040");
//                    var grad2=c2d.createLinearGradient(0,0,300,300);
//                    c2d.font="Bold 20px Arial";
//                    c2d.textBaseline="middle";
//                    c2d.textAlign="center";
//                    c2d.lineWidth=1;
//                    c2d.save();
//                    //Outer bezel
//                    c2d.strokeStyle=grad1;
//                    c2d.lineWidth=10;
//                    c2d.beginPath();
//                    c2d.arc(150,150,138,0,Math.PI*2,true);
//                    c2d.shadowOffsetX=4;
//                    c2d.shadowOffsetY=4;
//                    c2d.shadowColor="rgba(0,0,0,0.6)";
//                    c2d.shadowBlur=6;
//                    c2d.stroke();
//                    //Inner bezel
//                    c2d.restore();
//                    c2d.strokeStyle=grad2;
//                    c2d.lineWidth=10;
//                    c2d.beginPath();
//                    c2d.arc(150,150,129,0,Math.PI*2,true);
//                    c2d.stroke();
//                    c2d.strokeStyle="#222";
//                    c2d.save();
//                    c2d.translate(150,150);
//                    //Markings/Numerals
//                    for (i=1;i<=60;i++) {
//                        ang=Math.PI/30*i;
//                        sang=Math.sin(ang);
//                        cang=Math.cos(ang);
//                        //If modulus of divide by 5 is zero then draw an hour marker/numeral
//                        if (i % 5 == 0) {
//                            c2d.lineWidth=8;
//                            sx=sang*95;
//                            sy=cang*-95;
//                            ex=sang*120;
//                            ey=cang*-120;
//                            nx=sang*80;
//                            ny=cang*-80;
//                            c2d.fillText(i/5,nx,ny);
//                            //Else this is a minute marker
//                        } else {
//                            c2d.lineWidth=2;
//                            sx=sang*110;
//                            sy=cang*110;
//                            ex=sang*120;
//                            ey=cang*120;
//                        }
//                        c2d.beginPath();
//                        c2d.moveTo(sx,sy);
//                        c2d.lineTo(ex,ey);
//                        c2d.stroke();
//                    }
//                    //Fetch the current time
//                    var ampm="AM";
//                    var now=new Date();
//                    var hrs=now.getHours();
//                    var min=now.getMinutes();
//                    var sec=now.getSeconds();
//                    c2d.strokeStyle="#000";
//                    //Draw AM/PM indicator
//                    if (hrs>=12) ampm="PM";
//                    c2d.lineWidth=1;
//                    c2d.strokeRect(21,-14,44,27);
//                    c2d.fillText(ampm,43,0);
//
//                    c2d.lineWidth=6;
//                    c2d.save();
//
//                    //Draw clock pointers but this time rotate the canvas rather than
//                    //calculate x/y start/end positions.
//                    //
//                    //Draw hour hand
//                    c2d.rotate(Math.PI/6*(hrs+(min/60)+(sec/3600)));
//                    c2d.beginPath();
//                    c2d.moveTo(0,10);
//                    c2d.lineTo(0,-60);
//                    c2d.stroke();
//                    c2d.restore();
//                    c2d.save();
//                    //Draw minute hand
//                    c2d.rotate(Math.PI/30*(min+(sec/60)));
//                    c2d.beginPath();
//                    c2d.moveTo(0,20);
//                    c2d.lineTo(0,-110);
//                    c2d.stroke();
//                    c2d.restore();
//                    c2d.save();
//                    //Draw second hand
//                    c2d.rotate(Math.PI/30*sec);
//                    c2d.strokeStyle="#E33";
//                    c2d.beginPath();
//                    c2d.moveTo(0,20);
//                    c2d.lineTo(0,-110);
//                    c2d.stroke();
//                    c2d.restore();
//
//                    //Additional restore to go back to state before translate
//                    //Alternative would be to simply reverse the original translate
//                    c2d.restore();
//                    setTimeout(function(){
//                        self.draw()
//                    },1000);
//                }
//            }
        })          
});