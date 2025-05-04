//array of differant songs in queue
const audioList = [
  {
    name: "Deep Ambient Relaxation Music",
    artist: "RMIT",
    link: "https://ia801507.us.archive.org/33/items/interactive-media-assignment-2-sound/InteractiveMediaAssignment2Sound.mp3",
  },
  {
    name: "Lofi Study Beat 3",
    artist: "officeMIKADO - pixabay",
    link: "https://ia801507.us.archive.org/33/items/interactive-media-assignment-2-sound/lofi-study-beat-3-245774.mp3",
  },
  {
    name: "Gentle Ambient Atmosphere",
    artist: "Allicante - pixabay",
    link: "https://ia801507.us.archive.org/33/items/interactive-media-assignment-2-sound/gentle-ambient-atmosphere-332292.mp3",
  },
];

//picture in picture allows toggled functionality
var pipActive = false;

//finding song name, audio data, play/pause image/button,
const audioName = document.querySelector("#audio-name");
const audioArtist = document.querySelector("#audio-artist");
const myAudio = document.querySelector("#my-audio");
const playPauseImg = document.querySelector("#play-pause-img");
const playPauseButton = document.querySelector("#play-pause-button");

playPauseButton.addEventListener("click", playPauseAudio);

//change icon and functionality when button pressed
function playPauseAudio() {
  if (myAudio.paused) {
    myAudio.play();
  } else {
    myAudio.pause();
  }
}

//move to next song in queue
myAudio.addEventListener("ended", nextup);
function nextup() {
  console.log("next track loading");
  currentIndex = (currentIndex + 1) % audioList.length;
  console.log(currentIndex);
  playAudioAtIndex(currentIndex);
}

//play and pause images
myAudio.addEventListener("play", () => {
  playPauseImg.src = "/assignment2/assets/images/pause.png";
});

myAudio.addEventListener("pause", () => {
  playPauseImg.src = "/assignment2/assets/images/play.png";
});

//progress bar variable
const progressBar = document.querySelector("#progress-bar-fill");
myAudio.addEventListener("timeupdate", updateProgressBar);

//width of progrss bar effectivly increased based on differance in audio current time and length.
function updateProgressBar() {
  const value = (myAudio.currentTime / myAudio.duration) * 100;
  progressBar.style.width = value + "%";
}

//picture in picture code
//taken fromn chrome developer tools: https://developer.chrome.com/docs/web-platform/document-picture-in-picture
pipButton.addEventListener("click", async () => {
  if (pipActive == false) {
    const player = document.querySelector(".player-content");

    // Open a Picture-in-Picture window.
    const pipWindow = await documentPictureInPicture.requestWindow();
    pipActive = true;
    console.log(pipActive);

    // Copy style sheets over from the initial document
    // so that the player looks the same.
    [...document.styleSheets].forEach((styleSheet) => {
      try {
        const cssRules = [...styleSheet.cssRules]
          .map((rule) => rule.cssText)
          .join("");
        const style = document.createElement("style");

        style.textContent = cssRules;
        pipWindow.document.head.appendChild(style);
      } catch (e) {
        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.type = styleSheet.type;
        link.media = styleSheet.media;
        link.href = styleSheet.href;
        pipWindow.document.head.appendChild(link);
      }
    });

    // Move the player to the Picture-in-Picture window.
    pipWindow.document.body.append(player);

    // Move the player back when the Picture-in-Picture window closes.
    pipWindow.addEventListener("pagehide", (event) => {
      const playerContainer = document.querySelector(".audio-player");
      const pipPlayer = event.target.querySelector(".player-content");
      playerContainer.append(pipPlayer);
      pipActive = false;
    });
  }
});

//-----------------------//
// allows moving between previous and next audio

//getting the buttons from the html and running function when clicked
const backButton = document.querySelector("#back-button");
backButton.addEventListener("click", prevTrack);

const forwardButton = document.querySelector("#forward-button");
forwardButton.addEventListener("click", nextTrack);

//queue number
let currentIndex = 0;

audioName.textContent = audioList[currentIndex].name;
audioArtist.textContent = audioList[currentIndex].artist;

//function to go back in queue
function prevTrack() {
  console.log("previous track loading");
  currentIndex = (currentIndex - 1 + audioList.length) % audioList.length;
  audioName.textContent = audioList[currentIndex].name;
  audioArtist.textContent = audioList[currentIndex].artist;
  console.log(currentIndex);
  playAudioAtIndex(currentIndex);
}

//function to go forward in queue
function nextTrack() {
  console.log("next track loading");
  currentIndex = (currentIndex + 1) % audioList.length;
  audioName.textContent = audioList[currentIndex].name;
  audioArtist.textContent = audioList[currentIndex].artist;
  console.log(currentIndex);
  playAudioAtIndex(currentIndex);
}

// Function to play audio at a specific index
function playAudioAtIndex(index) {
  myAudio.pause();
  console.log(audioList[index].link);
  myAudio.src = audioList[index].link;
  myAudio.load();
  if (myAudio.play) {
    myAudio.play();
  } else if (myAudio.pause) {
    myAudio.pause();
  }
}

//volumes slider code
const volumeSlider = document.getElementById("volumeSlider");

volumeSlider.addEventListener("input", () => {
  myAudio.volume = volumeSlider.value / 100;
});

const volumeButton = document.getElementById("volume-button");
volumeButton.addEventListener("click", toggleVolumeSlider);

function toggleVolumeSlider() {
  if (
    volumeSlider.style.display === "inline" ||
    volumeSlider.style.display === ""
  ) {
    volumeSlider.style.display = "none";
    console.log(`${volumeSlider.style.display}`);
  } else {
    volumeSlider.style.display = "inline";
  }
}
