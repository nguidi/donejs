/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

steal('can/util/fixture')
.then(function(){

    var fixt= [
    [35, 225, 1, 'efdeee', 'OK!', '2012-03-17 18:05:16'],
    [36, 229, 1, 'efdeee', 'VENCIDO!', '2012-03-19 16:29:14'],
    [37, 229, 1, 'efweee', 'OK!', '2012-03-19 18:00:19'],
    [38, 229, 1, 'efweee', 'OK!', '2012-03-19 18:01:12'],
    [39, 229, 1, 'efweee', 'VENCIDO!', '2012-03-19 19:32:42'],
    [40, 229, 1, 'efweee', 'VENCIDO!', '2012-03-19 21:40:03'],
    [41, 229, 1, 'efweee', 'VENCIDO!', '2012-03-19 21:40:18'],
    [42, 229, 1, 'efweee', 'VENCIDO!', '2012-03-19 21:47:24'],
    [43, 229, 1, 'efweee', 'VENCIDO!', '2012-03-19 21:58:42'],
    [44, 229, 1, 'efweee', 'VENCIDO!', '2012-03-19 22:00:57'],
    [45, 229, 1, 'efweee', 'VENCIDO!', '2012-03-19 22:03:16'],
    [46, 229, 1, 'efweee', 'VENCIDO!', '2012-03-19 22:03:26'],
    [47, 229, 1, 'efweee', 'VENCIDO!', '2012-03-19 22:03:57'],
    [48, 229, 1, 'kmm875', 'OK!', '2012-03-22 21:36:00'],
    [49, 229, 1, 'akr007', 'VENCIDO!', '2012-03-31 01:44:55'],
    [50, 229, 1, 'akr007', 'VENCIDO!', '2012-03-31 01:45:24'],
    [51, 229, 1, 'aaa123', 'OK!', '2012-04-04 14:34:49'],
    [52, 229, 1, 'ASF456', 'OK!', '2012-04-16 19:41:36'],
    [53, 229, 1, 'aaa123', 'OK!', '2012-05-03 12:45:25'],
    [54, 229, 1, 'ALX123', 'OK!', '2012-05-05 19:54:38']];

    //('historia_id', 'usuario_id', 'muni', 'patente', 'estado', 'fecha_ins')

    var aux= [];
    for(var i=0; fixt.length>i; i++){
            aux.push({
                 historia_id: fixt[i][0],
                 usuario_id:fixt[i][1],
                 muni:fixt[i][2],
                 patente: fixt[i][3],
                 estado:fixt[i] [4],
                 fecha_ins:fixt[i][5]
             }
         )
    }


    can.fixture('GET /hist_patentes',function(asd){
        return {items: aux}

    })

    can.fixture ('GET /hist_patentes/{id}',function(obj){
        console.log(obj)
        var flag = false
        for( var i=0; aux.length>i;i++){
            if(aux[i].historia_id== obj.data.id)
                flag = true;
            if(flag)
                break;
        }
        return (flag) ? aux[i]:{}

    }



)

});
