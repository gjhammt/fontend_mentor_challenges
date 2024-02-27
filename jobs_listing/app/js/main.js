// console.log("Hello World");
// import data from "../../data.json" assert { type: "json" };
// console.log(data);
const jobsContainer = document.querySelector(".jobs__list");

const fetchData = async () => {
  const res = await fetch("../../data.json");
  const data = await res.json();
  //   console.log(data);
  return data;
};

// fetchData();

const makeCards = (
  companyName,
  companyLogo,
  isNew,
  isFeatured,
  position,
  role,
  level,
  postedAt,
  contract,
  location,
  languages,
  tools
) => {
  return `<div class="jobs__single flex ${cardBorder(isFeatured)}">
          <div class="jobs__details flex">
            <div class="jobs__img">
              <img src=${companyLogo} alt="" />
            </div>
            <div class="jobs__description ">
              <div class="jobs__company flex flex-ai-c">
                <h3 class="jobs__company--name">${companyName}</h3>
                ${createNewFlags(isNew, isFeatured)}
              </div>
              <h2 class="jobs__title">${position}</h2>
              <ul class="flex flex-ai-c">
                <li>${postedAt}</li>
                <li>${contract}</li>
                <li>${location}</li>
              </ul>
            </div>
          </div>
          <div class="jobs__tech">
            <span class="role filter">${role}</span>
            <span class="level filter">${level}</span>
            ${createLang(languages)}
            ${createTools(tools)}
          </div>
        </div>`;
};

const displayJobs = (data) => {
  const singleJob = data.map((job) => {
    const companyName = job.company;
    const companyLogo = job.logo;
    const isNew = job.new;
    const isFeatured = job.featured;
    const position = job.position;
    const role = job.role;
    const level = job.level;
    const postedAt = job.postedAt;
    const contract = job.contract;
    const location = job.location;
    const languages = job.languages;
    const tools = job.tools;

    //   if(isFeatured === false){

    //   }
    //   const isFeatured = job.featured;
    //   console.log(img);
    let jobs = makeCards(
      companyName,
      companyLogo,
      isNew,
      isFeatured,
      position,
      role,
      level,
      postedAt,
      contract,
      location,
      languages,
      tools
    );
    return jobs;
  });

  jobsContainer.innerHTML = singleJob.join(" ");
};

const createNewFlags = (newFlag, featuredFlag) => {
  let flag = "";
  if (newFlag) flag += `<span class="jobs__company--new">New!</span>`;
  if (featuredFlag) {
    flag += `<span class="jobs__company--featured">Featured</span>`;
  }
  //   console.log(flag);
  return flag;
};

const refactoredData = (job, jobProperty, value) => {
  const matchingJob = job.filter((obj) => obj[jobProperty] === value);

  const remainingJobs = job.filter((obj) => obj[jobProperty] !== value);

  const resultArray = matchingJob.concat(remainingJobs);

  return resultArray;
};

const cardBorder = (featured) => {
  if (featured === true) {
    return `featured--job`;
  }
  return ``;
};

const createLang = (langs) => {
  let langCards = "";
  langs.forEach((lang) => {
    langCards += `<span class="job__tech filter">${lang}</span>`;
  });
  return langCards;
};

// Create Tools Cards
const createTools = (tools) => {
  let toolCards = "";
  tools.forEach((tool) => {
    toolCards += `<span class="job__tech filter">${tool}</span>`;
  });
  return toolCards;
};

let filterArray = [];

// Display filter on Search
// const displayFilter = (ele) => {
//   let filter = "";
//   if (!filterArray.includes(ele.textContent)) {
//     filterArray.push(ele.textContent);
//   }

//   filterArray.forEach((element) => {
//     filter += `
//         <div class="search-filter">
//         <span class="filter-content">${element}
//         <span class="filter-remove"> &#9747;</span>
//         </span>
//         </div>
//         `;
//     domElements.searchFilters.innerHTML = filter;
//     filterJob();
//   });
// };
const displaySearch = (e) => {
  let element = e.target;
  if (element.classList.contains("filter")) {
    // domElements.searchContainer.classList.remove("hidden");
    filterJob();
  }
};
// Update jobs list by changing filters
const filterJob = (data) => {
  console.log(data)
  if (filterArray.length !== 0) {
    let cards = "";
    fetchData().then((data) => {
      data.forEach((text) => {
        if (validJobs(text)) {
          cards += makeCards(text);
          console.log(text);
          jobsContainer.innerHTML = cards;
        }
      });
    });
  } else {
    // domElements.searchContainer.classList.add("hidden");
    console.log(data);
    makeCards(data);
  }
};

// Jobs are valid or not
const validJobs = (item) => {
  let isValid = true;
  filterArray.forEach((elem) => {
    if (
      item.role !== elem &&
      item.level !== elem &&
      !item.languages.includes(elem) &&
      !item.tools.includes(elem)
    ) {
      isValid = false;
    }
  });
  return isValid;
};

const start = async () => {
  const data = await fetchData();

  const resultArray = refactoredData(data, "new" && "featured", true);
  displayJobs(resultArray);
  // Display the result array
  console.log(resultArray);
  // refactorData(data);
};

jobsContainer.addEventListener("click", displaySearch);

start();
