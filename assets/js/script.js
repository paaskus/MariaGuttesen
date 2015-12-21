var videosData = [
    {title: "bass player", an: false, path: "assets/vid/BassPlayerMORECOMP.mp4"},
    {title: "drummer", an: false, path: "assets/vid/DrummerMORECOMP.mp4"},
    {title: "improviser", an: true, path: "assets/vid/ImproviserMORECOMP.mp4"},
    {title: "keyboard player", an: false, path: ["assets/vid/PianoPlayerMORECOMP.mp4", "assets/vid/PianoPlayer2MORECOMP.mp4"]},
    {title: "producer", an: false, path: ["assets/vid/ProducerMORECOMP.mp4", "assets/vid/Producer2MORECOMP.mp4"]},
    {title: "singer", an: false, path: "assets/vid/SingerMORECOMP.mp4"}
];

var imagesData = [
    {title: "bass player", an: false, path: "assets/img/backgrounds/bass.png"},
    {title: "drummer", an: false, path: "assets/img/backgrounds/drummer.png"},
    {title: "improviser", an: true, path: "assets/img/backgrounds/improviser.png"},
    {title: "keyboard player", an: false, path: ["assets/img/backgrounds/piano.png", "assets/img/backgrounds/piano2.png", "assets/img/backgrounds/piano3.png"]},
    {title: "producer", an: false, path: ["assets/img/backgrounds/producer.png", "assets/img/backgrounds/producer2.png"]},
    {title: "singer", an: false, path: ["assets/img/backgrounds/singer.png", "assets/img/backgrounds/singer2.png"]}
];

// main function
$(document).ready(function() {
    handleBackgroundBasedOnDevice();
});

// Inserts image-backgrounds
var imageBackgroundHandler = {
    previousBackground: (Math.floor(Math.random() * imagesData.length)),
    backgrounds: imagesData,
    insertBackground: function(sourceOfImage) {
        // inserts a new video element
        var imageElement = $(document.createElement('img'))
            .attr({"id": "currentBackground", "class": "background", "src": sourceOfImage});
        $("#body").append(imageElement);
    },
    delay: 500
};

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
    },
    delay: 2000
};

var backgroundHandler;

// determines whether the browser supports video-backgrounds
function handleBackgroundBasedOnDevice() {
    var autoplay = detect_autoplay();
    // if browser supports autoplay (dependant on detect_autoplay.js)
    backgroundHandler = (autoplay) ? videoBackgroundHandler : imageBackgroundHandler;
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

    // prepare for deletion of existing background element
    var backgroundToRemove = $("#currentBackground");
    backgroundToRemove.attr("id", "backgroundToRemove");
    backgroundToRemove.css("z-index", "-90"); // Show in front of nextBackground

    // insert next background; fadeout old
    backgroundHandler.insertBackground(source);
    backgroundToRemove.fadeOut(backgroundHandler.delay);
    $("#title").text(nextBackgroundObject.title);

    // update an/a and the title
    $("#as").html("as " + (nextBackgroundObject.an ? "an" : "a"));

    // remove old video element after fadeout
    setTimeout(function() {
    	removePreviousBackground();
    }, backgroundHandler.delay);
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
