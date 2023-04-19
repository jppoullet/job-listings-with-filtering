const myJobPosting = document.createElement("div");
myJobPosting.classList.add("jobPosting");
mainContainer.appendChild(myJobPosting);

const companyLogo = document.createElement("img");
companyLogo.classList.add(".companyLogo");
myJobPosting.appendChild(companyLogo);

const jobPostingTitle = document.createElement("div");
jobPostingTitle.classList.add("jobPostingTitle");
myJobPosting.appendChild(jobPostingTitle);

const company = document.createElement("h1");
company.classList.add("company");
jobPostingTitle.appendChild(company);

const newStatus = document.createElement("span");
newStatus.classList.add("new");
function isNewTrue(obj) {
  if (obj[i].new === true) {
    jobPostingTitle.appendChild(newStatus);
    return "NEW!";
  }
}

const featuredStatus = document.createElement("span");
featuredStatus.classList.add("featured");
function isFeaturedTrue(obj) {
  if (obj[i].featured === true) {
    jobPostingTitle.appendChild(featuredStatus);
    return "FEATURED";
  }
}

const positionTitle = document.createElement("h2");
positionTitle.classList.add("positionTitle");
myJobPosting.appendChild(positionTitle);

const contractAndLocation = document.createElement("ul");
contractAndLocation.classList.add("contractAndLocation");
myJobPosting.appendChild(contractAndLocation);
const datePosted = document.createElement("span");
contractAndLocation.appendChild(datePosted);
const contract = document.createElement("span");
contractAndLocation.appendChild(contract);
const location = document.createElement("span");
contractAndLocation.appendChild(location);

const horizontalLine = document.createElement("hr");
myJobPosting.appendChild(horizontalLine);

const languagesAndToolsList = document.createElement("div");
languagesAndToolsList.classList.add("languagesAndToolsList");
const languages = document.createElement("li");
const tools = document.createElement("li");
myJobPosting.appendChild(languagesAndToolsList);
languagesAndToolsList.appendChild(languages);
languagesAndToolsList.appendChild(tools);

companyLogo.src = `${obj[i].logo}`;
company.innerHTML = `${obj[i].company}`;
positionTitle.innerHTML = `${obj[i].position}`;
contractAndLocation.innerHTML = `    
    <li>${obj[i].postedAt}</li>
    <li>${obj[i].contract}</li>
    <li>${obj[i].location}</li>    
    `;

// Show the new and featured statuses of job listing
newStatus.innerHTML = `${isNewTrue(obj)}`;
featuredStatus.innerHTML = `${isFeaturedTrue(obj)}`;

// Languages and Tools for job listing
const role = obj[i].role;
const level = obj[i].level;
const languageArray = obj[i].languages;
const toolsArray = obj[i].tools;

languagesAndToolsList.innerHTML = `<button>${role}</button>`;
languagesAndToolsList.innerHTML += `<button>${level}</button>`;
languagesAndToolsList.innerHTML += `
    ${languageArray
      .map(function (lang) {
        return `<button>${lang}</button>`;
      })
      .join("")}`;

languagesAndToolsList.innerHTML += `${toolsArray
  .map((tool) => {
    return `<button>${tool}</button>`;
  })
  .join("")}`;
