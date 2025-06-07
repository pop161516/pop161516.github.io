const section = document.querySelector("section.vid");
const vid = document.getElementById("myVideo");
const changeVideoButton = document.getElementById("changeVideoButton");
const secondChangeVideoButton = document.getElementById(
  "secondChangeVideoButton"
);

const lobbyVidSource = new URL("lobby.mp4", window.location.href).href;
const recVidSource = new URL("rec.mp4", window.location.href).href;
const floorVidSource = new URL("floor.mp4", window.location.href).href;

let scrollToBottomOnLoad = false;

function scroll() {
  if (!vid || isNaN(vid.duration) || vid.duration === 0 || vid.readyState < 2) {
    console.warn("Video not ready — skipping scroll sync.");
    return;
  }

  const distance = window.scrollY - section.offsetTop;
  const total = section.clientHeight - window.innerHeight;
  const percentage = Math.max(0, Math.min(1, distance / total));

  vid.currentTime = vid.duration * percentage;

  const currentActiveSrc = vid.currentSrc || "";
  const lobbyVid = currentActiveSrc === lobbyVidSource;
  const recVid = currentActiveSrc === recVidVidSource;
  const floorVid = currentActiveSrc === floorVidSource;

  console.log(
    `lobbyVid: ${lobbyVid}, recVidVid: ${recVidVid}, floorVid: ${floorVid}`
  );

  let showFirstButton = false;
  let highlightFirstButton = false;

  if (lobbyVid) {
    showFirstButton = percentage >= 0.95;
    changeVideoButton.textContent = "Explore Equipment Rental";
    highlightFirstButton = showFirstButton;
  } else if (recVidVid) {
    showFirstButton = percentage <= 0.05;
    changeVideoButton.textContent = "Return to Main";
    highlightFirstButton = showFirstButton;
  } else {
    showFirstButton = false;
    highlightFirstButton = false;
  }

  changeVideoButton.style.display = showFirstButton ? "block" : "none";
  if (highlightFirstButton) {
    changeVideoButton.classList.add("highlight");
  } else {
    changeVideoButton.classList.remove("highlight");
  }

  let showSecondButton = false;
  let highlightSecondButton = false;

  if (floorVid) {
    showSecondButton = percentage <= 0.05;
    secondChangeVideoButton.textContent = "Return to Main";
    highlightSecondButton = showSecondButton;
  } else if (lobbyVid) {
    showSecondButton = percentage >= 0.95;
    secondChangeVideoButton.textContent = "Floor 2";
    highlightSecondButton = showSecondButton;
  } else {
    showSecondButton = false;
    highlightSecondButton = false;
  }

  secondChangeVideoButton.style.display = showSecondButton ? "block" : "none";
  if (highlightSecondButton) {
    secondChangeVideoButton.classList.add("highlight");
  } else {
    secondChangeVideoButton.classList.remove("highlight");
  }
}

function switchVideo(src, scrollToEnd = false) {
  vid.pause();

  while (vid.firstChild) {
    vid.removeChild(vid.firstChild);
  }

  const newSource = document.createElement("source");
  newSource.setAttribute("src", src);
  newSource.setAttribute("type", "video/mp4");
  vid.appendChild(newSource);

  scrollToBottomOnLoad = scrollToEnd;

  vid.load();
  changeVideoButton.style.display = "none";
  secondChangeVideoButton.style.display = "none";
}

changeVideoButton.addEventListener("click", () => {
  const currentActiveSrc = vid.currentSrc || "";
  if (currentActiveSrc === lobbyVidSource) {
    switchVideo(recVidSource);
  } else if (currentActiveSrc === recVidSource) {
    switchVideo(lobbyVidSource, true);
  }
});

secondChangeVideoButton.addEventListener("click", () => {
  const currentActiveSrc = vid.currentSrc || "";
  if (currentActiveSrc === lobbyVidSource) {
    switchVideo(floorVidSource);
  } else if (currentActiveSrc === floorVidSource) {
    switchVideo(lobbyVidSource, true);
  }
});

vid.addEventListener("loadedmetadata", () => {
  console.log("--- loadedmetadata event fired! ---");
  scroll();

  if (scrollToBottomOnLoad) {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "instant",
    });
    scrollToBottomOnLoad = false;
  } else {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
});

window.addEventListener("scroll", scroll);
window.addEventListener("DOMContentLoaded", scroll);

scroll();
