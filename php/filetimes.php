<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    date_default_timezone_set('UTC');

    if (!$_GET["league"]) {
        http_response_code(400);
        echo "Missing 'league' parameter";
        return;
    }

    if (!$_GET['file']) {
        http_response_code(400);
        echo "Missing 'file' parameter";
        return;
    }

    $response = array();
    $dir = $_GET["league"];

    switch ($_GET['file']) {
        case 'main':

            $file = $dir === "pro" ? "siba" : "sicba";
            $response["main"] = filemtime(dirname(__DIR__) . "/files/" . $dir . "/" . strtoupper($file) . ".zip");
            break;
        case 'graphics':

            $graphics = $dir === "pro" ? "DDSPB2025" : "DDSCB2025";
            $response["graphics"] = filemtime(dirname(__DIR__) . "/files/" . $dir . "/" . $graphics . ".zip");
            break;

        case 'members':

            $dbVars = parse_ini_file("db-php.ini");

            $db = $mysqli = new mysqli('localhost', $dbVars['user'], $dbVars['pass'], $dbVars['name']);
            $db->query("SET time_zone = 'UTC'");

            $sql = "SELECT * FROM " . $dir . "_team_uploads ORDER BY teamID, latestUpload DESC";
            $results = $db->query($sql);

            $response['members'] = $results->fetch_all(MYSQLI_ASSOC);

            $mysqli->close();
            unset($dbVars);
            break;

        default:
            http_response_code(400);
            echo "Missing 'file' parameter";
            break;
    }

    echo json_encode($response);
} else {
    http_response_code(405); //Method Not Allowed
}
