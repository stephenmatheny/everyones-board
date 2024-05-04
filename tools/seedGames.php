<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "Co4jW2GR%2QzWnC@";
$database = "board_game";

error_reporting(E_ERROR | E_PARSE);

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
function seedGames($conn) {
    $page = 1;
    while($page <= 1542) {
        // URL to scrape data from
        $url = "https://boardgamegeek.com/browse/boardgame/page/$page";
        // Initialize cURL session
        $curl = curl_init($url);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($curl);

        // Check for errors
        if (!$response) {
            die('Error: "' . curl_error($curl) . '" - Code: ' . curl_errno($curl));
        }

        // Close cURL session
        curl_close($curl);

        // Create a DOMDocument object
        $dom = new DOMDocument();
        @$dom->loadHTML($response);

        // Get all table rows
        $rows = $dom->getElementsByTagName('tr');
        $i = 1;
        $x = true;
        // Iterate through rows
        foreach ($rows as $row) {
            try {
                // Get data from each row
                $cells = $row->getElementsByTagName('td');
                foreach ($cells as $cell) {
                    if ($cell->getAttribute('id') === "CEcell_objectname$i") {
                        $link = $cell->getElementsByTagName('a')->item(0);
                        // Get the value of the 'href' attribute
                        $href = $link->getAttribute('href');
                        $newUrl = "https://boardgamegeek.com$href";

                        preg_match_all('/(\d+)/', $href, $matches);

                        $gameId = $matches[0][0];

                        // URL of the API endpoint
                        $apiUrl = "https://boardgamegeek.com/xmlapi2/thing?id=$gameId";

                        // Perform the request and get the XML response
                        $xmlResponse = file_get_contents($apiUrl);

                        // Parse the XML response
                        $xml = simplexml_load_string($xmlResponse);

                        $i++;
                        // Initialize cURL session
                        $newCurl = curl_init($newUrl);

                        curl_setopt($newCurl, CURLOPT_RETURNTRANSFER, true);
                        curl_setopt($newCurl, CURLOPT_SSL_VERIFYPEER, false);
                        $newResponse = curl_exec($newCurl);

                        // Check for errors
                        if (!$newResponse) {
                            continue;
                        }

                        $dom2 = new DOMDocument();
                        @$dom2->loadHTML($newResponse);
                        // if($x == true) {
                        //     fwrite($file, $dom2->saveHTML());
                        //     $x = false;
                        // }

                        // Get all meta tags
                        $metaTags = $dom2->getElementsByTagName('meta');

                        // Initialize variable to store the src URL
                        $otherInfo = [];

                        // Iterate through meta tags
                        foreach ($metaTags as $meta) {
                            // Check if the meta tag has the name attribute "twitter:image:src"
                            if ($meta->getAttribute('property') === 'og:image') {
                                // Get the content attribute value
                                $otherInfo['imageUrl'] = $meta->getAttribute('content');
                            }
                            if($meta->getAttribute('property') === 'og:title') {
                                // Get the content attribute value
                                $otherInfo['title'] = $meta->getAttribute('content');
                            }
                            if($meta->getAttribute('property') === 'og:description') {
                                // Get the content attribute value
                                $otherInfo['description'] = $meta->getAttribute('content');
                            }
                        }

                        $otherInfo['bggId'] = $gameId;
                        insertGameData($conn, $xml, $otherInfo);
                        
                        curl_close($newCurl);
                    }
                }
            } catch (e) {
                continue;
            }
        }
        // fclose($file);
        $page++;
    }
    return;
}

// Function to insert game data into the database
function insertGameData($conn, $xml, $otherInfo) {
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
                INSERT INTO game (
                    bgg_id,
                    title,
                    description,
                    long_description,
                    year_published,
                    min_players,
                    max_players,
                    playing_time,
                    age_rating,
                    image_url
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            SQL;

        // Prepare the statement
        $stmt = $conn->prepare($sql);

        // Bind parameters
        $stmt->bind_param("isssisiiis",
            $otherInfo['bggId'],
            $gameTitle,
            $otherInfo['description'],
            $description,
            $yearPublished,
            $minPlayers,
            $maxPlayers,
            $playingTime,
            $minAge,
            $otherInfo['imageUrl']
        );

    try {
        // Execute the statement
        if ($stmt->execute()) {

        } else {
            echo "$gameTitle,";
        }
    } catch (e) {
        return;
    }
    
    // Close the statement
    $stmt->close();
}

// Call the scrapeAndSeed function
seedGames($conn);

// Close database connection
$conn->close();
?>
