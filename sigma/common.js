/*######################################
 *######################################
 *############CONFIGURACION#############
 *######################################
 *######################################
 **/

function systemPath() {
    return "http://localhost/code/sigma/"
}

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 *  isUndefined()
 *  
 *  Retorna si una variable esta o no definida
 *  
 *  @return Bool
 *  
 *  @note Ejemplo
 *      var noDefinida
 *      
 *      isUndefined(noDefinida)  ->  True
 *      
 *      var definida = "Algun String"
 *      
 *      isUndefined(definida)    ->  False
 *
 */

function isUndefined(val) {
    return (val == undefined) ? true : false    
}

/*
 *  defaultValue()
 *  
 *  Setea y Retorna el valor por defecto de una varible
 *  
 *  @return VAL
 *  
 *  @note Ejemplo
 *      
 *      function suma(unParametro, otroParametro) {
 *          var unaVariable = defaultValue(unParametro,0)
 *          var otraVariable = defaultValue(otroParametro,1)
 *          return unaVariable + otraVariable
 *      }
 *      
 *      suma(10)    ->  11
 *      suma()      ->  1
 *      suma(0,0)   ->  0
 *
 */

function defaultValue(val,def) {
    return (val == undefined) ? def : val
}

/*
 *  indexOfObject( array , obj )
 *  
 *  Este metodo devuelve la posicion de un Objecto dentro de un Array
 *  
 *  @param array:  
 *      Array de Objetos que supone contener el objecto    
 *
 *  @param obj: 
 *      Un objeto a buscar dentro del array
 *
 *  @return integer:
 *      -1  Si el Objeto no se encuentra en el array
 *      >0  Si el Objeto se encuentra en el array
 *  
 *  @note Ejemplo:
 *      var miArray = [ {id: 1, nombre: "un Nombre 1"},
 *                      {id: 2, nombre: "un Nombre 2"},
 *                      {id: 3, nombre: "un Nombre 3"},
 *                      {id: 4, nombre: "un Nombre 4"}  ]
 *                      
 *      var miObjeto = {id: 3, nombre: "un Nombre 3"}
 *      
 *      indexOfObject(miArray,miObjeto) ->  2
 *  
*/

function indexOfObject(array,obj) {
    var index = -1
    $.each(array,function(i,elem) {
        var bool = new Array()
        for (var attr in elem) {
            bool.push((elem[attr] == obj[attr]) ? true : false)
        }
        index = ($.unique(bool).length == 1 && bool[0] == true) ? i : -1
        if (index >= 0)
            return false
    })
    return index
}

/*
 *  commaSplit()
 *  
 *  Este metodo separa un String y forma un array
 *
 *  @return array:
 *      Un Array conformado por substring del string original que fue separado por comas (,)
 *      
 *  @note Ejemplo:
 *      miString = "Hola, Como, Estas"
 *      
 *      commaSplit(miString) -> ["Hola","Como","Estas"]
 *  
 **/

function commaSplit(val) {
    return val.split(/,\s*/);
}

/*
 *  extractLast(val)
 *  
 *  Este metodo objtiene el ultimo substring de un string original separados por comas (,)
 *  
 *
 *  @return string
 *  
 *  @note Ejemplo
 *  miString = "Hola, Como, Estas"
 *      
 *  extractLast(miString) -> "Estas"
 *  
 **/

function extractLast(val) {
    return this.commaSplit(val).pop();
}

/*
 *  isEmptyArray(array)
 *  
 *  Este metodo verifica si un array esta vacio o no
 *  
 *
 *  @return bool
 *      true    ->  Si esta vacio
 *      false   ->  si no esta vacio 
 *  
 *  @note Ejemplo
 *  miArray = ["Hola, Como, Estas"]
 *      
 *  isEmptyArray(miArray)   ->    False
 *  
 **/

function isEmptyArray(array) {
    return (array.length == 0) ? true : false
}


/*
 *  stringToRE(string)
 *  
 *  Este metodo convierte un string a una expresion regular
 *  
 *
 *  @return string
 *      Un string expresado en forma regular (sin acentos, comas, espacios, mayus, etc)
 *  
 *  @note Ejemplo
 *  miString = "Hola Señor"
 *      
 *  stringToRE(miString)   ->   "holasenor"
 *  
 **/

function stringToRE(string) {
        return string
                .toLowerCase()
                .replace(/[áÁ]/g,"a")
                .replace(/[éÉ]/g,"e")
                .replace(/[íÍ]/g,"i")
                .replace(/[óÓ]/g,"o")
                .replace(/[úÚ]/g,"u")
                .replace(/[^a-zA-Z0-9]+/g," ")
                .split(' ')
                .join('')
}

function isSameObject(obj1,obj2) {
    var bool = false
    if (this.objectLength(obj1) == this.objectLength(obj2)) {
        bool = (this.isEmptyObject(obj1)) ? true : false 
        for (var attr in obj1) {
            if (obj1[attr] == obj2[attr]) 
                bool = true
            else {
                bool = false
                break;
            }
        }    
    }
    return bool
}

function objectLength(obj) {
    var length = 0
    for (var attr in obj) {
        length++
    }
    return length
}

function isEmptyObject(obj) {
    return (this.objectLength(obj) == 0) ? true : false
}


function isSubstring(substring,string) {
    var bool = false
    for (var i=0; i < string.length && !bool; i++) {
        if (string[i] == substring[0]) {
            bool = true
            for (var z=0; (z < substring.length) && bool; z++) {
                bool = (string[i+z] == substring[z]) ? true : false
            }
        }
    }
    return bool
}

function isSubstringCaseSensitive(substring,string) {
    return this.isSubstring(substring.toLowerCase(),string.toLowerCase())
}

function getFirst(array) {
    return array[0]
}

function getLast(array) {
    return array[array.length-1]
}

function random(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
}