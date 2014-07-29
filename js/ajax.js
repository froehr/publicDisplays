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