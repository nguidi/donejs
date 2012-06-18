/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal(  'jquery/jquery.js',
        'can/control/control.js',
        'can/view/ejs',
        'sigma/paginador',
        'sigma/common.js',
        './tabla.css')
.then( 
    function($){
        can.Control('Paginador',
        /** @Static */
        {
                defaults : {
                    toPaginate: undefined,
                    perPage: undefined,
                    maxIndex: undefined
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
                    element.append('<div class="pagination"></div>')
                    
                }
        })
    }
)