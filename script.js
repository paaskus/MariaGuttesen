var titles = {"titles": [
			{"name": "Bass Player", "an": false, "path": "COMP/BassPlayerCOMP.mp4"},
			{"name": "Drummer", "an": false, "path": "COMP/DrummerCOMP.mp4"},
			{"name": "Improviser", "an": true, "path": "COMP/ImproviserCOMP.mp4"},
			{"name": "Piano Player", "an": false, "path": ["COMP/PianoPlayerCOMP.mp4", "COMP/PianoPlayer2COMP.mp4"]},
			{"name": "Producer", "an": false, "path": ["COMP/ProducerCOMP.mp4", "COMP/Producer2COMP.mp4"]},
			{"name": "Singer", "an": false, "path": "COMP/BassPlayerCOMP.mp4"}
		]
	};

var previousTitle = null;

$(document).ready(function() {

	windoe.setInterval(insertBgVideo(previousTitle), 15000);
});

// previousTitle -> string
function insertBgVideo(previousTitle) {
	var title = 
	var source = 
	var videoElement = $(document.createElement('video')).attr({"id": "bgvid", "autoplay": true});
	videoElement.prepend($(document.createElement('source')).attr({"src": "COMP/PianoPlayerCOMP.mp4", "type": "video/mp4"}));
	$("#body").append(videoElement);
}