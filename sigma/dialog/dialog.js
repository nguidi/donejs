steal(
    'can/control/control.js',
    'can/view/ejs',
    'sigma/common.js')
.then(
    function(){
        can.Control("Dialog",{
            defaults: {
                mobile: undefined,
                view: undefined,
                bind: undefined
            }
        },{
            'init': function( element , options ) {
                element.append(can.view(options.view))
                if (!isUndefined(options.bind))
                    $.each(options.bind,function(i,toBind){
                        $(toBind.element).bind(toBind.event,function(){
                            toBind.toDo();
                        })
                    })
                if (isUndefined(options.mobile))
                    console.log('Desktop')
                else {
                    $(options.dialogName).dialog()
                }
                    
            }            
        })
    }
);