<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "Co4jW2GR%2QzWnC@";
$database = "board_game";

error_reporting(E_ERROR | E_PARSE);
ini_set('max_execution_time', 21600);

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
    
// // Define the file path for the new HTML file
// $htmlFilePath = __DIR__ . '/appended_content.html';

// // Open or create a new HTML file for appending
// $file = fopen($htmlFilePath, 'a');

// Function to scrape and seed data
function apiCall($conn) {
    try {
        $bggGameList = getBggGameList($conn);
        foreach($bggGameList as $bggGame) {
            // URL of the API endpoint
            $apiUrl = "https://boardgamegeek.com/xmlapi2/thing?id=$bggGame[0]";
    
            // Perform the request and get the XML response
            $xmlResponse = file_get_contents($apiUrl);
    
            // Parse the XML response
            $xml = simplexml_load_string($xmlResponse);
            insertGameData($conn, $xml, $bggGame[0]);
        }
    } catch (e) {
        
    }
    echo "\ncomplete\n";
    return;
}

// Function to insert game data into the database
function getBggGameList($conn) {
    $sql = <<<SQL
                SELECT bgg_id
                FROM game
                WHERE year_published = 0
            SQL;

    // Prepare the statement
    $stmt = $conn->prepare($sql);
    
    $stmt->execute();
    $bggGameList = $stmt->get_result()->fetch_all();
    $stmt->close();

    return $bggGameList;
}

// Function to insert game data into the database
function insertGameData($conn, $xml, $gameId) {
    // Access specific elements from the response
    $thumbnail = (string) $xml->item->thumbnail;
    $image = (string) $xml->item->image;
    $description = (string) $xml->item->description;
    $yearPublished = (int) $xml->item->yearpublished['value'];
    $minPlayers = (int) $xml->item->minplayers['value'];
    $maxPlayers = (int) $xml->item->maxplayers['value'];
    $playingTime = (int) $xml->item->playingtime['value'];
    $minAge = (int) $xml->item->minage['value'];
    $gameTitle = $otherInfo['title'];

    // Prepare SQL query to insert data into the game table

    /** */
    $sql = <<<SQL
                UPDATE game
                SET
                    year_published = ?,
                    min_players = ?,
                    max_players = ?,
                    playing_time = ?,
                    age_rating = ?,
                    long_description = ?
                WHERE bgg_id = ?
            SQL;

        // Prepare the statement
        $stmt = $conn->prepare($sql);

        // Bind parameters
        $stmt->bind_param("iiiiisi",
            $yearPublished,
            $minPlayers,
            $maxPlayers,
            $playingTime,
            $minAge,
            $description,
            $gameId
        );

    try {
        // Execute the statement
        if ($stmt->execute()) {
            // echo "$gameId inserted\n";
        } else {
            // echo "$gameId failed\n";
        }
    } catch (e) {
        return;
    }
    
    // Close the statement
    $stmt->close();
}

// Call the scrapeAndSeed function
apiCall($conn);

// Close database connection
$conn->close();
?>
