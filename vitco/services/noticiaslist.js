var serviceURL = "../services/";

var noticias;

$('#employeeListPage').bind('pageinit', function(event) {
	getNoticiaList();
});

function getNoticiaList() {
	$.getJSON(serviceURL + 'getnoticias.php', function(data) {
		$('#noticiaList li').remove();
		noticias = data.items;
		$.each(noticias, function(index, noticia) {
			$('#noticiaList').append('<li><a href="noticiadetalle.html?id=' + noticia.idnoticias + 						'">' +
					'<img src="pics/' + noticia.idnoticias + '.jpg"/>' +
					'<p style="white-space: normal;">22:03 | ' + noticia.copete + '</p>' +
					'<h4 style="white-space: normal;">' + noticia.titulo + '</h4>' +

					//'<span class="ui-li-count">' + noticia.reportCount + '</span></a></li>');
					'</li>');
		});
		$('#noticiaList').listview('refresh');
	});
}
