"use strict";

getData();

// Create an array copy of json data, added key/value pair filteringTags

function reformatData(json, array) {
  json.forEach((posting) => {
    array.push({
      ...posting,
      filteringTags: [
        posting.role,
        posting.level,
        ...posting.languages,
        ...posting.tools,
      ],
    });
  });
}

let jobsData;
let updatedPostings = [];
async function getData() {
  const response = await fetch("data.json");
  jobsData = await response.json();

  reformatData(jobsData, updatedPostings);
  populateJobs(updatedPostings);
}

const mainContainer = document.querySelector("main");
const filterBy = document.querySelector(".filterBy");

// Function to populate and use json data
function populateJobs(json) {
  mainContainer.innerHTML = "";

  for (let i = 0; i < json.length; i++) {
    // Populate main with Job Posting Cards
    mainContainer.innerHTML += `
    <div class="jobPosting">
      <img class="companyLogo" src="${json[i].logo}" alt="" />
      <div class="jobPostingTitle">
        <div class="company">${json[i].company}</div>
        <div>
          ${ifNewIsTrue(json)}
          ${ifFeaturedIsTrue(json)}
        </div>
      </div>

      <div class="positionTitle">${json[i].position}</div>
      
      <ul class="contractAndLocation">
        <li>${json[i].postedAt}</li>
        <li>${json[i].contract}</li>
        <li>${json[i].location}</li>
      </ul>

      <hr />

      <div class="languagesAndToolsList">
        <button data-type="role">${json[i].role}</button>
        <button data-type="level">${json[i].level}</button>
        ${json[i].languages
          .map(function (language) {
            return `<button data-type="language">${language}</button>`;
          })
          .join("")}
        
        ${json[i].tools
          .map((tool) => {
            return `<button data-type="tool">${tool}</button>`;
          })
          .join("")}        
        </div>
    </div>`;

    // To determine is Job Posting is new/featured
    function ifNewIsTrue() {
      if (json[i].new === true) {
        return '<span class="new">NEW!</span>';
      } else {
        return "";
      }
    }

    function ifFeaturedIsTrue() {
      if (json[i].featured === true) {
        return '<span class="featured">FEATURED</span>';
      } else {
        return "";
      }
    }
  } // End of for loop

  // Add Filter to Search Criteria
  let addFilterButton = mainContainer.querySelectorAll("button");
  let filterValue;

  addFilterButton.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterValue = btn.innerHTML;
      console.log(filterValue);

      filterBy.style.display = "flex";
      filterBy.innerHTML += `
      <div class="filter-tag">
      <span>${filterValue}</span>
      <button class="remove-filter">x</button>
      </div>`;

      selectedFilters.push(filterValue);
      console.log(selectedFilters);
      postsToDisplay = [];
      onChangeFilter(updatedPostings, selectedFilters);
      console.log(postsToDisplay);
      populateJobs(postsToDisplay);
    });
  });
}

let postsToDisplay = []; // array that holds filtered job postings
let selectedFilters = []; // array that holds selected filtering tags

function onChangeFilter(updatedPostingsArr, selectedFiltersArr) {
  updatedPostingsArr.filter((post) => {
    if (
      !selectedFiltersArr.every((selectedFilter) =>
        post.filteringTags.includes(selectedFilter)
      )
    ) {
      return;
    } else {
      postsToDisplay.push(post);
    }
  });
}

// Remove filter from Search Criteria
filterBy.addEventListener("click", function (e) {
  // console.log(e.target);
  let filterValue = e.target.previousElementSibling.innerText;
  let index = selectedFilters.indexOf(filterValue);

  if (e.target.classList.contains("remove-filter")) {
    e.target.parentNode.remove();

    if (index > -1) {
      selectedFilters.splice(index, 1);
    }

    if (selectedFilters.length === 0) {
      filterBy.style.display = "none";
    }

    console.log(selectedFilters);
    postsToDisplay = [];
    onChangeFilter(updatedPostings, selectedFilters);
    console.log(postsToDisplay);
    populateJobs(postsToDisplay);
  }
});
