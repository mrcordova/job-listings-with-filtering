const dataResponse = await fetch("/data.json");
const data = await dataResponse.json();
const jobListingsUl = document.querySelector(".job-listings");
const tokenContainer = document.querySelector(".tokens");
const tokenSet = new Set();
console.log(data);
// console.log(jobLisg tingsUl);

function myTags(strings, tags) {
  let tagTokens = "";
  for (const tag of tags) {
    tagTokens += `<p class="token">${tag}</p>`;
  }
  return tagTokens;
}
function addToken(e) {
  const name = e.currentTarget.textContent.trim();
  if (!tokenSet.has(name)) {
    createToken(name);
  }
  tokenSet.add(name);
}

function removeToken(e) {
  const name = e.currentTarget.previousElementSibling.textContent.trim();
  tokenSet.delete(name);
  e.currentTarget.parentElement.remove();
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
  const tokens = jobListingsUl.querySelectorAll(".token");
  for (const token of tokens) {
    token.addEventListener("click", addToken);
  }
  // <p class="token">HTML</p>
  // <p class="token">CSS</p>
  // <p class="token">JavaScript</p>
}

function createToken(name) {
  tokenContainer.insertAdjacentHTML(
    "beforeend",
    ` <div class="token-container">
            <p class="token">${name}</p>
            <button class="token-close-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                <path
                  fill="#FFF"
                  fill-rule="evenodd"
                  d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z" />
              </svg>
            </button>
          </div>`
  );
  tokenContainer.lastChild
    .querySelector(".token-close-btn")
    .addEventListener("click", removeToken);
}
createJobCard();
