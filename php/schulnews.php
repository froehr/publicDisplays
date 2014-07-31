<?php
// Quelltext der Schul-Website als String einholen
$content = file_get_contents('http://www.gesamtschule.havixbeck.de/');

// Inhalt als DOMDocument laden
$dom = new DOMDocument;

// Fehler beim Parsen des HTML mit @ unterdrücken, HTML parsen
@$dom->loadHTML($content);

// erste Tabelle ist die Tabelle mit Neuigkeiten, speichere alle Zeilen der Tabelle in $rows
$table = $dom->getElementsByTagName('table')->item(0);
$tbody = $table->getElementsByTagName('tbody')->item(0);
$rows = $tbody->getElementsByTagName('tr');

// Alle Tabellenzellen durchgehen
for ( $i = 0; $i < $rows->length; $i++ ) {
	$cols = $rows->item($i)->getElementsByTagName('td');
	$to_json_array[$i]['news'] = chop(ltrim(htmlentities($cols->item(1)->nodeValue)));
}

// Ausgabe des Arrays als JSON
echo json_encode($to_json_array);
?>
    