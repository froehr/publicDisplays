<?php
// RSS_PHP einbinden
require_once 'rss_php/rss_php.php';

// SPIEGEL Sport News laden und als JSON kodieren
$rss = new rss_php;
$rss->load('http://www.spiegel.de/sport/index.rss');    
$rss = json_encode($rss->getRSS());

// JSON ausgeben
echo $rss;
?>