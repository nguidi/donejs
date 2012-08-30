steal(
    'can/control/control.js',
    'can/view/ejs',
    'jquery/dom/form_params',
    'sigma/common.js',
    'sigma/select'
).then(
    function($){    // A este steal le agrego una pantalla ejs o algo asi
         can.Control('Formulario',
         {  
             defaults : {

             }
         },
         {
             'init' : function( element , options ){ // inicializacion
                 $.each(options.form_data,function(i,form){
                     element.append(can.view(url+'formulario/views/fieldForm.ejs'))
                     if (form.tipo == 'select') {
                        new Select('div.fieldForm:last', {
                            model: Pais_Select,
                            label: "Seleccione un Pais:"
                        }) 
                     } else {
                        element.find('div.fieldForm:last').append(
                            can.view(url+'formulario/views/'+form.tipo+'.ejs',form)
                        )
                        if (form.isRequired)
                            element.find('div.fieldForm:last label').append(' *')    
                     }
                 })
             }
         }
     );
});