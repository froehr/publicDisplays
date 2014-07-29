

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
	var sport_news_html = '';
	data = data.rss.channel;

	for (i=0; i<=2; i++) {
		var index = 'item:' + i;
		sport_news_html += '<b>' + data[index].title + '</b><p>' + data[index].description + '</p>';
	}

	$('#sport').append('<div style="padding: 5px;">' + sport_news_html + '</div>');
}

function showTagesschauNews(data) {
	var sport_news_html = '';
	data = data.rss.channel;

	for (i=0; i<=2; i++) {
		var index = 'item:' + i;
		sport_news_html += '<b>' + data[index].title + '</b><p>' + data[index].description + '</p>';
	}

	$('#tagesschau').append('<div style="padding: 5px;">' + sport_news_html + '</div>');

}