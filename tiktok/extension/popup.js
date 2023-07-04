// popup.js

document.addEventListener("DOMContentLoaded", function(event) {

// https://stackoverflow.com/a/60756477
const errString = "Could not establish connection. Receiving end does not exist.";
chrome.tabs.query({active: true}, async (tabs) => {
    console.log("popup.js: inside chrome.tabs.query()");
    const parent = document.getElementById("results-container");
    parent.innerText = "If you see this, try refreshing the page and trying again.";

    let tab = tabs[0];
    let tabId = tab.id;
    let tabUrl = tab.url
    console.log(`popup.js: tabs[0]: ${JSON.stringify(tabs[0])}`);

    chrome.runtime.sendMessage({
            event: 'popup-ready',
            to: 'background.js',
            tabId: tabId,
            tabUrl: tab.url
        },
        {}, // options
        async (response) => {
        try {
        let text = "";
        let lastError = chrome.runtime.lastError;
        if (lastError && lastError.message == errString) {
            // Connection error. May want to handle this as a special case?
            parent.innerHTML = `Error: ${JSON.stringify(lastError)}`;
            return;
        } else if (lastError) {
            parent.innerHTML = `Error: ${JSON.stringify(lastError)}`;
            return;
        } else if (response.result.error) {
            parent.innerHTML = `Error: ${response.result.text}`;
            return;
        }
        // No runtime error, no app error
        console.log(`popup.js: response: $(response)`);
        data = response.result.data
        text = `Success: ${JSON.stringify(data)}`;
        console.log(`popup.js: $(text)`);
        const parent = document.getElementById("results-container");
        //TODO actually make this HTML. Probably want something less hacky later, but whatever.
        //parent.innerHTML = response.result.text.split("\n").join("<br/>");
        parent.innerHTML = response.result.html;
        } catch (err) {
            console.log(`popup.js: $(err)`);
            parent.innerText = "If you see this, try refreshing the page and trying again.";
        }
        });
});
});

function downloadFile(filePath){
    var link=document.createElement('a');
    link.href = filePath;
    link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    link.click();
}
