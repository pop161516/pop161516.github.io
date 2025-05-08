const myInput = document.querySelector("my-input");
console.log(myInput);

const myButton = document.querySelector("my-button");
console.log(myButton);

myButton.addEventListener("click", moveInput);

let clicked = false;

function moveInput() {
  if (!clicked) {
    myInput.style.translate = "30px 20px";
    clicked = true;
  } else {
    myInput.style.translate = "0px 0px";
    clicked = false;
  }
}
