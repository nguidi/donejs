<?php
include 'config.php';

$sql = "select idnoticias,titulo, noticias.copete, foto ,fecha, contenido from noticias inner join fotos on (noticias.idnoticias = fotos.idnoticia) where noticias.idnoticias=:id";

//$sql = "select * from noticias where noticias.idnoticias=:id";
//echo $sql;
try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->prepare($sql);  
	$stmt->bindParam("id", $_GET[id]);
	$stmt->execute();
	$noticia = $stmt->fetchObject();  
	$dbh = null;
	echo '{"item":'. json_encode($noticia) .'}'; 
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}

?>
