//finding
const stardustVideo = document.querySelector("#stardust-video");
console.log(stardustVideo);

//play
const playButton = document.querySelector("#play-button");
console.log(playButton);

playButton.addEventListener("click", playAudio);

function playAudio() {
  stardustVideo.play();
}

//pause
const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

pauseButton.addEventListener("click", pauseAudio);

function pauseAudio() {
  stardustVideo.pause();
}
