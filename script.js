var previousTitle = Math.floor(Math.random() * 6);
var opacity = 1;

var titles = [
	{"name": "Bass Player", "an": false, "path": "COMP/BassPlayerCOMP.mp4"},
	{"name": "Drummer", "an": false, "path": "COMP/DrummerCOMP.mp4"},
	{"name": "Improviser", "an": true, "path": "COMP/ImproviserCOMP.mp4"},
	{"name": "Keyboard Player", "an": false, "path": ["COMP/PianoPlayerCOMP.mp4", "COMP/PianoPlayer2COMP.mp4"]},
	{"name": "Producer", "an": false, "path": ["COMP/ProducerCOMP.mp4", "COMP/Producer2COMP.mp4"]},
	{"name": "Singer", "an": false, "path": "COMP/SingerCOMP.mp4"}
];

var an = false;

$(document).ready(function() {
	insertBgVideo(previousTitle);
	setInterval(function() {
		insertBgVideo(previousTitle);
	}, 15000);
});

function insertVideoElement() {
	var videoElement = $(document.createElement('video')).attr({"id": "insertVid", "class": "bgvid"});
	$("#body").append(videoElement);
	return videoElement;
}

function removeVideoElement() {
	$("#removeVid").remove();

}

// numOfPreviousTitle -> int
function insertBgVideo(numOfPreviousTitle) {
	// Get attributes of next video
	var num = getRandomNumber(6, previousTitle); previousTitle = num;
	var title = titles[num];
	var name = title.name;
	var source = title.path;
	if (typeof source === "object") {
		source = source[getRandomNumber(source.length)];
	}
	an = an || title.an;

	// Prepare for deletion
	$("#insertVid").attr("id", "removeVid");

	var vid = insertVideoElement();
	vid.append($(document.createElement('source')).attr({"src": source, "type": "video/mp4"}));
	$("#insertVid")[0].play();

	if (an) {
		$("#asA").html("as " + (title.an ? "an" : "a"));
	}

	$("#title").html(name);
	removeVideoElement();
}

function getRandomNumber(n, doNotInclude) {
	var rn = Math.floor(Math.random() * n);
	while(rn === doNotInclude) {
		rn = Math.floor(Math.random() * n);
	}
	return rn;
}