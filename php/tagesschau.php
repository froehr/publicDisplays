<?php

require_once 'rss_php/rss_php.php';    

$rss = new rss_php;
$rss->load('http://www.tagesschau.de/xml/rss2');    
$rss = strip_tags(json_encode($rss->getRSS()));
$rss = str_replace("\\n", "", $rss);

echo $rss; 

?>