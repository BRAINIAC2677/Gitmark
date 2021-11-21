//adding gitmark button to the page
let heading = document.querySelector("h1");
let gitmarkButton = document.createElement("button");
gitmarkButton.innerHTML = "Gitmark";
gitmarkButton.classList.add("gitmark-btn");
heading.appendChild(gitmarkButton);

gitmarkButton.addEventListener("click", function () {
  chrome.storage.sync.get(["repos"], function (result) {
    let repos = result.repos;
    if (repos == undefined) {
      repos = [];
    }
    if (repos.indexOf(window.location.href) == -1) {
      repos.push(window.location.href);
      chrome.storage.sync.set({ repos: repos }, function () {
        console.log("repos added");
        console.log(repos);
      });
    }
  });
});

//adding popup button to the page
let popupButton = document.createElement("button");
popupButton.innerHTML = "Popup";
popupButton.classList.add("popup-btn");
heading.appendChild(popupButton);

popupButton.addEventListener("click", () => {
  gitmarkView.classList.toggle("hide");
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
    gitmarkItem.innerHTML = `<a href="${repo}">${repoName}</a><p>by ${authorName}<p/>`;
    gitmarkView.appendChild(gitmarkItem);
  }
});
