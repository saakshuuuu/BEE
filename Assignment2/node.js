// Student Management System
// Problem Statement
// You are given an array of student objects.


const students = [
  { id: 101, name: "Aman", marks: 82, course: "Java" },
  { id: 102, name: "Priya", marks: 95, course: "Python" },
  { id: 103, name: "Rahul", marks: 67, course: "Java" },
  { id: 104, name: "Neha", marks: 76, course: "Web" },
  { id: 105, name: "Rohan", marks: 88, course: "Python" }
];

// Complete the following tasks.

// Task 1 – Add a Student (push)
// Add the following student at the end of the array.
// {id:106, name:"Simran", marks:91, course:"Java"}
// Print the updated array.

students.push({id:106, name:"Simran", marks:91, course:"Java"});
console.log("Task 1: ", students);



// Task 2 – Remove Last Student (pop)
// Remove the last student from the array.
// Print the removed student.

const remove = students.pop();
console.log("Task 2: ", remove);



// Task 3 – Add Student at Beginning (unshift)
// Add
// {id:100, name:"Ankit", marks:80, course:"Web"}
// at the beginning of the array.
// Print the array.

students.unshift({id:100, name:"Ankit", marks:80, course:"Web"});
console.log("Task 3: ", students);



// Task 4 – Remove First Student (shift)
// Remove the first student.
// Print the removed student.

const removeFirst = students.shift();
console.log("Task 4: ", removeFirst);



// Task 5 – Update Array Using splice()
// Remove the student having
// id = 103
// and insert
// {id:107, name:"Karan", marks:78, course:"Java"}
// at the same position.
// Print the updated array.

const index = students.findIndex(student => student.id === 103);
students.splice(index, 1, {id:107, name:"Karan", marks:78, course:"Java"});
console.log("Task 5: ", students);


// Task 6 – Create a New Array Using slice()
// Create a new array containing only the first three students.
// Print it.

const firstThree = students.slice(0,3);
console.log("Task 6: ", firstThree);


// Task 7 – Array Iteration (for...of)
// Display all students in the format
// Aman - Java - 82
// Priya - Python - 95
// Rahul - Java - 67

console.log("Task 7:");
for (const student of students) {
  console.log(
    `${student.name} - ${student.course} - ${student.marks}`
  );
}


// Task 8 – forEach()
// Print only the student names using forEach().
// Expected Output
// Aman
// Priya
// Rahul
// Neha
// Rohan

console.log("Task 8:");
students.forEach(student => {
  console.log(student.name);
});


// Task 9 – map()
// Create a new array containing only student names.
// Expected Output
// [
// "Aman",
// "Priya",
// "Rahul",
// "Neha",
// "Rohan"
// ]

const names = students.map(student => student.name);
console.log("Task 9:", names);


// Task 10 – filter()
// Create a new array of students whose marks are greater than or equal to 80.
// Print the new array.

const topStudents = students.filter(
  student => student.marks >= 80
);
console.log("Task 10:", topStudents);


// Task 11 – reduce()
// Find
// (a) Total Marks
// Example Output
// Total Marks = 408
// (b) Average Marks
// Example Output
// Average = 81.6

const totalMarks = students.reduce(
  (sum, student) => sum + student.marks,
  0
);

const averageMarks = totalMarks / students.length;

console.log("Task 11:");
console.log("Total Marks =", totalMarks);
console.log("Average =", averageMarks);


// Task 12 – sort()
// Sort students by marks (Ascending)
// Expected Output
// 67
// 76
// 82
// 88
// 95

students.sort((a, b) => a.marks - b.marks);

console.log("Ascending:");
students.forEach(student => {
    console.log(student.marks);
});



// Sort students by marks (Descending)
// Expected Output
// 95
// 88
// 82
// 76
// 67

students.sort((a, b) => b.marks - a.marks);

console.log("Descending:");
students.forEach(student => {
    console.log(student.marks);
});

HigherOrderFunctions.js