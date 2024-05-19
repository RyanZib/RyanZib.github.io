
//This opens up the video fullscreen after overlay is clicked, used https://stackoverflow.com/questions/1055214/is-there-a-way-to-make-html5-video-fullscreen to learn how to do so.
function removeOverlay() {
    var overlay = document.querySelector('.overlay');

    overlay.parentNode.removeChild(overlay);
    var videoContainer = document.getElementById('videoContainer');
    videoContainer.style.display = 'block';
    var video = document.getElementById('backgroundVideo');
    video.play();
    if (video.requestFullscreen) {
        video.requestFullscreen().then(function() {
            video.play();
        });
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen().then(function() {
            video.play();
        });
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen().then(function() {
            video.play();
        });
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen().then(function() {
            video.play();
        });
    }
    video.style.pointerEvents = 'auto';
}
 // Function to show content based on clicked list item, i chose this method of displaying information as it keeps the website easy to navigate and not overloaded with many different elements that would take away of the core exprience of the video art
 function showContent(page) {
    // Hides the previously shown content
    document.getElementById('content').style.display = 'none';
    
    // Shows the new content based on the clicked list item
    var content = document.getElementById('content');
    switch (page) {
      case 'Description':
        content.innerHTML = '<h2>Video Art Piece</h2><p>This would contain information about the Video</p>';
        break;
      case 'Artist':
        content.innerHTML = '<h2>Artist Name</h2><p>This would contain info on who the artist is</p>';
        break;
      case 'Other Works':
        content.innerHTML = '<h2>other Works</h2><p>This would contain info about other art pieces the artist has done</p>';
        break;
      case 'Refrences':
        content.innerHTML = '<h2>Page References</h2><p><a href="https://icons8.com">Icons8</a> https://www.pexels.com/video/colorful-artwork-and-design-1307329/ https://www.pexels.com/video/physical-reactions-mixing-of-colored-liquid-paints-and-balls-3582429/ https://www.pexels.com/video/smoke-with-colors-2324293/ https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/miac.mp4</p>';
        break;
    }
    
    // Show the content
    content.style.display = 'block';
  }
  // made a list for thumbnail button usablity. the 3 other assests I used have no sound, but testing with different videos that had sound,
  // no issues arose.
  const videoList = [
    { name: "Featured", link: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/miac.mp4" },
    { name: "Paint", link: "https://videos.pexels.com/video-files/3582429/3582429-hd_1920_1080_24fps.mp4" },
    { name: "Scope", link: "https://videos.pexels.com/video-files/1307329/1307329-hd_1920_1080_30fps.mp4",},
    { name: "Smoke", link: "https://videos.pexels.com/video-files/2324293/2324293-uhd_3840_2160_25fps.mp4",},
  ];
  
  // used alot of the code from example website, removed some functionallity such as the previous and next buttons, as navigation 
// is easily understood through the thumbnail selections
  const playPauseButton = document.querySelector("#play-pause-btn");
 
  playPauseButton.addEventListener("click", togglePlay);
  const playPauseImg = document.querySelector("#play-pause-img");
  const muteUnmuteButton = document.querySelector("#mute-unmute-btn");

muteUnmuteButton.addEventListener("click", toggleAudio);
const muteUnmuteImg = document.querySelector("#mute-unmute-img");

const increaseVolumeButton = document.querySelector("#increase-volume-btn");

increaseVolumeButton.addEventListener("click", increaseVolume);

const decreaseVolumeButton = document.querySelector("#decrease-volume-btn");

decreaseVolumeButton.addEventListener("click", decreaseVolume);

const loopButton = document.querySelector("#loop-btn");

loopButton.addEventListener("click", loopVideo);
const myVideo = document.querySelector("#backgroundvideo");
const videoName = document.querySelector("#backgroundVideo");
const videoTime = document.querySelector("#backgroundVideo");
const progressBar = document.querySelector("#progress-bar-fill");


myVideo.addEventListener("timeupdate", updateProgressBar);


myVideo.addEventListener("volumechange", updateVolume);


myVideo.addEventListener("ended", replay);

const firstVideoButton = document.querySelector("#first-video-btn");


firstVideoButton.addEventListener("click", function playIt() {
  myVideo.pause();
  playVideo(0);
  updateBackgroundVideo(0);
});

function updateVolume() {
  const volume = myVideo.volume;
  console.log("Volume changed:", volume);
}


function increaseVolume() {
  if (myVideo.volume < 0.9) {
    myVideo.volume += 0.1;
  }
}


function decreaseVolume() {
  if (myVideo.volume > 0.11) {
    myVideo.volume -= 0.1;
  }
}


function gotoStep1() {
  myVideo.currentTime = 16.41;
}

const secondVideoButton = document.querySelector("#second-video-btn");
secondVideoButton.addEventListener("click", function playIt() {
    myVideo.pause();
    playVideo(1);
    updateBackgroundVideo(1);
});

const thirdVideoButton = document.querySelector("#third-video-btn");
thirdVideoButton.addEventListener("click", function playIt() {
    myVideo.pause();
    playVideo(2);
    updateBackgroundVideo(2);
});

const fourthVideoButton = document.querySelector("#fourth-video-btn");
fourthVideoButton.addEventListener("click", function playIt() {
    myVideo.pause();
    playVideo(3);
    updateBackgroundVideo(3);
});


function togglePlay() {
  if (myVideo.paused || myVideo.ended) {
    myVideo.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    myVideo.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}


function toggleAudio() {
  if (myVideo.muted) {
    myVideo.muted = false;
    muteUnmuteButton.style.backgroundColor = "";
  } else {
    myVideo.muted = true;
    muteUnmuteButton.style.backgroundColor = "#7b775e";
  }
}

function playVideo(no) {
  myVideo.pause();
  myVideo.src = videoList[no].link;
  videoName.textContent = videoList[no].name;
  myVideo.load();
  myVideo.play();
}


function replay() {
  console.log("loop is", loop);
  if (loop) {
    myVideo.currentTime = 0;
    myVideo.play();
  }
}

function loopVideo() {
  if (loop) {
    loop = false;
    loopButton.style.backgroundColor = "#d5cea3";
  } else {
    loop = true;
    loopButton.style.backgroundColor = "#7b775e";
  }
  console.log("loop is", loop);
}


function updateProgressBar() {
  videoTime.textContent = myVideo.currentTime.toFixed(2);
  const value = (myVideo.currentTime / myVideo.duration) * 100;
  progressBar.style.width = value + "%";
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    myVideo.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
myVideo.addEventListener("dblclick", toggleFullscreen);

document.addEventListener("fullscreenchange", function () {
  if (document.fullscreenElement === myVideo) {
    console.log("Entered fullscreen");
  } else {
    console.log("Exited fullscreen");
  }
});
function playVideo(index) {
    myVideo.src = videoList[index].link;
    myVideo.play();
}

function updateBackgroundVideo(index) {
    const backgroundVideoBlurred = document.querySelector("#backgroundVideoBlurred");
    backgroundVideoBlurred.querySelector("source").src = videoList[index].link;
    backgroundVideoBlurred.load();
}
// wanted background to also change with the changing videos. Creates a more immersive expreince. As the page dynamically changes with the users interactions