steal(
    'can/control/control.js',
    'can/view/ejs',
    'jquery/dom/form_params',
    'sigma/common.js'
).then(
    function($){    // A este steal le agrego una pantalla ejs o algo asi
         can.Control('Select',
         {  
             defaults : {
                 model: undefined,
                 label: "Titulo Select",
                 dependency: undefined,
                 mobile: false
             }
         },
         {
             'init' : function( element , options ){ // inicializacion
                element.append(
                    can.view('//sigma/select/views/select.ejs',{
                        label: options.label,
                        selectClass: options.selectClass,
                        selectId: options.selectId
                    })
                )
                options.model.findAll({},
                    function(selectData){
                        $.each(selectData,function(i,optionData){
                            element.find('select').append(
                                can.view(
                                    '//sigma/select/views/option.ejs',{
                                        valor: optionData[options.valor],
                                        texto: optionData[options.texto]
                                    }
                                )
                            )
                        })
                        if (options.mobile)
                            $(element).find('select').selectmenu();
                    }
                )
             }
         }
     );
});