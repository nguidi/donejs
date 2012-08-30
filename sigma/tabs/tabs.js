/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(  'jquery/jquery.js',
        'can/control/control.js',
        'can/view/ejs',
        'sigma/common.js',
        'sigma/tabla',
        './tabs.css')
.then( 
    function($){
        /**
        * @class Tab
        */
        can.Control('Tab',
        /** @Static */
        {
            defaults : {
                style: 'top',
                tabs: undefined,
                table: undefined
            }
        },
        /** @Prototype */
        {
            'init' : function(element , options){
                var self = this
                element.append(can.view('//sigma/tabs/view/init.ejs'))
                element.find('div#tabUlArea')
                    .append(can.view(options.tabs))
                if (!isUndefined(options.table)) {
                    can.bind.call('div#tabContentArea','tableCreated',function(){
                        self.hideAllTr()
                    })
                    new Tabla('div#tabContentArea',options.table)
                }
                element.find('div#tabUlArea ul li:first').click()
            },

            'div.tabs #tabUlArea ul li click': function(li, event) {
                this.element.find('div#tabUlArea ul li.activeTab').removeClass('activeTab')
                li.addClass('activeTab')
                if (!isUndefined(this.options.table)) {
                    this.element.find('div#tabContentArea tr th.'+li.attr('tabs')).show()
                    this.element.find('div#tabContentArea tr td.'+li.attr('tabs')).show()
                }
            },
            
            hideAllTr: function() {
                this.element.find('div#tabContentArea tr').hide()
            }
        })

});