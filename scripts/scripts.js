var IGNENDPOINTS = {
	articles:"http://apis.ign.com/article/v3/articles/search?format=js&callback=?&variable=var&q=",
	images:"http://apis.ign.com/image/v3/images/search?format=js&callback=?&variable=var&q=",
	video:"http://video-api.ign.com/v3/videos/search?format=js&callback=?&variable=var&q="
};

var sampleMeta = '{"matchRule":"matchAll","count":25,"startIndex":0,"networks":"ign","states":"published","sortBy":"metadata.publishDate","sortOrder":"desc","rules":[{"field":"metadata.articleType","condition":"is","value":"article"},{"field":"categoryLocales","condition":"contains","value":"us"},{"field":"tags","condition":"containsOne","value":"vita,ps3"}]}';
var encodedMeta = encodeURI(sampleMeta);
var articlesUrl = IGNENDPOINTS.articles+encodedMeta;

$.getJSON(articlesUrl,
	function(data){
		$('#wrapper').append(data.count);
	});

$(document).ready(
	function(){
		chrome.browserAction.setBadgeText({text:String('')});

		// GET OPTIONS
		// BUILD LIST
		buildList();
});

function buildList(){

	// GET ARTICLES
	$.getJSON(articlesUrl,
		function(response){
			data = response.data;
			for (i = 0; i < data.length; i++)
			{
				full = split(data.metadata.publishDate,"T");
				headline = data.metadata.headline;
				date = split(date,"-");
				year = date[0];
				month = date[1];
				day = date[2];
				$('#listView ul').append('<li><a target="_blank" href="http://www.ign.com/articles/'+'">'+headline+'</a></li>');
				console.log(data[i]);
			}
		});
		// GET IMAGES
	// GET VIDEOS
	
}