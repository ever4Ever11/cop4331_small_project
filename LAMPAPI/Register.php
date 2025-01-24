<?php

$args = json_decode(file_get_contents("php://input"), true);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$db = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

$result = $db->execute_query(
    "SELECT *
     FROM Users
     WHERE (Login=?)",
    [$args["login"]]
);

if (mysqli_num_rows($result) != 0) {
    http_response_code(409);
    exit;
}


$db->execute_query(
    "INSERT INTO Users (Login, Password, FirstName, LastName)
     VALUES (?, ?, ?, ?)",
    [$args["login"], $args["password"], $args["firstname"], $args["lastname"]]
);

http_response_code(200);
exit;

?>
