<?php

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

error_reporting(-1);
ini_set("display_errors", "1"); 
ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit(0);
}

$inData = getRequestInfo();

$contactPhone = $inData["Phone"];
$contactEmail = $inData["Email"];
$contactFirstName = $inData["FirstName"];
$contactLastName = $inData["LastName"];

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    
    $stmt = $conn->prepare("SELECT ID FROM Contacts WHERE ID=?");
    if ($stmt === false) {
        returnWithError("Error preparing the SELECT statement: " . $conn->error);
    }
    
    $stmt->bind_param("i", $inData["ID"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {

        $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE ID=?");
        
        if ($stmt === false) {
            returnWithError("Error" . $conn->error);
        }

        $stmt->bind_param("ssssi", $inData["FirstName"], $inData["LastName"], $inData["Phone"], $inData["Email"], $inData["ID"]);
        
        if ($stmt->execute()) {
            returnWithInfo("Contact updated successfully");
        } else {
            returnWithError("Failed to update contact: " . $stmt->error);
        }
    } else {
        returnWithError("Contact not found");
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
