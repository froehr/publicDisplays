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

}