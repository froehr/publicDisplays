// Seite alle 5 Minuten neu laden
setTimeout(function () { location.reload(true); }, 5 * 60 * 1000);

// Datum an die Überschrift des Vertretungsplans anhängen
var date = new Date();  
var dd = date.getDate();  
var mm = date.getMonth() + 1;  
var yy = date.getYear() + 1900;  
$('#vertretungsplan-head').append(dd + '.' + mm + '.' + yy);

// Vertretungsplandaten anzeigen
function showVertretungsplan(data) {
	// alle Zeilen des aktuellen Vertretungsplans durchgehen
	$.each(data, function(key, val) {
		// Für jede zweite Zeile den Hintergrund färben
		var style = '';
		if ( key % 2 == 0 ) { style = ' class="grey"'; }
		
		// Tabellenzeile schreiben und mit Werten füllen
		var row =
			'<tr>' +
				'<td width="10%"' + style + '>' + val.datum + '</td>' +
				'<td width="7%" align="center"' + style + '>' + val.fach + '</td>' +
				'<td width="8%" align="center"' + style + '>' + val.stunde + '</td>' +
				'<td width="20%"' + style + '>' + val.klasse + '</td>' +
				'<td width="11%" align="center"' + style + '>' + val.lehrer + '</td>' +
				'<td width="11%" align="center"' + style + '>' + val.raum + '</td>' +
				'<td width="11%" align="center"' + style + '>' + val.vertretungsfach + '</td>' +
				'<td width="11%" align="center"' + style + '>' + val.vertreter + '</td>' +
				'<td width="11%" align="center"' + style + '>' + val.vertretungsraum + '</td>' +
			'</tr>';
		
		// Tabellenzeile anhängen
		$('#vertretungsplan').append(row);
	});
	
	// Scroll-Animation der Tabelle starten
	animateTheTable(data.length, 'up');
}

// Scroll-Animation für Vertretungsplan-Tabelle
function animateTheTable(rows, direction) {
	// Dauer der Animation der Anzahl der Zeilen anpassen
	var timeScroll = rows * 400;
	
	// Wert für die Stelle festlegen, an die gescrollt werden soll
	var top = 0;
	
	// Scroll-Richtung nach oben
	if ( direction == 'up' ) {
		// oberes Ende der Tabelle an den negativen Wert der Differenz der Höhe der Tabelle und der Höhe der #left-Box schieben
		top = parseInt($('#vertretungsplan').height()) - parseInt($('#left').height());
		top = -top;
		
		// Richtung für nächsten Durchlauf umkehren
		direction = 'down';
	}
	// Scroll-Richtung nach unten
	else if ( direction == 'down' ) {
		// oberes Ende der Tabelle an Punkt 0 schieben
		top = 0;
		
		// Richtung für den nächsten Durchlauf umkehren
		direction = 'up';
	}
	
	// Animation nach 3 Sekunden starten
    setTimeout(function() {
		// lineare Scroll-Animation in vertikaler Richtung
		$('#vertretungsplan').animate({top: top + 'px'}, timeScroll, 'linear', function() {
			// nach der Animation 3 Sekunden warten, danach nächsten Animationsdurchlauf starten
			setTimeout(function() {
				animateTheTable(rows, direction);
			}, 3000);
		});
	}, 3000);
}

// Schulneuigkeiten anzeigen
function showSchulnews(data) {
	var schulnews_html = '';
	
	// jeden Eintrag des Datensatzes durchgehen
	$.each(data, function(key, val) {
		// Stelle des ersten Punktes im Text
		var posDot = val.news.indexOf('.') + 1;
		
		// Stelle des ersten Doppelpunktes im Text
		var posColon = val.news.indexOf(':') + 1;
		
		// Festellen, ob zuerst der Punkt oder der Doppelpunkt vorkommmt und Stelle des ersten Vorkommens merken
		var pos = 0;
		if ( posDot < posColon || posColon == 0 ) {
			pos = posDot;
		}
		else {
			pos = posColon;
		}
		
		// Part 1 ist der Text bis zum ersten Vorkommen des Punktes/Doppelpunktes
		var part1 = val.news.substr(0, pos);
		// Part 2 ist der Text nach dem ersten Vorkommen des Punktes/Doppelpunktes
		var part2 = val.news.substr(pos, val.news.length - pos);
		
		// Part 1 fett markieren
		schulnews_html += '<b>' + part1 + '</b><p>' + part2 + '</p>';
	});
	
	// Schulneuigkeiten um Datensatz erweitern
	$('#schulnews').append('<div style="padding: 5px;">' + schulnews_html + '</div>');
}

function showSportNews(data) {
	// leerer HTML String für Sport News
	var sport_news_html = '';
	
	// JSON begrenzen auf Newsdaten
	data = data.rss.channel;
	var i = 0;
	
	$.each(data, function(key, val) {
		// HTML für letzten 3 News zusammensetzen
		if ( i > 6 && i < 10 ) { 
			var index = 'item:' + i;
			sport_news_html += '<b>' + val.title + '</b><p>' + val.description + '</p>';
		}
		i++;
		
	});
	
	// HTML in das tagesschau-div setzen
	$('#sport').append('<div style="padding: 5px;">' + sport_news_html + '</div>');
}

function showTagesschauNews(data) {
	// leerer HTML String für Sport News
	var sport_news_html = '';
	
	// JSON begrenzen auf Newsdaten
	data = data.rss.channel;
	var i = 0;
	
	$.each(data, function(key, val) {
		// HTML für letzten 3 News zusammensetzen
		if ( i > 7 && i < 11 ) {
			sport_news_html += '<b>' + val.title + '</b><p>' + val.description + '</p>';
		}	
		i++;
	});
	
	// HTML in das tagesschau-div setzen
	$('#tagesschau').append('<div style="padding: 5px;">' + sport_news_html + '</div>');
}

function showWeather(data) {
	// Wetterdaten-JSON auf tatsächliche Daten begrenzen
	data = data['list'];

	var weather_table_content_html = ''; //Leerer HTML String
	var tag = 'Heute';
	$.each(data, function(key, val) {
		// HTML Tabelle für Wetterprognose für 'Heute' und 'Morgen' erstellen
		if ( key < 2 ) {
			weather_table_content_html +=
				'<tr><td><b>' + tag + '</b></td>' +
					'<td><img src="http://openweathermap.org/img/w/' + val['weather'][0].icon + '.png" /><td>' +
				'</tr>' +
				'<tr>' +
					'<td>Temperatur:</td>' +
					'<td>' + val['temp'].day + '°C' + 
					'</td>' +
				'</tr>' +
				'<tr>' +
					'<td>Luftfeuchtigkeit:</td>' +
					'<td>' + val.humidity + '%' +'</td>' +
				'</tr>' +
				'<tr>' +
					'<td>Luftdruck:</td>' + 
					'<td>' + val.pressure + ' hPa' + '</td>' +
				'</tr>' +
				'<tr>' +
					'<td>Wingeschwindigkeit:</td>' +
					'<td>' + val.speed + ' m/s' + '</td>' +
				'</tr>' +
				'<tr>' +
					'<td>Witterung:</td>' + 
					'<td>' +
						val['weather'][0].description +
					'</td>' +
				'</tr>';
			
			// Für zweiten Durchlauf auf 'Morgen setzen'
			tag = 'Morgen';
		}								
	});

	// Tabelleninhalt füllen
	var weather_html =
		'<table>' +
			weather_table_content_html + 	
		'</table>';
					
	$('#wetter').append(weather_html);				
}