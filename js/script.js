/*
Treehouse Techdegree:
Project 2 - Data Pagination and Filtering
*/



let list = data;
//sets the amount of students displayed on the page.
const maxPage = 9;
//sets the nth page on loading
const page = 1;
//empty sting to be replaced with the search.value
let searchString = "";


//Create a variable to store the value of the number of pagination buttons needed. You can calculate this using the length of the list parameter.
let maxPerPage = Math.ceil(list.length / 9);

// Select the UL element with a class of student-list and assign its value to a variable.
let studentList = document.querySelector('.student-list');
// Select the UL element with a class of link-list and assign its value to a variable.
const studentsPage = document.querySelector('.link-list');

const header = document.querySelector(".header");



let studentItem;
//Node for the HTML to show student items or no result.
function showPage(page, data) {
   //variables to determine the range of students items. e.g. 1(first page) * 9 (items per page) = 9 MINUS the items per page equals 0. Other pages will result in 9, 18, 27 and so on. These integers correspond to the first items that would want to see on page 1, 2, 3 etc. The endIndex formula corresponds to the last items we want to see (8, 17, 26 and so on).
   const starIndex = (page * maxPage) - maxPage;
   const endIndex = page * maxPage - 1;



   // to remove any students that might have previously been displayed.
   studentList.innerHTML = "";

   //Loop over the list parameter, that needs first parameter to display a section of student items.
   for (let i = 0; i < list.length; i++) {
      student = data[i];
      // filters the exact positions from the database
      if (i >= starIndex && i <= endIndex) {
         //node created for student template and adding classes to the node.
         studentItem = document.createElement('li');
         studentItem.classList.add('student-item', 'cf');

         // student item template:
         studentItem.innerHTML =
            `
            <div class="student-details">
                    <img class="avatar"
                    src="${student.picture.large}"
                    alt="Profile Picture">
                <h3>${student.name.first} ${student.name.last}</h3>
                <span class="email">${student.email}</span>
            </div>
            <div class="joined-details">
                <span class="date">Joined ${student.registered.date}</span>
            </div>
            `
         studentList.appendChild(studentItem);
      }
   }
}

function addPagination(page, maxPerPage, data) {
   //to remove any pagination buttons that might have previously been displayed.
   studentsPage.innerHTML = "";
   // loop over the number of pages needed
   for (let i = 0; i < maxPerPage; i++) {
      //create the LI elements and buttons with page numbers
      let LI = document.createElement('li');
      //create the btn with 0 index plus 1 to add the right number
      let btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = i + 1;
      LI.appendChild(btn);

      // Select the first pagination button
      btn = LI.firstElementChild;

      //Event Listener for the clicking the btn's behaviour.
      btn.addEventListener('click', () => {

         //Use the inner HTML of the btn to pass which btn is being clicked to the functions
         showPage(parseInt(btn.textContent, 10), data);
         addPagination(parseInt(btn.textContent, 10), maxPerPage, data);
      })

      // and give it a class name of active.
      if (i + 1 === page) {
         btn.classList.add('active');
      }

      //Append the button element to the ul
      studentsPage.appendChild(LI);
   }
}
s

// keyup event on the go
function addSearchBar() {

//Dynamically create and add a search bar. Avoid making any changes in the index.html file
const label = document.createElement("LABEL");
label.classList.add("student-search");
label.setAttribute("for", "search");
header.appendChild(label);

const input = document.createElement("INPUT");
input.setAttribute("id", "search");
// Create a "placeholder" attribute
let att = document.createAttribute("placeholder");
// Set the value of the placeholder attribute
att.value = "Search by name...";
input.setAttributeNode(att);

label.appendChild(input);

const button = document.createElement("BUTTON");
button.type = "button";
button.classList.add("search-button");

const img = document.createElement("IMG");
img.setAttribute("src", "img/icn-search.svg");
img.setAttribute("alt", "Search icon");
button.appendChild(img);

label.appendChild(button);

   input.addEventListener("keyup", event => {
      const inputTargetValue = event.target.value.toLowerCase();
      const newStudentList = [];

      for (let i = 0; i < data.length; i++) {
         const studentName = `${data[i].name.title.toLowerCase()} ${data[i].name.first.toLowerCase()} ${data[i].name.last.toLowerCase()}`;

         if(studentName.includes(inputTargetValue)) {
            newStudentList.push(data[i]);
            showPage(page, newStudentList);
            addPagination(newStudentList);
         }
      }

      if (newStudentList.length === 0) {
         error(inputTargetValue);
         addPagination(newStudentList);
      }

   })

   // Add Functionality to the Search Component
   button.addEventListener("click", () => {
      const inputValue = input.value.toLowerCase();
      const newStudentList = [];

      for (let i = 0; i < data.length; i++) {
         const studentName = `${data[i].name.title.toLowerCase()} ${data[i].name.first.toLowerCase()} ${data[i].name.last.toLowerCase()}`;

         if(studentName.includes(inputValue)) {
            newStudentList.push(data[i]);
            showPage(page, newStudentList);
            addPagination(newStudentList);
         }
      }

      if (newStudentList.length === 0) {
         error(inputValue);
         addPagination(newStudentList)
      }
   });
}


// display error
function error(input) {
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = `<h1>'${input}' not found. Please try another name!</h1>`;
   studentList.style.color = 'red';
   studentList.style.textAlign = 'center';
}



//Call the first function to display a “page”, passing in the data variable and 1 as arguments.
showPage(page, data);
//Call the second function to add pagination buttons, passing the data variable as an argument.
addPagination(page, maxPerPage, data);
addSearchBar();
