//array of differant songs in que
const audioList = [
  {
    name: "Deep Ambient Relaxation Music",
    artist: "RMIT",
    link: "/assignment2/assets/study-music.mp3",
  },
  {
    name: "Lofi Study Beat 3",
    artist: "officeMIKADO - pixabay",
    link: "/assignment2/assets/lofi-study-beat.mp3",
  },
  {
    name: "Gentle Ambient Atmosphere",
    artist: "Allicante - pixabay",
    link: "/assignment2/assets/ambient-atmosphere.mp3",
  },
];

//finding song name, audio data, play/pause button,
const audioName = document.querySelector("#audio-name");
const audioArtist = document.querySelector("#audio-artist");
const myAudio = document.querySelector("#my-audio");
const playPauseButton = document.querySelector("#play-pause-button");

playPauseButton.addEventListener("click", playPauseAudio);

const playPauseImg = document.querySelector("#play-pause-img");

//change icon and functionality when button pressed
function playPauseAudio() {
  if (myAudio.paused) {
    myAudio.play();
  } else {
    myAudio.pause();
  }
}

myAudio.addEventListener("ended", nextup);
function nextup() {
  console.log("next track loading");
  currentIndex = (currentIndex + 1) % audioList.length;
  console.log(currentIndex);
  playAudioAtIndex(currentIndex);
}

myAudio.addEventListener("play", () => {
  playPauseImg.src = "/assignment2/assets/images/pause.png";
});

myAudio.addEventListener("pause", () => {
  playPauseImg.src = "/assignment2/assets/images/play.png";
});

const progressBar = document.querySelector("#progress-bar-fill");

myAudio.addEventListener("timeupdate", updateProgressBar);

// const audioTime = document.querySelector("#audio-time");

//we increase the width of the progress bar depending on the percentage
// how much audio is played in comparison to how much is left or its duration.
function updateProgressBar() {
  //   audioTime.textContent = myAudio.currentTime.toFixed(0) / 100;
  const value = (myAudio.currentTime / myAudio.duration) * 100;
  progressBar.style.width = value + "%";
}

//maintain style in pip
pipButton.addEventListener("click", async () => {
  const player = document.querySelector(".player-content");

  // Open a Picture-in-Picture window.
  const pipWindow = await documentPictureInPicture.requestWindow();

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
  });
});

//-----------------------//
//code taken from class example
// The following code allows moving to previous and next audio or audio

//getting the buttons from the html and running function when clicked
const backButton = document.querySelector("#back-button");
backButton.addEventListener("click", prevTrack);

const forwardButton = document.querySelector("#forward-button");
forwardButton.addEventListener("click", nextTrack);

//queue number
let currentIndex = 0;

audioName.textContent = audioList[currentIndex].name;
audioArtist.textContent = audioList[currentIndex].artist;
console.log(`${audioList[currentIndex].name}`);
console.log(`${audioList[currentIndex].artist}`);

//function to go back in queue and
function prevTrack() {
  console.log("previous track loading");
  currentIndex = (currentIndex - 1 + audioList.length) % audioList.length;
  audioName.textContent = audioList[currentIndex].name;
  audioArtist.textContent = audioList[currentIndex].artist;
  console.log(currentIndex);
  playAudioAtIndex(currentIndex);
}

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
  //   myAudio.pause(); // Pause the audio before changing source
  console.log(audioList[index].link);
  myAudio.src = audioList[index].link;
  myAudio.load(); // Load the new source
  if (myAudio.play) {
    myAudio.play();
  } else if (myAudio.pause) {
    myAudio.pause();
  }
}
