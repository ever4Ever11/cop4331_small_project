<?php

$inData = getRequestInfo();

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    
    $stmt = $conn->prepare("SELECT ID FROM Contacts WHERE ID=?");
    if ($stmt === false) {
        returnWithError("Error " . $conn->error);
    }

    $stmt->bind_param("i", $inData["ID"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID=?");
        if ($stmt === false) {
            returnWithError("Error " . $conn->error);
        }

        $stmt->bind_param("i", $inData["ID"]);
        
        if ($stmt->execute()) {
            returnWithInfo("Contact deleted successfully.");
        } else {
            returnWithError("Failed to delete contact: " . $stmt->error);
        }
    } else {
        returnWithError("Contact not found.");
    }

    $stmt->close();
    $conn->close();
}

function getRequestInfo() {
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj) {
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError($err) {
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}

function returnWithInfo($message) {
    $retValue = '{"message":"' . $message . '","error":""}';
    sendResultInfoAsJson($retValue);
}

?>
