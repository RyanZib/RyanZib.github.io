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
 // Function to show content based on clicked list item
 function showContent(page) {
    // Hide the previously shown content
    document.getElementById('content').style.display = 'none';
    
    // Show the new content based on the clicked list item
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
        content.innerHTML = '<h2>Page Refrences</h2><p>Learn more about us!</p>';
        break;
    }
    
    // Show the content
    content.style.display = 'block';
  }

