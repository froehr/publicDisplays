<?php

// PDF Datei von Schule Sever laden
$contents = file_get_contents('http://www.gesamtschule.havixbeck.de/media/mensa/mensaplan.pdf');

// PDF als Datei auf Server speichern, damit sie fŸr weitere Verarbeitung zur VerfŸgung steht
$savefile = fopen("../img/mensaplan.pdf", "w");
fwrite($savefile, $contents);
fclose($savefile);

// Datei per Shell in ein PNG konvertieren. Das Bild wird in der index.html auf der Seite eingebunden
shell_exec('convert img/mensaplan.pdf.pdf img/mensaplan.png');
?>