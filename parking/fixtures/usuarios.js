/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function random(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
}

steal('can/util/fixture')
.then(function(){
        var perfiles = [{
                        id: 1,
                        descripcion: 'Administrador'
                    },
                    {
                        id:2, 
                        descripcion:'Control'
                    },
                    {
                        id:3, 
                        descripcion:'Municipalidades'
                    },
                    {
                        id:4, 
                        descripcion:'Inspectores'
                    },
                    {
                        id:5, 
                        descripcion:'Locales'
                    },
                    {
                        id:8, 
                        descripcion:'Usuarios'
                    },
                    {
                        id:6, 
                        descripcion:'Soporte Tecnico'
                    },
                    {
                        id:7, 
                        descripcion:'Soporte Tecnico Master'
                    }
                ]
        var municipio = //Localidades
                [
                //{id: 1, ciudad: 'Campana', codigo_postal: '2804', image: 'camp.jpg'},
                //{id: 2, ciudad: 'Zárate', codigo_postal: '2800', image: 'zarate.jpg'},
                //{id: 3, ciudad: 'Escobar', codigo_postal: '1625', image: 'escobar.jpg'},
                //{id: 4, ciudad: 'Baradero', codigo_postal: '2942', image: 'baradero.jpg'},
                //{id: 5, ciudad: 'San Pedro', codigo_postal: '2930', image: 'sanpedro.jpg'},
               // {id: 6, ciudad: 'Capital Federal', codigo_postal: '1000', image: 'capital.jpg'},
                {id: 1, ciudad: 'Avellaneda', codigo_postal: '2942', image: 'avellaneda.jpg'},
                {id: 8, ciudad: 'San Martin', codigo_postal: '2930', image: 'sanmartin.jpg'},
                {id: 9, ciudad: 'Tucumán', codigo_postal: '2814', image: 'tucuman.jpg'},
                {id: 10, ciudad: 'Pilar', codigo_postal: '1000', image: 'pilar.jpg'}
                ];
    
         var users_sql =[[220, '22333444', '333', 1, 'cabildo', 8, 'neri@gmail.com', 'Neri', 'Guidi'],
                        [225, '11959489', '2109', 3, 'maria', 8, 'rios@gmail.com', 'Matias', 'Rios'],
                        [230, 'admin', 'toto', 1, 'apodo', 1, 'soto@gmail.com', 'Franco', 'Soto'],
                        [229, 's22333444', '000', 1, 'super', 4, 'martinez@gmail.com', 'Gisela', 'Martinez'],
                        [231, 'sanmartin', 'sanmartin', 8, 'martin', 3, 'msanmartin@gmail.com', 'Julian', 'Farina'],
                        [232, 'avellaneda', 'avellaneda', 7, 'avellaneda', 3, 'avellaneda@gmail.com', 'German', 'Cabral'],
                        [233, 'pilar', 'pilar', 10, 'pilar', 3, 'pilar@gmail.com', 'Carina', 'Luque'],
                        [234, 'tucuman', 'tucuman', 9, 'tucuman', 3, 'tucuman@gmail.com', 'Juan', 'Prongue'],
                        [237, 'hd001', 'hd001',1, 'hd1', 1, 'asdasd@gmail.com', 'Federico', 'Calle'],
                        [238, 'hdsuper', 'hdsuper', 1, 'super', 7, 'super@gmail.com', 'Mariano', 'Campello']]
        
        var users = new Array()
        
        for (var i=0; i < users_sql.length; i++) {
            users.push({
                id : users_sql[i][0],
                username: users_sql[i][1],
                password: users_sql[i][2],
                municipio: municipio[users_sql[i][3]],
                perfil: $.grep(perfiles,function(item){return item.id == users_sql[i][5]})[0],
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
                    if(params.data.password != undefined && params.data.username != undefined)
                    {
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
                    }
                    else{
                        return {items: users} // sin filtros de usuarios (dame todos los usuarios)
                    }
                } else 
                    return {items: users}
            }
	);
            
        can.fixture('GET /municipios',
            function(params) {
                return {items: municipio}
            }
	);
            
        can.fixture('POST /users',function(params){
            var user = {};
            console.log(params.data.username)
            if(params.data.perfil == 1){
                var p = "";
                for(x=0;x<5;x++){
                    p += random(1,9)
                }
                user = {
                    username: params.data.username,
                    password: p,
                    recuperacion: ''
                }
            }
            else if(params.data.perfil == 8){
                user = {
                    username: params.data.username,
                    password: params.data.password,
                    recuperacion: params.data.palabraClave
                }
            }
            users.push($.extend(user,{
                id : users.length + 1,
                municipio: 1,
                perfil: params.data.perfil,
                email: '',
                nombre: '',
                apellido: ''
            }))
            console.log(users)
                
        });
        
        
})