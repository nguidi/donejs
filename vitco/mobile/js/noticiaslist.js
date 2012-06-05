var serviceURL = "../services/";

var transacciones;

$('#transaccionListPage').bind('pageinit', function(event) {
	getTransaccionList();
});

function getTransaccionList() {
	$.getJSON(serviceURL + 'gettransacciones.php', function(data) {
		$('#transaccionList li').remove();
		transacciones = data.items;
		$.each(transacciones, function(index, transaccion) {
			$('#transaccionList').append('<li><p style="white-space: normal;">' + transaccion.remito + ' ' +
					transaccion.producto + ' ' +  transaccion.chofer + ' ' +  transaccion.vol_despachado + ' ' +
					 transaccion.isla_carga + '</p>' +
					//'<span class="ui-li-count">' + noticia.reportCount + '</span></a></li>');

					'</li>');
		});
		$('#transaccionList').listview('refresh');
	});
}
