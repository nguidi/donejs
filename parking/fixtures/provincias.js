/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


steal('can/util/fixture')
.then(function(){
    
    can.fixture('GET /provincias', 
        function(params) {
            return {items: [
            {
                id: 1,
                nombre: 'Buenos Aires'
            },
            {
                id: 2,
                nombre: 'Catamarca'
            },
            {
                id: 3,
                nombre: 'Chaco'
            },
            {
                id: 4,
                nombre: 'Chubut'
            },
            {
                id: 5,
                nombre: 'Córdoba'
            },
            {
                id: 6,
                nombre: 'Corrientes'
            },
            {
                id: 7,
                nombre: 'Entre Ríos'
            },
            {
                id: 8,
                nombre: 'Formosa'
            },
            {
                id: 9,
                nombre: 'Jujuy'
            },
            {
                id: 10,
                nombre: 'La Pampa'
            },
            {
                id: 11,
                nombre: 'La Rioja'
            },
            {
                id: 12,
                nombre: 'Mendoza'
            },
            {
                id: 13,
                nombre: 'Misiones'
            },
            {
                id: 14,
                nombre: 'Neuquén'
            },
            {
                id: 15,
                nombre: 'Río Negro'
            },
            {
                id: 16,
                nombre: 'Salta'
            },
            {
                id: 17,
                nombre: 'San Juan'
            },
            {
                id: 18,
                nombre: 'San Luis'
            },
            {
                id: 19,
                nombre: 'Santa Cruz'
            },
            {
                id: 20,
                nombre: 'Santa Fe'
            },{
                id: 21,
                nombre: 'Santiago del Estero'
            },
            {
                id: 22,
                nombre: 'Tierra del Fuego, Antártida e Islas del Atlántico Sur'
            },
            {
                id: 23,
                nombre: 'Tucumán'
            }
        ]}
    })
    
})