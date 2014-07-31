

var date = new Date();  
var dd = date.getDate();  
var mm = date.getMonth() + 1;  
var yy = date.getYear() + 1900;  
$('#vertretungsplan-head').append(dd + '.' + mm + '.' + yy);

function animateTheTable(rows, direction) {
	var timeScroll = rows * 400;
	
	var height = 0;
	if ( direction == 'up' ) {
		height = parseInt($('#vertretungsplan').height()) - parseInt($('#left').height()) + 50;
		height = -height;
		direction = 'down';
	}
	else if ( direction == 'down' ) {
		height = 0;
		direction = 'up';
	}
	
    setTimeout(function() {
		$('#vertretungsplan').animate({top: height + 'px'}, timeScroll, 'linear', function() {
			setTimeout(function() {
				animateTheTable(rows, direction);
			}, 3000);
		});
	}, 3000);
}

function showSportNews(data) {
	var sport_news_html = ''; //leerer HTML String für Sport News
	data = data.rss.channel; //JSON begrenzen auf Newsdaten
	var i = 0; //index
	
	$.each(data, function(key, val) {

		//HTML für letzten 3 News zusammensetzen
		if (i > 6 && i < 10) { 
			var index = 'item:' + i;
			sport_news_html += '<b>' + val.title + '</b><p>' + val.description + '</p>';
		}
		i++;
		
	});	
	$('#sport').append('<div style="padding: 5px;">' + sport_news_html + '</div>'); //HTML in das tagesschau-div setzen
}

function showTagesschauNews(data) {
	var sport_news_html = ''; //leerer HTML String für Sport News
	data = data.rss.channel; //JSON begrenzen auf Newsdaten
	var i = 0; //index
	
	$.each(data, function(key, val) {

		//HTML für letzten 3 News zusammensetzen
		if (i > 7 && i < 11) {
			sport_news_html += '<b>' + val.title + '</b><p>' + val.description + '</p>';
		}	
		i++;

	});	
	$('#tagesschau').append('<div style="padding: 5px;">' + sport_news_html + '</div>'); //HTML in das tagesschau-div setzen
}

function showWeather(data) {
	data = data['list']; //Wetterdaten-JSON auf tatsächliche Daten begrenzen

	var weather_table_content_html = ''; //Leerer HTML String
	var tag = 'Heute:';
	$.each(data, function(key, val) {
		//HTML Tabelle für Wetterprognose für 'Heute' und 'Morgen' erstellen
		if (key < 2) {
			weather_table_content_html += '<tr><td><b>' + tag + '</b></td>' +
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
			tag = 'Morgen:'; //Für zweiten Durchlauf auf 'Morgen setzen'							
			
		}								
	});

	//Tabelleninhalt füllen
	var weather_html =	'<table>' +
						weather_table_content_html + 	
					'</table>';
					
	$('#wetter').append(weather_html);				
} 

//Feeds aufrufen
getSport();
getTagesschau();
getWeather();