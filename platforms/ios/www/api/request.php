<?php
header('Access-Control-Allow-Origin: *');
include('db.connect.php');

if ($_POST['type']):
	$requestType = $_POST['type'];
elseif ($_POST):
	$requestType = $_POST['type'];
endif;

if ($requestType == 'user') {
	$authCode = $_POST['authCode'];

	if (!$authCode) {
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

} elseif ($requestType == 'startups') {

	$authCode = $_POST['authCode'];
	$toUpdate = $_POST['toUpdate'];
	$startups = $_POST['startups'];
	$stage = $_POST['stage'];
	if (!$authCode) {
		echo 'No authcode or startups given';
		die;
	}
	if ($startups) {
		if ($toUpdate == 'startups') {
			$insertQuery = $db->prepare("
				UPDATE
					users
				SET
					startups=?,
					stage=?
				WHERE
					authCode=?
		    ");
		} elseif ($toUpdate == 'category') {
			$insertQuery = $db->prepare("
				UPDATE
					users
				SET
					category=?,
					stage=?
				WHERE
					authCode=?
		    ");
		} elseif ($toUpdate == 'country') {
			$insertQuery = $db->prepare("
				UPDATE
					users
				SET
					country=?,
					stage=?
				WHERE
					authCode=?
		    ");
		}
		$insertParams = array($startups, $stage, $authCode);
		// voer de statement met de parameters uit
		$insertQuery->execute($insertParams);
	}

	$getUserQuery = $db->prepare("
		SELECT
			*
		FROM
			users
		WHERE
			authCode = ?
	");

	// voeg parameters toe aan je statement

	$getUserParams = array($authCode);


	$getUserQuery->execute($getUserParams);
	// sla het resultaat op in een array
	$result = $getUserQuery->fetchAll(PDO::FETCH_ASSOC);


	// vertaal het resultaat naar een json object
	$json = json_encode($result, JSON_PRETTY_PRINT);
	// toon het json object


	echo $json;
}