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

function populateJobs(obj) {
  console.table(obj);
  mainContainer.innerHTML = "";

  for (let i = 0; i < obj.length; i++) {
    mainContainer.innerHTML += `
    <div class="jobPosting">
      <img class="companyLogo" src="${obj[i].logo}" alt="" />
      <div class="jobPostingTitle">
        <div class="company">${obj[i].company}</div>
        <div>
          <span class="new">${isNewTrue(obj)}</span>
          <span class="featured">${isFeaturedTrue(obj)}</span>
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
        <button>${obj[i].role}</button>
        <button>${obj[i].level}</button>
        ${obj[i].languages
          .map(function (lang) {
            return `<button>${lang}</button>`;
          })
          .join("")}

        ${obj[i].tools
          .map((tool) => {
            return `<button>${tool}</button>`;
          })
          .join("")}
      </div>
    </div>`;

    function isNewTrue(obj) {
      if (obj[i].new === true) {
        return "NEW!";
      } else {
        return "";
      }
    }

    function isFeaturedTrue(obj) {
      if (obj[i].featured === true) {
        return "FEATURED";
      } else {
        return "";
      }
    }

    let button = document.querySelectorAll("button");
    let buttonArr = Array.from(button);

    button.forEach((btn) => {
      btn.addEventListener("click", function () {
        let filterValue = btn.innerHTML;
        console.log(filterValue);

        function filterLanguages(arr, query) {
          return arr.filter((el) => el.languages.includes(query));
        }

        jobsData = filterLanguages(obj, filterValue);
        console.log(jobsData);
        populateJobs(jobsData);

        // for (let i = 0; i < results.length; i++) {
        //   console.log(results);
        // }
      });
    });
  }
}
