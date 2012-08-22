steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking_web/zonas/handler/zonas.css',
    'parking_web/config.js',
    'parking/fixtures/fixtures.js',
    'parking_web/zonas/alta/alta.js',
    'parking/models/zona.js')
.then(
    function(){
        
        can.Control("ZonasWeb",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'zonas/handler/main.ejs'));
                this.tabla = new Tabla("#tabla_zonas",{
                    head: url + 'zonas/tabla/head.ejs',
                    model: Zona,
                    row: url + 'zonas/tabla/recipe.ejs',
                    filter: {municipio: options.user.municipio},
                    tableStyle: 'table inspectores'
                });
                this.alta = new AltaZona('#alta_zonas')
            },
            "ul.nav li click": function(el) {
                if (!el.hasClass('active')) {
                    var toTab = this.element.find('div.tabbable ul.nav li.active').find('a').attr('href')
                    var toUntab = el.find('a').attr('href')
                    this.applyTab(toTab,toUntab)
                }
            },
            'applyTab': function(toTab,toUntab) {
                this.element.find('div.tabbable ul.nav li.active').removeClass('active');
                this.element.find('div.tab-content div.active').removeClass('active');
                this.element.find('div.tab-content div#'+toUntab).addClass('active');
                this.element.find('div.tabbable ul.nav li a[href='+toUntab+']').parent('li').addClass('active');
            }
        })
    }
);

