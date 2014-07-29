<<<<<<< HEAD
function getSport() {
	
    var Action;

    $.ajax({
        type: "POST",
        url: 'php/sport.php',
        dataType: 'json',
        data: {Action:'GetAll'},
        success: function(data) {
            showSportNews(data);
        },
        error: function(textStatus, error){
        console.log(textStatus);
    	console.log(error);
        }
            
    });
}

function getTagesschau() {
    
    var Action;

    $.ajax({
        type: "POST",
        url: 'php/tagesschau.php',
        dataType: 'json',
        data: {Action:'GetAll'},
        success: function(data) {
            showTagesschauNews(data);
        },
        error: function(textStatus, error){
        console.log(textStatus);
        console.log(error);
        }
            
    });
}

getSport();
getTagesschau();
=======
$.getJSON('php/vertretungsplan.php', function(data) {
	$.each(data, function(key, val) {
		var style = '';
		if ( key % 2 == 0 ) { style = ' class="grey"'; }
		var row = 	'<tr>' +
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
		$('#vertretungsplan').append(row);
	});
	animateTheTable(data.length, 'up');
});
>>>>>>> Vertretungsplan wird angezeigt und ist animiert
