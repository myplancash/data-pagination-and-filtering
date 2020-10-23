/*
Treehouse Techdegree:
Project 2 - Data Pagination and Filtering
*/


// Select the UL element with a class of student-list and assign its value to a variable.
let studentList = document.querySelector('.student-list');
// Select the UL element with a class of link-list and assign its value to a variable.
const studentsPage = document.querySelector('.link-list');

const header = document.querySelector(".header");



const showPage = (list, page) => {
   //variables to determine the range of students items. e.g. 1(first page) * 9 (items per page) = 9 MINUS the items per page equals 0. Other pages will result in 9, 18, 27 and so on. These integers correspond to the first items that would want to see on page 1, 2, 3 etc. The endIndex formula corresponds to the last items we want to see (8, 17, 26 and so on).
   const starIndex = (page * 9) - 9;
   const endIndex = (page * 9);

   // to remove any students that might have previously been displayed.
   studentList.innerHTML = "";

   //Loop over the list parameter, that needs first parameter to display a section of student items.
   for (let i = 0; i < list.length; i++) {
      student = list[i];
      // filters the exact positions from the database
      if (i >= starIndex && i <= endIndex) {
         //node created for student template and adding classes to the node.
         let studentItem = document.createElement('li');
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

const addPagination = (list) => {

   //Create a variable to store the value of the number of pagination buttons needed.
   //You can calculate this using the length of the list parameter.
   const maxPage = Math.ceil(list.length / 9);
   //to remove any pagination buttons that might have previously been displayed.
   studentsPage.innerHTML = "";


   // loop over the number of pages needed
   for (let i = 1; i <= maxPage; i++) {

      const pagButton = `
         <li>
            <button type="button">${i}</button>
         </li>
      `
      //Insert the elements you have created to the link-list variable you created earlier.
      studentsPage.insertAdjacentHTML("beforeend", pagButton)
   }

   // Select the first pagination button
   studentsPage.firstElementChild.firstElementChild.classList.add("active")

   //Event Listener for the clicking the btn's behaviour.
   studentsPage.addEventListener("click", (e) => {
      if(e.target.tagName === "BUTTON") {
         const btn = e.target;
         const li = btn.parentElement;
         const ul = li.parentElement;

         //select the active btn by his classname
         activeButton = ul.getElementsByClassName("active");

         // search ul and get all elements with active class
         const leftButtons = ul.getElementsByClassName('active');

         //loop through buttons and remove active class
         for (let i = 0; i < leftButtons.length; i++)
         leftButtons[i].classList.remove('active');

         // add active to the current button
         btn.classList.add('active');

         //refresh page
         showPage(list, e.target.textContent);
      }
   })
}

// Calls functions when page loads
showPage(data, 1);
addPagination(data);





// using template literal to replicate the HTML search bar
const addSearchBar = `
   <label for="search" class="student-search">
      <input id="search" placeholder="Search by name..." autocomplete="off">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;

// insert the search bar inside the header after last child
header.insertAdjacentHTML('beforeend', addSearchBar);

//searchbar logic

// assigning the input element with id of 'search' to variable 'search'
const inputSearch = document.querySelector("#search");
// assigning the button element to the variable 'submit'
const buttonSearch = document.querySelector(".student-search button");
buttonSearch.classList.add("submit");

// display error
const error = (input) => {
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = `<h1>'${input}' not found. Please try another name!</h1>`;
   studentList.style.color = 'red';
   studentList.style.textAlign = 'center';
}


inputSearch.addEventListener('keyup', (e) => {
   // filterData(e.target.value)
   const textInput = e.target.value.toLowerCase().trim();
   const newStudentsList = [];

   for (let i = 0; i < data.length; i++) {
      let student = data[i];
      const studentName = `${student.name.first.toLowerCase()} ${student.name.last.toLowerCase()}`;

         if(studentName.includes(textInput)) {
            newStudentsList.push(data[i]);
            showPage(newStudentsList, 1);
            addPagination(newStudentsList);
         }

   }

   /*  if(studentFilter.length > 0) {
      showPage(page, studentFilter);
      addPagination(page, maxPerPage, studentFilter);
   } else {
      studentList.innerHTML = '';
      studentsPage.innerHTML = '';
   } */
   if (newStudentsList.length === 0) {
      error(textInput);
   }
})



// create a button click event
buttonSearch.addEventListener("click", (e) => {
   //capture input value
   const inputValue = e.target.value.toLowerCase();
   // create an empty array to pushing then
   const newStudentsList = [];


   //looping through initial data array
   for (let i = 0; i < data.length; i++) {
      const newStudent = data[i]
      const studentName = `${newStudent.name.title.toLowerCase()} ${newStudent.name.first.toLowerCase()} ${newStudent.name.last.toLowerCase()}`;

      // Checking if each student's Title, first and last name (studentName) match with the value user searched (inputValue)
      if(studentName.includes(inputValue)) {
         // pushing the each one of the data into the already created empty array
         newStudentsList.push(data[i]);
         // showing the newly unpdated array of students matched
         showPage(newStudentsList, 1);
         addPagination(newStudentsList);
      }
   }
   // If no results are found, then display message
   if (newStudentsList.length === 0) {
      error(inputValue);
   }

})