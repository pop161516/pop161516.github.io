function checkWeather() {
  // looks for id myTemp in html and stores it in myTemp in teh js file
  const myTemp = document.querySelector("#myTemp");

  const body = document.querySelector("body");
  const outer = document.querySelector(".outer");

  console.log(myTemp);
  let temp = myTemp.value;
  console.log("Temp value is", temp);
  if (temp < 10) {
    console.log("its freezing!");
    body.style.backgroundColor = "lightBlue";
    outer.style.backgroundColor = "skyblue";
  } else if (temp >= 10 && temp < 20) {
    console.log("nice and plesant");
    body.style.backgroundColor = "lightyellow";
    outer.style.backgroundColor = "wheat";
  } else if (temp >= 20 && temp < 35) {
    console.log("sunny");
    body.style.backgroundColor = "orange";
    outer.style.backgroundColor = "darkorange";
  } else if (temp >= 35) {
    console.log("really hot");
    body.style.backgroundColor = "red";
    outer.style.backgroundColor = "crimson";
  }
}
