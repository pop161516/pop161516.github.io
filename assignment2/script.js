const myAudio = document.querySelector("#my-audio");
console.log(myAudio);

const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

playPauseButton.addEventListener("click", playPauseAudio);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

function playPauseAudio() {
  if (myAudio.paused || myAudio.ended) {
    playPauseImg.src = "play--v1.png";
    myAudio.play();
  } else {
    playPauseImg.src = "pause--v1.png";
    myAudio.pause();
  }
}
