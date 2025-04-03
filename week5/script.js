// console.log("Hello World!");

let myName = "Mataso";
// console.log(`Hi, ${myName}, whats up`);

let a = 100;
let b = parseInt("20");
// console.log(a, b, a + b);

let itIsSunday = false;

const myStudentRecord = {
  name: "Mataso",
  age: 19,
  id: 1234,
  homeTown: "Melbourne",
  isLocal: true,
};
// console.log(myStudentRecord);
// console.log(myStudentRecord.homeTown);

let message = myStudentRecord.age >= 18 ? "an adult" : "a child";
// console.log(
//   `I can see your ${myStudentRecord.age}, that means your ${message}`
// );

let student1 = "Mataso";
let student2 = "Roger";
let student3 = "Lucy";
let student5 = "Sarah";

let students = ["Mataso", "Roger", "Lucy", "Sarah", "Jim", "Mike"];
// console.log(students);
// console.log(students[1]);

// let grade = 660;
// if (grade > 75) {
//   console.log("You got a distinction");
// } else if (grade > 50) {
//   console.log("You just passed");
// } else {
//   console.log("You failed");
// }

for (let i = 0; i < students.length - 1; i++) {
  console.log("hello", students[i]);
}
