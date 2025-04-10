const header = document.querySelector("header");
// console.log(header.innerHTML);
let cource = "OART1013";
header.innerHTML += `<h3> this is ${cource} </h3>`;
// console.log(header.innerHTML);

const myButton = document.querySelector("#buttonp");
console.log(myButton);

myButton.addEventListener("click", handleClick);

const myCat = document.querySelector("#myCat");
console.log(myCat);

myCat.addEventListener("mouseenter", addMe);
myCat.addEventListener("mouseleave", removeMe);

function addMe() {
  myCat.classList.add("round");
}

function removeMe() {
  myCat.classList.remove("round");
}

function handleClick() {
  console.log("hey did you just click me?");
  // topHeading.textContent = "This is a new heading!";
  myCat.classList.toggle("round");
}

const topHeading = document.querySelector("h1");
// console.log(topHeading);
// console.log(topHeading.textContent);
// topHeading.textContent = "This is a new heading!";
// topHeading.style.border = "2px solid green";

const allPara = document.querySelectorAll("p");
// console.log(allPara);
// console.log(allPara.textContent);
for (let i = 0; i < allPara.length; i++) {
  //   console.log(allPara[i].textContent);
  allPara[i].style.color = "blue";
  allPara[i].style.backgroundColor = "lightblue";
}

const myFirstSub = document.querySelector("#firstSubHeading");
// console.log(myFirstSub);
// console.log(myFirstSub.textContent);
