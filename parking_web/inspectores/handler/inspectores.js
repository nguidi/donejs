steal(
    'can/control/control.js',
    'can/view/ejs',
    'parking/fixtures/fixtures.js',
    'parking/models/inspector.js',
    'parking_web/inspectores/handler/inspectores.css',
    'parking_web/config.js',
    'sigma/tabla/tabla.js',
    'parking_web/inspectores/alta/alta.js')
.then(
    function(){
        
        can.Control("Inspectores",{
            defaults: {
                user: undefined
            }
        },{
            'init': function( element , options ) {
                this.element.html(can.view(url+'inspectores/handler/main.ejs'));
                this.tabla = new Tabla("#tabla_inspectores",{
                    head: url + 'inspectores/tabla/head.ejs',
                    model: Inspector,
                    row: url + 'inspectores/tabla/recipe.ejs',
                    tableStyle: 'table inspectores'
                });
                this.alta = new AltaInspectores('#alta_inspectores', {user: options.user})
                
            },
            "ul.nav li click": function(el) { //Handler del evento de cambio de tab...
                if (!el.hasClass('active')) {
                    var toTab = this.element.find('div.tabbable ul.nav li.active').find('a').attr('href')
                    var toUntab = el.find('a').attr('href')
                    this.applyTab(toTab,toUntab)
                }
            },
            'applyTab': function(toTab,toUntab) { // aplica cambios en el tab
                this.element.find('div.tabbable ul.nav li.active').removeClass('active');
                this.element.find('div.tab-content div.active').removeClass('active');
                this.element.find('div.tab-content div#'+toUntab).addClass('active');
                this.element.find('div.tabbable ul.nav li a[href='+toUntab+']').parent('li').addClass('active');
            },
            "table.inspectores i.icon-trash click": function(element){
                Inspector.destroy($(element).parents('tr').attr('class'), function(obj){
                    console.log(obj);
                    $(element).parents('tr').remove();
                });
            },
            "{Inspector} created": function(Element, ev, element)
            {
                console.log(element);
                $('table.inspectores').append(can.view(url+'inspectores/tabla/recipe.ejs',element));
            }
        })
    }
);

