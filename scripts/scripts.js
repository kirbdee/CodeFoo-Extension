var IGNENDPOINTS = {
	articles:"http://apis.ign.com/article/v3/articles/search?format=js&callback=?&variable=var&q=",
	images:"http://apis.ign.com/image/v3/images/search?format=js&callback=?&variable=var&q=",
	video:"http://video-api.ign.com/v3/videos/search?format=js&callback=?&variable=var&q="
};

var sampleMeta = '{"matchRule":"matchAll","count":5,"startIndex":0,"networks":"ign","states":"published","sortBy":"metadata.publishDate","sortOrder":"desc","rules":[{"field":"metadata.articleType","condition":"is","value":"article"}';
var videoMeta = '{"matchRule":"matchAny","count":5,"startIndex":0,"networks":"ign","states":"published","sortBy":"metadata.publishDate","sortOrder":"desc","rules":[';
var articlesUrl;
var videosUrl;
var imageMeta = '{"matchRule":"matchAll","count":25,"startIndex":0,"networks":"ign","states":"published","sortBy":"metadata.publishDate","sortOrder":"desc","rules":[{"field":"tags","condition":"containsOne","value":"transformers-mobile"}]}';


$(document).ready(
	function(){
		// Clear badge count each time extention is opened
		localStorage['badgeCount'] = 0;
		chrome.browserAction.setBadgeText({text:''});
		sampleMeta+=',{"field":"tags","condition":"containsOne","value":"';
		for(var key in localStorage){
			if(localStorage[key] == 1){
				sampleMeta+=key+',';//',{"field":"tags","condition":"containsOne","value":"'+key+'"}';
				videoMeta+='{"field":"tags","condition":"containsOne","value":"'+key+'"},';
			}
		}
		sampleMeta+='"}]}';
		videoMeta=videoMeta.substring(0,videoMeta.length-1)+']}';
		var encodedMeta = encodeURI(sampleMeta);
		articlesUrl = IGNENDPOINTS.articles+encodedMeta;
		var encodedVidMeta = encodeURI(videoMeta);
		videosUrl = IGNENDPOINTS.video+encodedVidMeta;
		
		//Save latest url to localStorage
		localStorage['articlesUrl'] = articlesUrl;
		localStorage['videosUrl'] = videosUrl;
		
		var encodedImgMeta = encodeURI(imageMeta);
		imagesUrl = IGNENDPOINTS.images+encodedImgMeta;
		console.log(sampleMeta);
		console.log(videoMeta);
		console.log(imagesUrl);
		// GET OPTIONS
		// BUILD LIST
		buildList();
});

function buildList(){

	// GET VIDEOS
	var videoArray;
	$.getJSON(videosUrl,
		function(response){
			videoArray = response.data;
		});
	$.getJSON(articlesUrl,
		function(response){
			data = response.data;
			data = data.concat(videoArray);
			sortByPubDate(data);
			for (i = 0; i < data.length; i++)
			{
				var index = i;
				if(data[i].articleId){
					$.getJSON
					item = data[i];
					full = (item.metadata.publishDate).split("T");
					headline = item.metadata.headline;
					slug = item.metadata.slug;
					date = full[0].split("-");
					year = date[0];
					month = date[1];
					day = date[2];
					if(item.promo.promoImages){
						imageUrl = item.promo.promoImages[0].url;
					}
					articleUrl = 'http://www.ign.com/articles/'+year+'/'+month+'/'+day+'/'+slug;
					$('#listView ul').append('<li id="'+index+'"><a target="_blank" href="'+articleUrl+'">'+headline+'</a></li>');
					$('#'+index).css('background', 'url('+imageUrl+') center right no-repeat black');
					console.log(data[i]);
				}else{
					console.log(data[i]);
					videoUrl = data[i].metadata.url;
					title = data[i].metadata.title;
					imageUrl = data[i].thumbnails[0].url;
					$('#listView ul').append('<li id="'+index+'"><a target="_blank" href="'+videoUrl+'">'+title+'</a></li>');
					$('#'+index).css('background', 'url('+imageUrl+')center right no-repeat black');
					$('#'+index).css('background-size', '136px 77px');
				}
				console.log(new Date(data[i].metadata.publishDate).getTime());
				}
			$('#listView ul').append('<li id="loadmore"><a href="javascript:void();">Load More</a></li>');
		});

	// GET ARTICLES
	

	function sortByPubDate(arr){
		var sortFunction = function sortfunction(a, b){
			return (new Date(b.metadata.publishDate).getTime() - new Date(a.metadata.publishDate).getTime());
		}
		arr = arr.sort(sortFunction);
	}
	
}