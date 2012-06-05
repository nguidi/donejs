<?php
include 'config.php';

$sql = "select idnoticias,titulo, noticias.copete, foto ,fecha, contenido from noticias inner join fotos on (noticias.idnoticias = fotos.idnoticia) order by fecha  limit 10";

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql);  
	$noticia = $stmt->fetchAll(PDO::FETCH_OBJ);
	$dbh = null;
	echo '{"items":'. json_encode($noticia) .'}'; 
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}


?>
