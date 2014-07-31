$.getJSON('php/vertretungsplan.php', function(data) {
	showVertretungsplan(data);
});

$.getJSON('php/schulnews.php', function(data) {
	showSchulnews(data);
});

$.getJSON('php/sport.php', function(data) {
	showSportNews(data);
});

$.getJSON('php/tagesschau.php', function(data) {
	showTagesschauNews(data);
});

$.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?lat=51.975942&lon=7.415683&cnt=10&units=metric&mode=json&lang=de', function(data) {
	showWeather(data); 
});