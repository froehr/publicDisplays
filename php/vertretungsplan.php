<?php
// Input Datei aus Vertretungsplansystem
$file = file_get_contents('GPU014.TXT');

// Input File an Zeilenumbruch trennen und in Array schreiben
$csv = explode(chr(10), $file);

// Jede Zeile mit str_getcsv verarbeiten um jedes Element in eigenem Arrayfeld zu speichern
$i = 0;
while($i < sizeof($csv)) { 
    $input_array[$i] = str_getcsv($csv[$i], ';');
    $i++;
}

// Datum fŸr heute laden um nur aktuelle Meldungen zu zeigen
$today = date('Ymd' ,time());

// Die Zeilen auswŠhlen, die den heutigen Tag betreffen
$result_array = [];
$i = 0;
$j = 0;
while($i < sizeof($input_array)-1) {
    // Wenn der Eintrag des gŸltigen Datums zum heutigen Datum passt wird diese Zeile im $result_array gespeichert um spŠter weiterverarbeitet zu werden
    if($today == $input_array[$i][1]) {
        $result_array[$j] = $input_array[$i];
        $j++; 
    }
    $i++;
}

// Array mit Namen fŸr JSON aufbauen
$to_json_array = [];
$k = 0;
while($k < sizeof($result_array)) {
    $to_json_array[$k]["datum"] = $result_array[$k][1];
    $to_json_array[$k]["stunde"] = $result_array[$k][2];
    $to_json_array[$k]["lehrer"] = $result_array[$k][5];
    $to_json_array[$k]["vertreter"] = $result_array[$k][6];
    $to_json_array[$k]["fach"] = $result_array[$k][7];
    $to_json_array[$k]["vertretungsfach"] = $result_array[$k][9];
    $to_json_array[$k]["raum"] = $result_array[$k][11];
    $to_json_array[$k]["vertretungsraum"] = $result_array[$k][12];
    $to_json_array[$k]["klasse"] = $result_array[$k][14];
    $k++;
}

// RŸckgabe des JSON Arrays an JavaScript
echo json_encode($to_json_array);
?>