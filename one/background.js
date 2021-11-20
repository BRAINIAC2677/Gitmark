let color = "#123456";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log(`Default background color is ${color}`);
});
