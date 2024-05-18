function removeOverlay() {
    var overlay = document.querySelector('.overlay');
    overlay.parentNode.removeChild(overlay);
    var video = document.getElementById('backgroundVideo');
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

