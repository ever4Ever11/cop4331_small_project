<?php

	$inData = getRequestInfo();
	
	$searchResults = [
		"contacts" => [],
		"pageCount" => 0
	];
	$searchCount = 0;

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$contactName = "%" . $inData["search"] . "%";

		$count = $conn->prepare("SELECT COUNT(*) FROM Contacts WHERE CONCAT_WS(' ', FirstName, LastName) LIKE ? AND UserID=?");
		$count->bind_param("ss", $contactName, $inData["userId"]);
		$count->execute();

		if($row = $count->get_result()->fetch_assoc()) {
			$searchCount = $row["COUNT(*)"];

			$stmt = $conn->prepare("SELECT ID, FirstName, LastName, Phone, Email FROM Contacts WHERE CONCAT_WS(' ', FirstName, LastName) LIKE ? AND UserID=? LIMIT ?, 10");
			$offset = 10*($inData["page"] - 1);
			$stmt->bind_param("ssi", $contactName, $inData["userId"], $offset);
			$stmt->execute();
			
			$result = $stmt->get_result();
			
			while($row = $result->fetch_assoc())
			{
				$searchResults["contacts"][] = [
					"id" => $row["ID"],
					"firstName" => $row["FirstName"],
					"lastName" => $row["LastName"],
					"phone" => $row["Phone"],
					"email" => $row["Email"]
				];
			}
			
			$searchResults["pageCount"] = ceil($searchCount/10);
			returnWithInfo( json_encode($searchResults) );
			$stmt->close();
		} else {
			returnWithError( "No Records Found" );
		}
		
		$count->close();
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
		$retValue = '{"results":{"id":0,"firstName":"","lastName":"","phone":"","email":""},"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":' . $searchResults . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>