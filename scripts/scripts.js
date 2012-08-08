var IGNENDPOINTS = {
	articles:"http://apis.ign.com/article/v3/articles/search?format=js&callback=?&variable=var&q=",
	images:"http://apis.ign.com/image/v3/images/search?format=js&callback=?&variable=var&q=",
	video:"http://video-api.ign.com/v3/videos/search?format=js&callback=?&variable=var&q="
};

var sampleMeta = '{"matchRule":"matchAll","count":10,"startIndex":0,"networks":"ign","states":"published","sortBy":"metadata.publishDate","sortOrder":"desc","rules":[{"field":"metadata.articleType","condition":"is","value":"article"},{"field":"categoryLocales","condition":"contains","value":"us"},{"field":"tags","condition":"containsOne","value":"vita,ps3"}]}';
var encodedMeta = encodeURI(sampleMeta);
var articlesUrl = IGNENDPOINTS.articles+encodedMeta;

var videoMeta = '{"matchRule":"matchAny","count":25,"startIndex":0,"networks":"ign","states":"published","sortBy":"metadata.publishDate","sortOrder":"desc","rules":[{"field":"tags","condition":"containsOne","value":"xbox-360"},{"field":"tags","condition":"containsOne","value":"ps3"}]}';
var encodedVidMeta = encodeURI(videoMeta);
var videosUrl = IGNENDPOINTS.video+encodedVidMeta;

$(document).ready(
	function(){
		//chrome.browserAction.setBadgeText({text:String('')});

		// GET OPTIONS
		// BUILD LIST
		$(document).blur();
		buildList();
});

function buildList(){

	// GET VIDEOS
	var videoArray;
	$.getJSON(videosUrl,
		function(response){
			videoArray = response.data;
		});
	// GET ARTICLES
	$.getJSON(articlesUrl,
		function(response){
			data = response.data;
			for (i = 0; i < data.length; i++)
			{
				item = data[i];
				full = (item.metadata.publishDate).split("T");
				headline = item.metadata.headline;
				slug = item.metadata.slug;
				date = full[0].split("-");
				year = date[0];
				month = date[1];
				day = date[2];
				articleUrl = 'http://www.ign.com/articles/'+year+'/'+month+'/'+day+'/'+slug;
				$('#listView ul').append('<li><a target="_blank" href="'+articleUrl+'">'+headline+'</a></li>');
				console.log(data[i]);
				// GET IMAGES
			}
		});
	
}