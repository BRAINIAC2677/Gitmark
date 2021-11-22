//adding gitmark button to the page
let heading = document.querySelector("h1");
let gitmarkButton = document.createElement("button");
gitmarkButton.classList.add("gitmark-btn");
heading.appendChild(gitmarkButton);

//marking the gitmark icon if the repos is gitmark
chrome.storage.sync.get(["repos"], function (result) {
  if (result.repos.includes(window.location.href)) {
    gitmarkButton.classList.add("filled");
  }
});

//adding/removing the repo on clicking gitmark icon
gitmarkButton.addEventListener("click", onGitmark);
function onGitmark() {
  chrome.storage.sync.get(["repos"], function (result) {
    if (result.repos.includes(window.location.href)) {
      result.repos.splice(result.repos.indexOf(window.location.href), 1);
      gitmarkButton.classList.remove("filled");
    } else {
      result.repos.push(window.location.href);
      gitmarkButton.classList.add("filled");
    }
    chrome.storage.sync.set({ repos: result.repos }, function () {
      console.log("repos updated");
    });
  });
}

//adding popup button to the page
let popupButton = document.createElement("button");
popupButton.innerHTML = "Gitmark";
popupButton.classList.add("popup-btn");
document.body.appendChild(popupButton);

//opening the popup on clicking popup button
popupButton.addEventListener("click", () => {
  gitmarkView.classList.toggle("show");
  popupButton.classList.toggle("popup-btn-clicked");
});

let gitmarkView = document.createElement("div");
gitmarkView.classList.add("gitmark-view");
document.body.appendChild(gitmarkView);

let gitmarkHeading = document.createElement("div");
gitmarkHeading.classList.add("gitmark-heading", "gitmark-items");
gitmarkHeading.innerHTML = "Gitmarks";
gitmarkView.appendChild(gitmarkHeading);

//get the repos from chrome sync storage and display them in the gitmark view
chrome.storage.sync.get(["repos"], function (result) {
  let repos = result.repos;
  if (repos == undefined) {
    repos = [];
  }
  for (let i = 0; i < repos.length; i++) {
    let repo = repos[i];
    let gitmarkItem = document.createElement("div");
    gitmarkItem.classList.add("gitmark-item", "gitmark-items");
    let url = new URL(repo);
    let repoName = url.pathname.split("/")[2];
    let authorName = url.pathname.split("/")[1];
    gitmarkItem.innerHTML = `<div><a href="${repo}">${repoName}</a><p>by ${authorName}</p></div>`;
    let mark = document.createElement("button");
    mark.classList.add("gitmark-btn", "filled");

    mark.addEventListener("click", () => {
      repos.splice(repos.indexOf(repo), 1);
      chrome.storage.sync.set({ repos: repos }, function () {
        console.log("repos updated");
      });
      gitmarkItem.remove();
    });

    gitmarkItem.appendChild(mark);
    gitmarkView.appendChild(gitmarkItem);
  }
});
