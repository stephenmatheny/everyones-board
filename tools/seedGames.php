<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "Co4jW2GR%2QzWnC@";
$database = "board_game";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// URL to scrape data from
$url = "https://boardgamegeek.com/browse/boardgame/page/2";
    
// // Define the file path for the new HTML file
// $htmlFilePath = __DIR__ . '/appended_content.html';

// // Open or create a new HTML file for appending
// $file = fopen($htmlFilePath, 'a');

// Function to scrape and seed data
function seedGames($url, $conn, $file) {
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
                    $imageSrc = '';
                    $gameTitle = '';
                    $gameDescription = '';

                    // Iterate through meta tags
                    foreach ($metaTags as $meta) {
                        // Check if the meta tag has the name attribute "twitter:image:src"
                        if ($meta->getAttribute('property') === 'og:image') {
                            // Get the content attribute value
                            $imageSrc = $meta->getAttribute('content');
                        }
                        if($meta->getAttribute('property') === 'og:title') {
                            // Get the content attribute value
                            $gameTitle = $meta->getAttribute('content');
                        }
                        if($meta->getAttribute('property') === 'og:description') {
                            // Get the content attribute value
                            $gameDescription = $meta->getAttribute('content');
                        }
                    }
                    insertGameData($conn, $gameTitle, $gameDescription, $imageSrc);
                    
                    curl_close($newCurl);
                }
            }
        } catch (e) {
            echo "error\n";
            continue;
        }
    }
    // fclose($file);
    
}

// Function to insert game data into the database
function insertGameData($conn, $gameTitle, $gameDescription, $imageSrc) {
    // Prepare SQL query to insert data into the game table
    $sql = "INSERT INTO game (title, description, image_url) VALUES (?, ?, ?)";
    
    // Prepare the statement
    $stmt = $conn->prepare($sql);
    
    // Bind parameters
    $stmt->bind_param("sss", $gameTitle, $gameDescription, $imageSrc);
    
    // Execute the statement
    if ($stmt->execute()) {
        echo "Record inserted successfully: $gameTitle\n";
    } else {
        echo "Error inserting record: " . $stmt->error;
    }
    
    // Close the statement
    $stmt->close();
}

// Call the scrapeAndSeed function
seedGames($url, $conn, $file = null);

// Close database connection
$conn->close();
?>
