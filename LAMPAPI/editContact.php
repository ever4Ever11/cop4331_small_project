<?php

$inData = getRequestInfo();

$id = 0;
$firstName = "";
$lastName = "";
$phone = "";
$email = "";

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
if( $conn->connect_error )
{
	returnWithError( $conn->connect_error );
}
else
{
	$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE ID=?");
	$stmt->bind_param("ssssi", $inData["FirstName"], $inData["LastName"], $inData["Phone"], $inData["Email"], $inData["ID"]);
	
	if ($stmt->execute())
	{
		returnWithInfo("Contact updated successfully.");
	}
	else
	{
		returnWithError("Failed to update contact.");
	}

	$stmt->close();
	$conn->close();
}

function getRequestInfo()
{
	return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj )
{
	header('Content-type: application/json');
	echo $obj;
}

function returnWithError( $err )
{
	$retValue = '{"error":"' . $err . '"}';
	sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $message )
{
	$retValue = '{"message":"' . $message . '","error":""}';
	sendResultInfoAsJson( $retValue );
}

?>
