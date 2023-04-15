<?php
date_default_timezone_set('UTC');

$path = dirname(__DIR__) . "/LeagueFiles/LeagueFiles/";
$mysqli = new mysqli('localhost', 'siba-robot', 'testing123', 'siba');

// college files
$collegeFiles = array_diff(scandir($path . "/SICBA"), array('..', '.'));

foreach ($collegeFiles as $file) {
    preg_match('/[A-Za-z]+(\d+)\.(\w+)/', $file, $matches);
    $teamID = $matches[1];
    $fileType = $matches[2];
    $upload = filemtime($path . '/SICBA/' . $file);

    // checking to see if the read file has a later upload date
    $res = $mysqli->query("SELECT * FROM college_team_uploads 
    WHERE teamID={$teamID} AND fileType='{$fileType}' AND latestUpload >= FROM_UNIXTIME({$upload})");

    // Add/Update the file's upload time since the previous query didn't find a match
    if (!$res->num_rows) {
        echo "Inside if";
        $mysqli->query("INSERT INTO college_team_uploads (teamID, fileType, latestUpload) 
    VALUES({$teamID},'{$fileType}', FROM_UNIXTIME({$upload})) ON DUPLICATE KEY 
    UPDATE latestUpload=FROM_UNIXTIME({$upload})");
    }
}
// pro files
$proFiles = array_diff(scandir($path . "/SIBA"), array('..', '.'));
foreach ($proFiles as $file) {
    preg_match('/[A-Za-z]+(\d+)\.(\w+)/', $file, $matches);
    $teamID = $matches[1];
    $fileType = $matches[2];
    $upload = filemtime($path . '/SIBA/' . $file);

    // checking to see if the read file has a later upload date
    $res = $mysqli->query("SELECT * FROM pro_team_uploads 
    WHERE teamID={$teamID} AND fileType='{$fileType}' AND latestUpload >= FROM_UNIXTIME({$upload})");

    // Add/Update the file's upload time since the previous query didn't find a match
    if (!$res->num_rows) {
        echo "Inside if";
        $mysqli->query("INSERT INTO college_team_uploads (teamID, fileType, latestUpload) 
    VALUES({$teamID},'{$fileType}', FROM_UNIXTIME({$upload})) ON DUPLICATE KEY 
    UPDATE latestUpload=FROM_UNIXTIME({$upload})");
    }
}
