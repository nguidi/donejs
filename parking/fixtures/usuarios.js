/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal('can/util/fixture')
.then(function(){
    
        var municipio = //Localidades
                [
                //{id: 1, ciudad: 'Campana', codigo_postal: '2804', image: 'camp.jpg'},
                //{id: 2, ciudad: 'Zárate', codigo_postal: '2800', image: 'zarate.jpg'},
                //{id: 3, ciudad: 'Escobar', codigo_postal: '1625', image: 'escobar.jpg'},
                //{id: 4, ciudad: 'Baradero', codigo_postal: '2942', image: 'baradero.jpg'},
                //{id: 5, ciudad: 'San Pedro', codigo_postal: '2930', image: 'sanpedro.jpg'},
               // {id: 6, ciudad: 'Capital Federal', codigo_postal: '1000', image: 'capital.jpg'},
                {id: 7, ciudad: 'Avellaneda', codigo_postal: '2942', image: 'avellaneda.jpg'},
                {id: 8, ciudad: 'San Martin', codigo_postal: '2930', image: 'sanmartin.jpg'},
                {id: 9, ciudad: 'Tucumán', codigo_postal: '2814', image: 'tucuman.jpg'},
                {id: 10, ciudad: 'Pilar', codigo_postal: '1000', image: 'pilar.jpg'}
                ];
    
         var users_sql =[[220, '22333444', '333', 1, 'cabildo', 8, 'neri@gmail.com', 'Neri', 'Guidi'],
                        [225, '11959489', '2109', 3, 'maria', 8, 'rios@gmail.com', 'Matias', 'Rios'],
                        [230, 'admin', 'toto', 1, 'apodo', 1, 'soto@gmail.com', 'Franco', 'Soto'],
                        [229, 's22333444', '000', 7, 'super', 4, 'martinez@gmail.com', 'Gisela', 'Martinez'],
                        [231, 'sanmartin', 'sanmartin', 9, 'martin', 2, 'msanmartin@gmail.com', 'Julian', 'Farina'],
                        [232, 'avellaneda', 'avellaneda', 8, 'avellaneda', 1, 'avellaneda@gmail.com', 'German', 'Cabral'],
                        [233, 'pilar', 'pilar', 9, 'pilar', 3, 'pilar@gmail.com', 'Carina', 'Luque'],
                        [234, 'tucuman', 'tucuman', 9, 'tucuman', 4, 'tucuman@gmail.com', 'Juan', 'Prongue'],
                        [237, 'hd001', 'hd001',4, 'hd1', 1, 'asdasd@gmail.com', 'Federico', 'Calle'],
                        [238, 'hdsuper', 'hdsuper', 7, 'super', 1, 'super@gmail.com', 'Mariano', 'Campello']]
        
        var users = new Array()
        
        for (var i=0; i < users_sql.length; i++) {
            users.push({
                id : users_sql[i][0],
                username: users_sql[i][1],
                password: users_sql[i][2],
                municipio: municipio[users_sql[i][3]],
                perfil: users_sql[i][5],
                recuperacion: users_sql[i][4],
                email: users_sql[i][6],
                nombre: users_sql[i][7],
                apellido: users_sql[i][8]
            })
        }
        
        can.fixture('GET /users',
            function(params) {
                var bool = false
                if (params.data) {
                    return { items: $.grep(users,function(elem,index) {
                            for (var attr in params.data) {
                                if (elem[attr] == params.data[attr])
                                    bool = true
                                else {
                                    bool = false
                                    break
                                }
                            }
                            return bool
                    })}
                } else 
                    return {items: users}
            }
	);
            
        can.fixture('GET /municipios',
            function(params) {
                return {items: municipio}
            }
	);
        
})