var videosData = [
    {title: "bass player", an: false, path: "COMP/BassPlayerCOMP.mp4"},
    {title: "drummer", an: false, path: "COMP/DrummerCOMP.mp4"},
    {title: "improviser", an: true, path: "COMP/ImproviserCOMP.mp4"},
    {title: "keyboard player", an: false, path: ["COMP/PianoPlayerCOMP.mp4", "COMP/PianoPlayer2COMP.mp4"]},
    {title: "producer", an: false, path: ["COMP/ProducerCOMP.mp4", "COMP/Producer2COMP.mp4"]},
    {title: "singer", an: false, path: "COMP/SingerCOMP.mp4"}
];

var previousVideo = Math.floor(Math.random() * videosData.length);
var an = false;

$(document).ready(function() {
    insertBgVideo(previousVideo);
    setInterval(function() {
        insertBgVideo(previousVideo);
    }, 14500);
});

// inserts a new video element
function insertVideoElement(sourceOfVid) {
    var videoElement = $(document.createElement('video')).attr({"id": "currentVid", "class": "bgvid"});
    videoElement.append($(document.createElement('source')).attr({"src": sourceOfVid, "type": "video/mp4"}));
    $("#body").append(videoElement);
    return videoElement[0];
}

// removes a video element tagged with the 'removeVid' id
function removeVideoElement() {
    $("#videoToRemove").remove();

}

// numOfpreviousVideo -> int
function insertBgVideo(numOfpreviousVideo) {
	// Find index of next video randomly
    var num = getRandomNumber(videosData.length, previousVideo); previousVideo = num;
    var nextVidData = videosData[num];
    var source = nextVidData.path;
    if (typeof source === "object") {
        source = source[getRandomNumber(source.length)];
    }
    an = (an || nextVidData.an); // an or a?

    // prepare for deletion of existing video element
    var videoToRemove = $("#currentVid");
    videoToRemove.attr("id", "videoToRemove")
    videoToRemove.css("z-index", "-90"); // Show in front of nextVid

    // insert new video and start playing; fadeout old
    var nextVid = insertVideoElement(source);
    nextVid.play();
    videoToRemove.fadeOut(600);
    $("#title").text(nextVidData.title);

    // update an/a and the title
    if (an) $("#as").html("as " + (nextVidData.an ? "an" : "a"));

    // remove old video element after fadeout
    setTimeout(function() {
    	removeVideoElement();
    }, 600);
}

/**
 * returns a random num rn between 0 and n where rn != doNotInclude
 * @param  {Int} n            [description]
 * @param  {Int} doNotInclude [description]
 * @return {Int} rn           [description]
 */
function getRandomNumber(n, doNotInclude) {
    var rn = Math.floor(Math.random() * n);
    while (rn === doNotInclude) {
        rn = Math.floor(Math.random() * n);
    }
    return rn;
}