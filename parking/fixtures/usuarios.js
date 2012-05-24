/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal('can/util/fixture')
.then(function(){
    
        var municipio = //Localidades
                [{id: 1, ciudad: 'Campana', codigo_postal: '2804', image: 'camp.jpg'},
                {id: 2, ciudad: 'Zárate', codigo_postal: '2800', image: 'zarate.jpg'},
                {id: 3, ciudad: 'Escobar', codigo_postal: '1625', image: 'escobar.jpg'},
                {id: 4, ciudad: 'Baradero', codigo_postal: '2942', image: 'baradero.jpg'},
                {id: 5, ciudad: 'San Pedro', codigo_postal: '2930', image: 'sanpedro.jpg'},
                {id: 6, ciudad: 'Capital Federal', codigo_postal: '1000', image: 'capital.jpg'},
                {id: 7, ciudad: 'Avellaneda', codigo_postal: '2942', image: 'avellaneda.jpg'},
                {id: 8, ciudad: 'San Martin', codigo_postal: '2930', image: 'sanmartin.jpg'},
                {id: 9, ciudad: 'Tucumán', codigo_postal: '2814', image: 'tucuman.jpg'},
                {id: 10, ciudad: 'Pilar', codigo_postal: '1000', image: 'pilar.jpg'}];
    
         var users_sql =[[220, '22333444', '333', 1, 'cabildo', 8, 'neri@gmail.com'],
                        [225, '11959489', '2109', 3, 'maria', 8, 'rios@gmail.com'],
                        [230, 'admin', 'toto', 0, 'apodo', 1, 'soto@gmail.com'],
                        [229, 's22333444', '000', 7, 'super', 4, 'martinez@gmail.com'],
                        [231, 'sanmartin', 'sanmartin', 9, 'martin', 2, 'msanmartin@gmail.com'],
                        [232, 'avellaneda', 'avellaneda', 8, 'avellaneda', 3, 'avellaneda@gmail.com'],
                        [233, 'pilar', 'pilar', 9, 'pilar', 3, 'pilar@gmail.com'],
                        [234, 'tucuman', 'tucuman', 9, 'tucuman', 4, 'tucuman@gmail.com'],
                        [237, 'hd001', 'hd001',4, 'hd1', 1, 'asdasd@gmail.com'],
                        [238, 'hdsuper', 'hdsuper', 7, 'super', 1, 'super@gmail.com']]
        
        var users = new Array()
        
        for (var i=0; i < users_sql.length; i++) {
            users.push({
                id : users_sql[i][0],
                username: users_sql[i][1],
                password: users_sql[i][2],
                municipio: municipio[users_sql[i][3]],
                perfil: users_sql[i][5],
                recuperacion: users_sql[i][4],
                email: users_sql[i][6]
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
            
        can.fixture('GET /users/{username}',
            function(params) {
                console.log(params)
            }
	);
        
})