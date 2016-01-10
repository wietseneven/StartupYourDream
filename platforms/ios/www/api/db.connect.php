<?
require_once 'config.php';

try {
	$db = new PDO('mysql:host='.$db['host'].';
		dbname='.$db['name'].';
		charset=utf8',
		$db['username'],
		$db['password']);
}
catch(PDOException $e) {
	echo $e->getMessage();
}