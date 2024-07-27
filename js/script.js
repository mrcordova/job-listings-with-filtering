const dataResponse = await fetch("/data.json");
const data = await dataResponse.json();
const jobListingsUl = document.querySelector(".job-listings");

console.log(data);
// console.log(jobLisg tingsUl);

function myTags(strings, tags) {
  let tagTokens = "";
  for (const tag of tags) {
    tagTokens += `<p class="token">${tag}</p>`;
  }
  return tagTokens;
}

function createJobCard() {
  for (const job of data) {
    jobListingsUl.insertAdjacentHTML(
      "beforeend",
      `  <li class="job-listing ${job.featured ? "job-listing-featured" : ""} ">
              <img
              class="company-logo"
              src="${job.logo}"
              alt="${job.company}" />
              <div class="job-listing-desc">
              <!-- Item Start -->
              <div class="job-listing-company league-spartan-700">
              <span class="company-name">${job.company}</span>
              ${job.new ? "<span class='new'>NEW!</span>" : ""}
              ${job.featured ? "<span class='featured'>FEATURED</span>" : ""}
                  </div>
                  <h1 class="job-listing-title league-spartan-700">
                  ${job.position}
                  </h1>
                  <div class="job-listing-time league-spartan-700">
                  <p>${job.postedAt}</p>
                  <span>&bull;</span>
                  <p>${job.contract}</p>
                  <span>&bull;</span>
                  <p>${job.location}</p>
                  </div>
                  </div>
                  <div class="job-listing-categories league-spartan-700">
                  <p class="token">
                  <!-- Role -->
                  ${job.role}
                  </p>
                  <p class="token">
                  <!-- Level -->
                  ${job.level}
                  </p>
                  <!-- Languages -->
                  ${myTags`${job.languages}`}
                  ${myTags`${job.tools}`}
                  </div>
                  </li>`
    );
  }
  // <p class="token">HTML</p>
  // <p class="token">CSS</p>
  // <p class="token">JavaScript</p>
}
createJobCard();
