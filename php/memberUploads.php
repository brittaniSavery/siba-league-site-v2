<?php

date_default_timezone_set('UTC');

$shortopts  = "";
$shortopts .= "d::";  // database
$shortopts .= "u::"; // username
$shortopts .= "p::"; // password

$longopts  = array(
    "database::",
    "username::",
    "password::",
);
$options = getopt($shortopts, $longopts);

$database = $options["d"] ?? $options["database"] ?? 'siba';
$username = $options["u"] ?? $options["username"] ?? 'siba-robot';
$password = $options["p"] ?? $options["password"] ?? 'testing123';

echo "Using the following credentials: " .
    $database . " " . $username . " " . $password . "\n";

$mysqli = new mysqli('localhost', $username, $password, $database);
$mysqli->query("SET time_zone = 'UTC'");

$path = dirname(__DIR__) . "/LeagueFiles/LeagueFiles/";

echo "Current path: " . $path . "\n";

// college files
echo "Starting college files...\n";
$collegeFiles = array_diff(scandir($path . "/SICBA"), array('..', '.'));

foreach ($collegeFiles as $file) {

    if (preg_match('/[A-Za-z]+(\d+)\.(\w+)/', $file, $matches)) {
        $teamID = $matches[1];
        $fileType = $matches[2];
        $upload = filemtime($path . '/SICBA/' . $file);

        // checking to see if the read file has a later upload date
        $res = $mysqli->query("SELECT * FROM college_team_uploads 
        WHERE teamID={$teamID} AND fileType='{$fileType}' AND latestUpload >= FROM_UNIXTIME({$upload})");

        echo $teamID . "." . $fileType . " updated?: " . boolval(!$res->num_rows) . "\n";

        // Add/Update the file's upload time since the previous query didn't find a match
        if (!$res->num_rows) {
            echo "Updating...\n";

            $mysqli->query("INSERT INTO college_team_uploads (teamID, fileType, latestUpload) 
        VALUES({$teamID},'{$fileType}', FROM_UNIXTIME({$upload})) ON DUPLICATE KEY 
        UPDATE latestUpload=FROM_UNIXTIME({$upload})");

            echo $file . "update complete!\n";
        }
    }
}

echo "College files complete!\n\n";

// pro files
echo "Starting pro files...\n";
$proFiles = array_diff(scandir($path . "/SIBA"), array('..', '.'));
foreach ($proFiles as $file) {

    if (preg_match('/[A-Za-z]+(\d+)\.(\w+)/', $file, $matches)) {
        $teamID = $matches[1];
        $fileType = $matches[2];
        $upload = filemtime($path . '/SIBA/' . $file);

        // checking to see if the read file has a later upload date
        $res = $mysqli->query("SELECT * FROM pro_team_uploads 
        WHERE teamID={$teamID} AND fileType='{$fileType}' AND latestUpload >= FROM_UNIXTIME({$upload})");

        echo $teamID . "." . $fileType . " updated?: " . boolval(!$res->num_rows) . "\n";

        // Add/Update the file's upload time since the previous query didn't find a match
        if (!$res->num_rows) {
            echo "Updating...\n";

            $mysqli->query("INSERT INTO pro_team_uploads (teamID, fileType, latestUpload) 
        VALUES({$teamID},'{$fileType}', FROM_UNIXTIME({$upload})) ON DUPLICATE KEY 
        UPDATE latestUpload=FROM_UNIXTIME({$upload})");

            echo $file . "update complete!\n";
        }
    }
}

echo "Pro files complete!\n\n";

$mysqli->close();
