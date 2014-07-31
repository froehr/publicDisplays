<?php
// RSS_PHP einbinden
require_once 'rss_php/rss_php.php';    

// Tagesschau Neuigkeiten laden und als JSON kodieren
$rss = new rss_php;
$rss->load('http://www.tagesschau.de/xml/rss2');    
$rss = strip_tags(json_encode($rss->getRSS()));

// alle Zeilenumbrüche löschen
$rss = str_replace('\\n', '', $rss);

// JSON ausgeben
echo $rss;
?>