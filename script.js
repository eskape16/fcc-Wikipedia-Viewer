
$(document).ready(function() {
	var value, i, url, data, obj, title, hyperlink,snippet, imgSource;
		
	function showResult (data) {
		$('.render-results').empty();
		$('.msg').empty();
		if(data.query.search.length > 0) { 
			for( i = 0; i< 10; i++) {
				title = data.query.search[i].title;
				snippet = data.query.search[i].snippet;
				appendHtml(title, snippet, i);
			}	
		} else {
			$('.msg').html("No results found!");
		}
	};
	function appendHtml (title, snippet, i) {
		$.ajax ( {
			url: "https://en.wikipedia.org/w/api.php?action=query&titles="+title+"&prop=pageimages&format=json&pithumbsize=300",
			data: obj,
			dataType: 'JSONP',
			type: 'GET',
			headers: { 'Api-User-Agent': 'Example/1.0' },
			success: function(obj) {
				console.log(obj);
				var imgSource = '';
				if (obj.query.pages) {
					for (var i in obj.query.pages) {
					imgSource = obj.query.pages[i].thumbnail.source;
					}
				}
				renderItem(title, snippet, imgSource, i);
			}
		}	
					 );
			};
	
	function renderItem(title, snippet, imgSource, i) {
		var hyperlink = "https://en.wikipedia.org/wiki/"+title;
		$('.render-results').append(
				'<a target="_blank" href="' + hyperlink +'"><div class="row"><div class = "col-sm-2 col-xs-2"><img id = "img_'+i+'" class="img-thumbnail img-responsive wiki-img" src="'+imgSource+'" alt="Main Wikipedia picture for '+title+'"></div><div class="item col-xs-6 col-sm-8"><h4 class="title">'+title+'</h4><p class = "snippet">' +snippet+'</p></div></div></a>');
	}
	
	function searchWikipedia(){
		value = $('input').val();
		value = value.trim().replace(/\s+/g, '+');
		//console.log(value);
		url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" 
				+ value + "&prop=info&inprop=url&utf8=&format=json";
		//console.log(url);

		$.ajax( {
    	url: url,
    	data: data,
    	dataType: 'JSONP',
    	type: 'POST',
    	headers: { 'Api-User-Agent': 'Example/1.0' },
    	success: function(data) {
			
      	//console.log(data);
				showResult(data);
    					}
					});
	
};
	
	$('.random').on("click", function(){
		$.ajax( {
    url: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&prop=pageimages&rnlimit=3&pithumbsize=250",
    data: data,
    dataType: 'JSONP',
    type: 'POST',
    headers: { 'Api-User-Agent': 'Example/1.0' },
    success: function(data) {
			
			//console.log(data);
			$(".render-results").empty();
			for(i=0; i<3; i++) {
				title = data.query.random[i].title;
				hyperlink = "https://en.wikipedia.org/wiki/"+title;
				$(".render-results").append(
					'<br/><button type="button" target="_blank" href="'+hyperlink+'" class="item-random">'+title+'</button>');
			}
			
			$(".render-results").append('<figure><img class="img-responsive img-thumbnail wiki-img-random" src="https://static.pexels.com/photos/46274/pexels-photo-46274.jpeg" alt="Random Article Picture Represents Book"><figcaption class = "caption"><i>"Learning is not attained by chance,<br/>it must be sought for with ardor and diligence"</i></figcaption></figure>');
    }
} );
	});
	$('.search').on("click", searchWikipedia);
	$('input').keypress(function(event) {
    if (event.which == 13)  {
			searchWikipedia();
		};

});

//ToDo - 
	//ajax errors..?, 

});