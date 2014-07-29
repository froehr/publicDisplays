<?php

require_once 'rss_php/rss_php.php';    

$rss = new rss_php;
$rss->load('http://www.spiegel.de/sport/index.rss');    
$rss = json_encode($rss->getRSS());

echo $rss; 

?>