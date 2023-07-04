// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`background.js: got message ${JSON.stringify(request)}`);
  (async function () {
    if (request.to !== "background.js") {
      return;
    }

    try {
      let data = await chrome.scripting.executeScript({
        target: { tabId: request.tabId, allFrames: true },
        func: getData,
        world: "MAIN"
      });
      console.log(`background.js: Got data ${JSON.stringify(data)}`);
      let result = data[0].result;
      console.log(`background.js: Got text ${result.text}`);
      let r = { result: result };
      sendResponse(r);
    } catch (err) {
      const msg = `background.js: Couldn't execute getData(): ${err}`;
      console.log(msg);
      sendResponse({ response: msg, error: true });
    }
  })();
  return true;
});

function getData() {
  var parsedUrl = new URL(window.location.href);
  console.log(`background.js: parsed $(parsedUrl)`);
  var params = parsedUrl.searchParams;
  var id;
  if (parsedUrl.pathname.includes('/video/')) {
    let pathParts = parsedUrl.pathname.split('/');
    id = pathParts[pathParts.length - 1];
  } else if (params.has("item_id")) {
    id = params.get("item_id");
  } else {
    let text = "Sorry, not sure which video you want.";
    return text;
  }

  var d = window['SIGI_STATE'];
  console.log(d);
  var text, data, html, error;
  if (id in d.ItemModule) {
    item = d.ItemModule[id];
    let createTime = item.createTime;
    let createDate = new Date(createTime * 1000);

    let author = item.author;
    if (author in d.UserModule.users) {
      var authorCreateTime = d.UserModule.users[author].createTime;
      var authorCreateDate = new Date(authorCreateTime * 1000);
    }

    d = {
      author: author,
      authorId: item.authorId,
      authorCreateTime: authorCreateTime,
      authorCreateDate: authorCreateDate,
      videoCreateDate: createDate,
      videoCreateTime: createTime,
      videoId: id,
      downloadUrl: item.video.downloadAddr
    };

    text = `Author:\n${d.author}\n
  Author ID:\n${d.authorId}\n
  Author Create Time:\n${d.authorCreateTime}\n
  Author Create Date:\n${d.authorCreateDate}\n
  Video Create Date:\n${d.videoCreateDate}\n
  Video Create Time:\n${d.videoCreateTime}\n
  Video ID:\n${d.videoId}\n
  Download URL:\n${d.downloadUrl}`;

    html = `<div>Author: <span id="author">${d.author}</span></div>
  <div>Author ID: <span id="authorId">${d.authorId}</span></div>
  <div>Author Create Time: <span id="authorCreateTime">${d.authorCreateTime}</span></div>
  <div>Author Create Date: <span id="authorCreateDate">${d.authorCreateDate}</span></div>
  <div>Video Create Date: <span id="videoCreateDate">${d.videoCreateDate}</span></div>
  <div>Video Create Time: <span id="videoCreateTime">${d.videoCreateTime}</span></div>
  <div>Video ID: <span id="videoId">${d.videoId}</span></div>
  <br/>
  <a id="downloadUrl" target="_blank" href="${d.downloadUrl}">Download URL</a>`;
    error = false;
  } else {
    let url = `https://www.tiktok.com/foryou?item_id=${id}`;
    text = `Timestamp for video ${id} not available on page.\nRefresh page or visit the URL below, then retry.\n\n${parsedUrl}`;
    error = true;
  }
  console.log(text);
  return {
    text: text,
    data: d,
    error: error,
    html: html
  };
}
