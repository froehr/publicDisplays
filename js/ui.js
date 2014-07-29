<<<<<<< HEAD
function showSportNews(data) {

	
	var sport_news_html = '';
	data = data.rss.channel;

	for (i=0; i<=2; i++) {
		var index = 'item:' + i;
		sport_news_html += '<b>' + data[index].title + '</b><div>' + data[index].description + '</div></br>';
	}

	$('#sport').append(sport_news_html);

}

function showTagesschauNews(data) {

	
	var sport_news_html = '';
	data = data.rss.channel;
	console.log(data);

	for (i=0; i<=2; i++) {
		var index = 'item:' + i;
		sport_news_html += '<b>' + data[index].title + '</b><div>' + data[index].description + '</div></br>';
	}
	
	$('#tagesschau').append(sport_news_html);

=======
var date = new Date();  
var dd = date.getDate();  
var mm = date.getMonth() + 1;  
var yy = date.getYear() + 1900;  
$('#vertretungsplan-head').append(dd + '.' + mm + '.' + yy);

function animateTheTable(rows, direction) {
	var timeScroll = rows * 400;
	
	var height = 0;
	var newDirection = 'down';
	if ( direction == 'up' ) {
		height = parseInt($('#vertretungsplan').height()) - parseInt($('#left').height()) + 50;
		height = -height;
		newDirection = 'down';
	}
	else if ( direction == 'down' ) {
		height = 0;
		newDirection = 'up';
	}
	
    setTimeout(function() {
		$('#vertretungsplan').animate({top: height + 'px'}, timeScroll, 'linear', function() {
			setTimeout(function() {
				animateTheTable(rows, newDirection);
			}, 3000);
		});
	}, 3000);
>>>>>>> Vertretungsplan wird angezeigt und ist animiert
}