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
   for (let i = 0; i < data.length; i++) {
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
         // add the prevously created html student template to studentList
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


function addSearchBar() {
   // using template literal to replicate the HTML search bar
   const searchBar = `
      <label for="search" class="student-search">
         <input id="search" placeholder="Search by name..." autocomplete="off">
         <button type="button"><img src="img/icn-search.svg" class= "submit" alt="Search icon"></button>
      </label>`;
      // insert the search bar inside the header after last child
      header.insertAdjacentHTML('beforeend', searchBar);
}

function addSearchFilter(data) {
   // assigning the input element with id of 'search' to variable 'search'
   const inputSearch = document.querySelector("#search");
   // assigning the button element to the variable 'submit'
   const buttonSearch = document.querySelector(".student-search button");

   // create a input keyup event
   inputSearch.addEventListener("keyup", event => {
      const inputTargetValue = event.target.value.toLowerCase();
      const newStudentList = [];


      for (let i = 0; i < data.length; i++) {
      const newStudent = data[i]
      const studentName = `${newStudent.name.title.toLowerCase()} ${newStudent.name.first.toLowerCase()} ${newStudent.name.last.toLowerCase()}`;
         //// Checking if each student's Title, first and last name (studentName) match with the value user is typing (inputTargetValue)
         if(studentName.includes(inputTargetValue)) {
            // pushing the each one of the data into the already created empty array
            newStudentList.push(data[i]);
            // showing the newly unpdated array of students matched
            showPage(page, newStudentList);
         }
      }
      // showing the inicial student list if there is no match
      if (newStudentList === 0) {
         showPage(page, data);
         addPagination(page, maxPerPage, data);
      }
   })


   // create a button click event
   buttonSearch.addEventListener("click", () => {
      //capture input value
      const inputValue = inputSearch.value.toLowerCase();
      // create an empty array to pushing then
      const newStudentList = [];


      //looping through initial data array
      for (let i = 0; i < data.length; i++) {
         const newStudent = data[i]
         const studentName = `${newStudent.name.title.toLowerCase()} ${newStudent.name.first.toLowerCase()} ${newStudent.name.last.toLowerCase()}`;

         // Checking if each student's Title, first and last name (studentName) match with the value user searched (inputValue)
         if(studentName.includes(inputValue)) {
            // pushing the each one of the data into the already created empty array
            newStudentList.push(data[i]);
            // showing the newly unpdated array of students matched
            showPage(page, newStudentList);
         }
      }
      // If no results are found, then display message
      if (newStudentList.length === 0) {
         error(inputValue);
      }

   })
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
// Call the third function which insert the search bar dinamically
addSearchBar();
// Call fourth function passing data, adds functionality to the search bar
addSearchFilter(data);
