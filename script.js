var titles = [
    {name: "Bass Player", an: false, path: "COMP/BassPlayerCOMP.mp4"},
    {name: "Drummer", an: false, path: "COMP/DrummerCOMP.mp4"},
    {name: "Improviser", an: true, path: "COMP/ImproviserCOMP.mp4"},
    {name: "Keyboard Player", an: false, path: ["COMP/PianoPlayerCOMP.mp4", "COMP/PianoPlayer2COMP.mp4"]},
    {name: "Producer", an: false, path: ["COMP/ProducerCOMP.mp4", "COMP/Producer2COMP.mp4"]},
    {name: "Singer", an: false, path: "COMP/SingerCOMP.mp4"}
];

var previousTitle = Math.floor(Math.random() * titles.length);
var an = false;

$(document).ready(function() {
    insertBgVideo(previousTitle);
    setInterval(function() {
        insertBgVideo(previousTitle);
    }, 15000);
});

// inserts a new video element
function insertVideoElement() {
    var videoElement = $(document.createElement('video')).attr({"id": "insertVid", "class": "bgvid"});
    $("#body").append(videoElement);
    return videoElement;
}

// removes a video element tagged with the 'removeVid' id
function removeVideoElement() {
    $("#removeVid").remove();

}

// numOfPreviousTitle -> int
function insertBgVideo(numOfPreviousTitle) {
    // Get attributes of next video
    var num = getRandomNumber(titles.length, previousTitle); previousTitle = num;
    var title = titles[num];
    var name = title.name;
    var source = title.path;
    if (typeof source === "object") {
        source = source[getRandomNumber(source.length)];
    }

    // an or a [nameOfTitle]?
    an = (an || title.an);

    // prepare for deletion of existing video element
    $("#insertVid").attr("id", "removeVid");

    // insert new video element and start playing
    var insertedVid = insertVideoElement();
    insertedVid.append($(document.createElement('source')).attr({"src": source, "type": "video/mp4"}));
    $("#insertVid")[0].play();

    // insert an / a
    if (an) {
        $("#asA").html("as " + (title.an ? an : "a"));
    }

    // insert new name
    $("#title").html(name);

    // remove old video element
    removeVideoElement();
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