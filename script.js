var previousTitle = Math.floor(Math.random() * 6);

var titles = [
	{"name": "Bass Player", "an": false, "path": "COMP/BassPlayerCOMP.mp4"},
	{"name": "Drummer", "an": false, "path": "COMP/DrummerCOMP.mp4"},
	{"name": "Improviser", "an": true, "path": "COMP/ImproviserCOMP.mp4"},
	{"name": "Piano Player", "an": false, "path": ["COMP/PianoPlayerCOMP.mp4", "COMP/PianoPlayer2COMP.mp4"]},
	{"name": "Producer", "an": false, "path": ["COMP/ProducerCOMP.mp4", "COMP/Producer2COMP.mp4"]},
	{"name": "Singer", "an": false, "path": "COMP/SingerCOMP.mp4"}
];

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

	// Prepare for deletion
	$("#insertVid").attr("id", "removeVid");
	$("#removeVid").css({"z-index": "50"});

	var vid = insertVideoElement();
	vid.append($(document.createElement('source')).attr({"src": source, "type": "video/mp4", "display": "none"}));
	$("#insertVid").get(0).play();

	// Fade-in / Fade-out
	$("#removeVid").fadeOut({"duration": "slow"});
	$("#insertVid").fadeIn({"duration": "slow"});

	if (title.an) {
		$("#asA").html("as an");
	} else {
		$("#asA").html("as a");
	}
	$("#title").html(name);

	setTimeout(function() {
		removeVideoElement();
	}, 2000);

}

function getRandomNumber(n, doNotInclude) {
	var rn = Math.floor(Math.random() * n);
	while(rn === doNotInclude) {
		rn = Math.floor(Math.random() * n);
	}
	return rn;
}

function videoError(element) {
	var el = $(element);
	//el.css("z-index", "-1000");
	//el.attr("src", "MGLogo.png");

}