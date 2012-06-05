//var serviceURL = "../services/";

var serviceURL = "http://campananoticias.tklapp.com/desa/mobile/vitco/services/";

var transacciones;

$('#transaccionListPage').bind('pageinit', function(event) {
	getTransaccionList();
});


function getTransaccionList() {
	$.ajax({ serviceURL + 'gettransacciones.php',
		 'jsonp',
		  function(data) {
				$('#transaccionList li').remove();
				transacciones = data.items;
				$.each(transacciones, function(index, transaccion) {
					$('#transaccionList').append('<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-count ui-li-has-icon ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="index.html" class="ui-link-inherit"><h3 class="ui-li-heading">Remito Numero: ' + transaccion.remito + '</h3><p class="ui-li-desc">Cliente: ' +  transaccion.cliente + ' </p><p class="ui-li-desc">Chofer: ' +  transaccion.chofer + ' </p><p class="ui-li-desc">Producto: ' +  transaccion.producto  + ' </p></div></li>');
				});
				$('#transaccionList').listview('refresh');
			}
		});
	/*.getJSON(serviceURL + 'gettransacciones.php', function(data) {
		$('#transaccionList li').remove();
		transacciones = data.items;
		$.each(transacciones, function(index, transaccion) {
			$('#transaccionList').append('<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-count ui-li-has-icon ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="index.html" class="ui-link-inherit"><h3 class="ui-li-heading">Remito Numero: ' + transaccion.remito + '</h3><p class="ui-li-desc">Cliente: ' +  transaccion.cliente + ' </p><p class="ui-li-desc">Chofer: ' +  transaccion.chofer + ' </p><p class="ui-li-desc">Producto: ' +  transaccion.producto  + ' </p></div></li>');
		});
		$('#transaccionList').listview('refresh');
	});*/
}
