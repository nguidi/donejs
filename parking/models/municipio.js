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
	findAll: "GET /municipios",
  	findOne : "GET /municipios/{id}", 
  	create : "GET /municipios",
 	update : "GET /municipios/{id}",
  	destroy : "GET /municipios/{id}",
        models  : function(data){
            return data.items;
        } 
},
/* @Prototype */
{});

can.Model('Municipio_select',
/* @Static */
{
	findAll: "GET /municipios",
  	findOne : "GET /municipios/{id}", 
  	create : "GET /municipios",
 	update : "GET /municipios/{id}",
  	destroy : "GET /municipios/{id}",
        models  : function(data){
            var newData = new Array()
            $.each(data.items,function(index,elem){
                newData.push({
                    value: elem.id,
                    text: elem.ciudad
                })
            })
            return newData
        } 
},
/* @Prototype */
{});

})