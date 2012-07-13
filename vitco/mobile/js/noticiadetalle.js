var serviceURL = "../services/";

$('#detailsPage').live('pageshow', function(event) {
	var id = getUrlVars()["id"];
	$.getJSON(serviceURL + 'getnoticia.php?id='+id, displayNoticia);
});

function displayNoticia(data) {
	var noticia = data.item;
	console.log(noticia);
	$('#noticiaPic').attr('src', 'pics/' + noticia.idnoticias + '.jpg');
	$('#titulo').text(noticia.titulo);
	$('#copete').text(noticia.copete);
	$('#noticia').html(noticia.contenido);
	
	$('#actionList').listview('refresh');
	
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
