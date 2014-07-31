<?php
// Input Datei aus Vertretungsplansystem
$file = file_get_contents('GPU014.TXT');

// Input File an Zeilenumbruch trennen und in Array schreiben
$csv = explode(chr(10), $file);

// Jede Zeile mit str_getcsv verarbeiten um jedes Element in eigenem Arrayfeld zu speichern
$i = 0;
while ( $i < sizeof($csv) ) { 
    $input_array[$i] = str_getcsv($csv[$i], ';');
    $i++;
}

// Datum für heute laden um nur aktuelle Meldungen zu zeigen
$today = date('Ymd', time());
$today='20140605';

// Die Zeilen auswählen, die den heutigen Tag betreffen
$result_array = [];
$i = 0;
$j = 0;
while ( $i < sizeof($input_array)-1 ) {
    // Wenn der Eintrag des gültigen Datums zum heutigen Datum passt wird diese Zeile im $result_array gespeichert um später weiterverarbeitet zu werden
    if ( $today == $input_array[$i][1] ) {
        $result_array[$j] = $input_array[$i];
        $j++; 
    }
    $i++;
}

// Array mit Namen für JSON aufbauen
$to_json_array = [];
$k = 0;
while ( $k < sizeof($result_array) ) {
	$date = $result_array[$k][1];
    $to_json_array[$k]["datum"] = date('d.m.Y', mktime(0, 0, 0, $date[4] . $date[5], $date[6] . $date[7], $date[0] . $date[1] . $date[2] . $date[3]));
    $to_json_array[$k]["stunde"] = utf8_encode($result_array[$k][2]);
    $to_json_array[$k]["lehrer"] = utf8_encode($result_array[$k][5]);
    $to_json_array[$k]["vertreter"] = utf8_encode($result_array[$k][6]);
    $to_json_array[$k]["fach"] = utf8_encode($result_array[$k][7]);
    $to_json_array[$k]["vertretungsfach"] = utf8_encode($result_array[$k][9]);
    $to_json_array[$k]["raum"] = utf8_encode($result_array[$k][11]);
    $to_json_array[$k]["vertretungsraum"] = utf8_encode($result_array[$k][12]);
    $to_json_array[$k]["klasse"] = str_replace('~', ', ', utf8_encode($result_array[$k][14]));
    $k++;
}

// Rückgabe des JSON Arrays an JavaScript
echo json_encode($to_json_array);
?>