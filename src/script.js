"use strict";

getData();

let jobsData;
async function getData() {
  const response = await fetch("./data.json");
  jobsData = await response.json();

  populateJobs(jobsData);
}

const company = document.querySelectorAll(".jobPosting");
const mainContainer = document.querySelector("main");
const newSpan = document.querySelector(".new");
const filterBy = document.querySelector(".filterBy");
const langAndToolList = document.querySelector(".languagesAndToolsList");

// Function to populate and use json data
function populateJobs(obj) {
  // console.table(obj);
  mainContainer.innerHTML = "";

  for (let i = 0; i < obj.length; i++) {
    // const skills = [...obj[i].languages, ...obj[i].tools];

    // Populate main with Job Posting Cards
    mainContainer.innerHTML += `
    <div class="jobPosting">
      <img class="companyLogo" src="${obj[i].logo}" alt="" />
      <div class="jobPostingTitle">
        <div class="company">${obj[i].company}</div>
        <div>
          ${ifNewIsTrue(obj)}
          ${ifFeaturedIsTrue(obj)}
        </div>
      </div>

      <div class="positionTitle">${obj[i].position}</div>
      
      <ul class="contractAndLocation">
        <li>${obj[i].postedAt}</li>
        <li>${obj[i].contract}</li>
        <li>${obj[i].location}</li>
      </ul>

      <hr />

      <div class="languagesAndToolsList">
        <button data-type="role">${obj[i].role}</button>
        <button data-type="level">${obj[i].level}</button>
        ${obj[i].languages
          .map(function (language) {
            return `<button data-type="language">${language}</button>`;
          })
          .join("")}
        
        ${obj[i].tools
          .map((tool) => {
            return `<button data-type="tool">${tool}</button>`;
          })
          .join("")}        
        </div>
    </div>`;

    // To determine is Job Posting is new/featured
    function ifNewIsTrue() {
      if (obj[i].new === true) {
        return '<span class="new">NEW!</span>';
      } else {
        return "";
      }
    }

    function ifFeaturedIsTrue() {
      if (obj[i].new === true) {
        return '<span class="featured">FEATURED</span>';
      } else {
        return "";
      }
    }

    // function isNewTrue(obj) {
    //   if (obj[i].new === true) {
    //     return "NEW!";
    //   } else {
    //     return "";
    //   }
    // }

    // function isFeaturedTrue(obj) {
    //   if (obj[i].featured === true) {
    //     return "FEATURED";
    //   } else {
    //     return "";
    //   }
    // }

    // Add Filter to Search Criteria
    let addFilterButton = mainContainer.querySelectorAll("button");
    let filterValue;

    addFilterButton.forEach((btn) => {
      btn.addEventListener("click", function () {
        filterValue = btn.innerHTML;
        console.log(filterValue);

        function filterTools(arr, query) {
          return arr.filter((el) => el.tools.includes(query));
        }

        if (btn.dataset.type === "language") {
          console.log("dataset-type = language");
        }

        jobsData = filterLanguages(obj, filterValue);
        // jobsData = filterTools(obj, filterValue);

        filterBy.innerHTML += `
        <div>
        <span>${filterValue}</span>
        <button class="remove-filter">X</button>
        </div>`;

        populateJobs(jobsData);
      });
    });

    // Remove filter from Search Criteria
    let removeFilterButton = document.querySelector(".remove-filter");
  }
  filterBy.addEventListener("click", function (e) {
    console.log(e.target);

    if (e.target.classList.contains("remove-filter")) {
      e.target.parentNode.remove();

      if (filterBy.innerHTML === NaN) {
        filterBy.innerHTML = "";
      }
      console.log("remove classlist");
    }
  });
}

function filterLanguages(arr, query) {
  return arr.filter((el) => el.languages.includes(query));
}

// Ricky's Code Below

// function(filters) { postings.filter((posting ) => {
//   Filters.foreach((filter) =>
//   Item.tags.includes = filter
// }
// //if all filters exist with posting
// Then return into an array or wherever you hold all ur postings

// }

let postsToDisplay;
let selectedFilters = ["Senior", "Html", "Css"];

const onChangeFilter = (selectedFilters) => {
  postsToDisplay = allPosts.filter((post) => {
    selectedFilters.forEach((selectedFilter) => {
      !post.includes(!selectedFilter);
      return false;
    });
    return post;
  });
};

// It would be allposts.filter() not allposts.tags.filter()

// Then post.tags.include()
