<?php
header('Access-Control-Allow-Origin: *');
include('db.connect.php');

if ($_POST['type']):
	$requestType = $_POST['type'];
else if ($_GET):
	$requestType = $_GET['type'];
	var_dump( $_GET );
else:
	die;
endif;

if ($requestType == 'user'):
	$authCode = $_POST['authCode'];

	if(!$authCode){
		die;
	}

	$insertQuery = $db->prepare("
		INSERT INTO
			users (authCode, stage)
		SELECT
			?, ?
		FROM DUAL
		WHERE NOT EXISTS
			(SELECT
			 	*
		    FROM
		    	users
	        WHERE
	        	authCode=?)
  	");

	$getUserQuery = $db->prepare("
		SELECT
			*
		FROM
			users
		WHERE
			authCode = ?
	");

	// voeg parameters toe aan je statement
	$insertParams = array($authCode, 0, $authCode);
	$getUserParams = array($authCode);
	// voer de statement met de parameters uit
	$insertQuery->execute($insertParams);

	$getUserQuery->execute($getUserParams);
	// sla het resultaat op in een array
	$result = $getUserQuery->fetchAll(PDO::FETCH_ASSOC);


	// vertaal het resultaat naar een json object
	$json = json_encode($result, JSON_PRETTY_PRINT);
	// toon het json object
	echo $json;
else if ($requestType == 'startups'):
	$authCode = $_POST['authCode'];
	if(!$authCode || !$startups){
		die;
	}

endif;