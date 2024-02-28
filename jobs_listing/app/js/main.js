const jobsContainer = document.querySelector(".jobs__list");
const searchContainer = document.querySelector(".header__filter");
const search = document.querySelector(".header__tech");
const clearSelection = document.getElementById("clear");

const fetchData = async () => {
  const res = await fetch("../../data.json");
  const data = await res.json();
  return data;
};


const makeCards = (job) => {
  return `<div class="jobs__single flex ${cardBorder(job.featured)}">
          <div class="jobs__details flex">
            <div class="jobs__img">
              <img src=${job.logo} alt="" />
            </div>
            <div class="jobs__description ">
              <div class="jobs__company flex flex-ai-c">
                <h3 class="jobs__company--name">${job.company}</h3>
                ${createNewFlags(job.new, job.featured)}
              </div>
              <h2 class="jobs__title">${job.position}</h2>
              <ul class="flex flex-ai-c">
                <li>${job.postedAt}</li>
                <li>${job.contract}</li>
                <li>${job.location}</li>
              </ul>
            </div>
          </div>
          <div class="jobs__tech">
            <span class="role filter">${job.role}</span>
            <span class="level filter">${job.level}</span>
            ${createLang(job.languages)}
            ${createTools(job.tools)}
          </div>
        </div>`;
};

const displayJobs = (data) => {
  const singleJob = data.map((job) => {
    // const companyName = job.company;
    // const companyLogo = job.logo;
    // const isNew = job.new;
    // const isFeatured = job.featured;
    // const position = job.position;
    // const role = job.role;
    // const level = job.level;
    // const postedAt = job.postedAt;
    // const contract = job.contract;
    // const location = job.location;
    // const languages = job.languages;
    // const tools = job.tools;
    let jobs = makeCards(job);
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
  // console.log(langs)
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

const displaySearch = (e) => {
  let element = e.target;
  if (element.classList.contains("filter")) {
    searchContainer.classList.remove("hidden");
    displayFilter(element);
  }
};

let filterArray = [];


const displayFilter = (ele) => {
  let filter = "";
  if (!filterArray.includes(ele.textContent)) {
    filterArray.push(ele.textContent);
  }

  filterArray.forEach((element) => {
    filter += `<div class="header__search flex flex-ai-c"><span>${element}</span>
            <span class="remove">X</span></div>`;
  });
  search.innerHTML = filter;
  filterJob();
};

const filterJob = (jobs) => {
  if (filterArray.length !== 0) {
    let cards = "";
    fetchData().then((jobs) => {
      jobs.forEach((job) => {
        if (validJobs(job)) {
          cards += makeCards(job);
          jobsContainer.innerHTML = cards;
        }
      });
      jobsContainer.innerHTML = cards;
    });
  } else {
    fetchData().then((jobs) => {
      displayJobs(jobs);
    });
  }
};


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
};

const removeFilter = (e) => {
  let element = e.target;
  if (element.classList.contains("remove")) {
    const elementToRemove = element.parentElement;
    let index = filterArray.indexOf(
      elementToRemove.textContent.split(" ")[0].trim()
    );
    filterArray.splice(index, 1);
    elementToRemove.remove();
    filterJob();
  }
};

const clearSearch = () => {
  searchContainer.classList.add("hidden");
  filterArray = [];
  filterJob();
};

jobsContainer.addEventListener("click", displaySearch);
searchContainer.addEventListener("click", removeFilter);
clearSelection.addEventListener("click", clearSearch);

start();

