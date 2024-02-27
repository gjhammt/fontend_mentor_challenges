console.log("Hello World");
import data from "../../data.json" assert { type: "json" };
// console.log(data);
const jobsContainer = document.querySelector(".jobs__list");

const fetchData = async () => {
  const res = await fetch("../../data.json");
  const data = await res.json();
  //   console.log(data);
  return data;
};

// fetchData();

const displayJobs = (data) => {
  const singleJob = data
    .map((job) => {
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
            <span class="role">${role}</span>
            <span class="level">${level}</span>
            ${createLang(languages)}
            ${createTools(tools)}
          </div>
        </div>`;
    })
    .join("");
  jobsContainer.innerHTML = singleJob;
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

const cardBorder = (featured) => {
  if (featured === true) {
    return `featured--job`;
  }
  return ``;
};

const createLang = (langs) => {
  let langCards = "";
  langs.forEach((lang) => {
    langCards += `<span class="job__tech">${lang}</span>`;
  });
  return langCards;
};

// Create Tools Cards
const createTools = (tools) => {
  let toolCards = "";
  tools.forEach((tool) => {
    toolCards += `<span class="job__tech">${tool}</span>`;
  });
  return toolCards;
};

const start = async () => {
  const data = await fetchData();
  displayJobs(data);
};

start();
