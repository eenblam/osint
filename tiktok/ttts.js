// ttts.js - TikTok Time Stamp fetcher
//
// Attempts to copy timestamp of current video to clipboard.
// Dumps extra info to browser console.
// Alerts if you haven't clicked a video.
// Alerts if you need to refresh, and provides you with a URL you can paste instead.
javascript:
var parsedUrl = new URL(window.location.href);
var params = parsedUrl.searchParams;
var id;
if (parsedUrl.pathname.includes('/video/')) {
  let pathParts = parsedUrl.pathname.split('/');
  id = pathParts[pathParts.length - 1];
} else if (params.has("item_id")) {
  id = params.get("item_id");
} else {
  alert ("Sorry, not sure which video you want.");
  throw new Error("Sorry, not sure which video you want.");
}

var d = window['SIGI_STATE'];
if (id in d.ItemModule) {
  item = d.ItemModule[id];
  let createTime = item.createTime;
  let createDate = new Date(createTime * 1000);

  let author = item.author;
  if (author in d.UserModule.users) {
    var authorCreateTime = d.UserModule.users[author].createTime;
    var authorCreateDate = new Date(authorCreateTime * 1000);
  }

  let data = {
    author: author,
    authorId: item.authorId,
    authorCreateTime: authorCreateTime,
    authorCreateDate: authorCreateDate,
    createDate: createDate,
    createTime: createTime,
    createDate: createDate,
    id: id,
    url: item.video.downloadAddr
  };
  console.log(data);
  navigator.clipboard.writeText(createTime);
} else {
  let url = `https://www.tiktok.com/foryou?item_id=${id}`;
  alert(`Timestamp for video ${id} not available on page.\nRefresh page or visit the URL in your clipboard, then retry.`);
  navigator.clipboard.writeText(url);
}
