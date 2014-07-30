<?php
    
    $file = file_get_contents('http://www.gesamtschule.havixbeck.de/');
    
    function get_string_between($string, $start, $end){
        $string = " ".$string;
        $ini = strpos($string,$start);
        if ($ini == 0) {
            return "";
        }
        
        $ini += strlen($start);
        $len = strpos($string,$end,$ini) - $ini;
        return substr($string,$ini,$len);
    }

$parsed = get_string_between($file, '<table width="100%" cellspacing="1" cellpadding="1" border="0">', '</table>');
//echo $parsed;

$url = 'http://www.gesamtschule.havixbeck.de/';
$content = file_get_contents($url);
        
$dom = new DOMDocument;
@$dom->loadHTML($content); // suppress parsing/invalid html errors
$table = $dom->getElementsByTagName('table')->item(0); // first table = data value table
$tbody = $table->getElementsByTagName('tbody')->item(0);
$rows = $tbody->getElementsByTagName('tr');

for ($i = 0; $i < $rows->length; $i++) {
	$cols[$i] = $rows->item($i)->getElementsByTagName('td');
}

       
$i = 0;

while($i < sizeof($cols)) {
    $to_json_array[$i]['news'] = chop(ltrim(htmlentities($cols[$i]->item(1)->nodeValue)));
    $i++;
}

echo json_encode($to_json_array);

?>
    