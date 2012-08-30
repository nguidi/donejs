steal('can/model')
.then(function(){

/**
 * @class Oficios.Ciudad
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend candidato services.  
 */

can.Model('Municipio',
/* @Static */
{
	findOne: function(params, success, error) {
            return $.ajax({
                url: '/slim_php/backend_parking/municipios.php/municipios/'+params.id,
                type: 'GET',
                dataType: 'json'
            })
        }
},
/* @Prototype */
{});

can.Model('Municipio_select',
/* @Static */
{
	findAll: function(params, success, error) {
            return $.ajax({
                url: '/slim_php/backend_parking/municipios.php/municipios',
                type: 'GET',
                dataType: 'json'
            })
        },
        models  : function(data){
            var newData = new Array()
            $.each(data,function(index,elem){
                newData.push({
                    value: elem.id,
                    text: elem.descripcion
                })
            })
            return newData
        }
},
/* @Prototype */
{});

})