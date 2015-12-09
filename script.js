var videosData = [
    {title: "bass player", an: false, path: "COMP/BassPlayerMORECOMP.mp4"},
    {title: "drummer", an: false, path: "COMP/DrummerMORECOMP.mp4"},
    {title: "improviser", an: true, path: "COMP/ImproviserMORECOMP.mp4"},
    {title: "keyboard player", an: false, path: ["COMP/PianoPlayerMORECOMP.mp4", "COMP/PianoPlayer2MORECOMP.mp4"]},
    {title: "producer", an: false, path: ["COMP/ProducerMORECOMP.mp4", "COMP/Producer2MORECOMP.mp4"]},
    {title: "singer", an: false, path: "COMP/SingerMORECOMP.mp4"}
];

var imagesData = [
    {title: "bass player", an: false, path: "images/autoplayNotSupported.png"},
    {title: "drummer", an: false, path: "images/autoplayNotSupported.png"},
    {title: "improviser", an: true, path: "images/autoplayNotSupported.png"},
    {title: "keyboard player", an: false, path: "images/autoplayNotSupported.png"},
    {title: "producer", an: false, path: "images/autoplayNotSupported.png"},
    {title: "singer", an: false, path: "images/autoplayNotSupported.png"}
];

// Inserts image-backgrounds
var imageBackgroundHandler = {
    previousBackground: (Math.floor(Math.random() * imagesData.length)),
    backgrounds: imagesData,
    insertBackground: function(sourceOfImage) {
        // inserts a new video element
        var imageElement = $(document.createElement('img')).attr({"id": "currentBackground", "class": "background", "src": sourceOfImage});
        $("#body").append(imageElement);
    }
}

// Inserts video-backgrounds
var videoBackgroundHandler = {
    previousBackground: (Math.floor(Math.random() * videosData.length)),
    backgrounds: videosData,
    insertBackground: function(sourceOfVid) {
        // inserts a new video element
        var videoElement = $(document.createElement('video')).attr({"id": "currentBackground", "class": "background", "preload": "auto"});
        videoElement.append($(document.createElement('source')).attr({"src": sourceOfVid, "type": "video/mp4"}));
        $("#body").append(videoElement);
        videoElement[0].play(); // start the video
    }
}

var backgroundHandler;
var an = false;

$(document).ready(function() {
    handleBackgroundBasedOnDevice();
});

// determines whether the browser supports video-backgrounds
function handleBackgroundBasedOnDevice() {
    // if browser supports autoplay (dependant on detect_autoplay.js)
    backgroundHandler = (detect_autoplay(100)) ? videoBackgroundHandler : imageBackgroundHandler;
    updateBackground(backgroundHandler.previousBackground);
    setInterval(function() {
        updateBackground(backgroundHandler.previousBackground);
    }, 14500);
}

// removes the 'backgroundToRemove' element
function removePreviousBackground() {
    $("#backgroundToRemove").remove();
}

// idOfPreviousBackground -> int
function updateBackground(idOfPreviousBackground) {
    // Find index of next video randomly
    var num = getRandomNumber(backgroundHandler.backgrounds.length, backgroundHandler.previousBackground);
    backgroundHandler.previousBackground = num; // preparation; update previousBackground
    var nextBackgroundObject = backgroundHandler.backgrounds[num];
    var source = nextBackgroundObject.path;
    if (typeof source === "object") {
        source = source[getRandomNumber(source.length)];
    }

    // prepare for deletion of existing video element
    var backgroundToRemove = $("#currentBackground");
    backgroundToRemove.attr("id", "backgroundToRemove")
    backgroundToRemove.css("z-index", "-90"); // Show in front of nextBackground

    // insert new video and start playing; fadeout old
    var nextBackground = backgroundHandler.insertBackground(source);
    backgroundToRemove.fadeOut(1500);
    $("#title").text(nextBackgroundObject.title);

    // update an/a and the title
    $("#as").html("as " + (nextBackgroundObject.an ? "an" : "a"));

    // remove old video element after fadeout
    setTimeout(function() {
    	removePreviousBackground();
    }, 1000);
}

/**
 * returns a random num randomNumber between 0 and n where randomNumber != doNotInclude
 * @param  {Int} n            [description]
 * @param  {Int} doNotInclude [description]
 * @return {Int} randomNumber [description]
 */
function getRandomNumber(n, doNotInclude) {
    var randomNumber = Math.floor(Math.random() * n);
    while (randomNumber === doNotInclude) {
        randomNumber = Math.floor(Math.random() * n);
    }
    return randomNumber;
}
