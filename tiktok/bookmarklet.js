// tiktok/bookmarklet.js - TikTok metadata fetcher
//
// Attempts to gather as much info about the current video and author
// as possible from the current page.
// Data is rendered as an alert, but also to the browser's javascript console.
// Alerts with an error if you haven't clicked a video.
// Alerts with an error if you need to refresh,
// and provides you with a URL you can copy and paste just in case.
// **This happens a lot.**
// If you just clicked on a new video, you'll probably need to refresh before the bookmarklet works.
//
// Sometime author createtime is 0. I'm not sure what that means yet.
// !!! Don't copy any lines in this file before "javascript:" !!!
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

  let text = `
Author: ${author}\n
Author ID: ${item.authorId}\n
Author Create Time: ${authorCreateTime}\n
Author Create Date: ${authorCreateDate}\n
Video Create Date: ${createDate}\n
Video Create Time: ${createTime}\n
Video ID: ${id}\n
Download URL:\n\n${item.video.downloadAddr}`;

  alert(text);
  let data = {
    author: author,
    authorId: item.authorId,
    authorCreateTime: authorCreateTime,
    authorCreateDate: authorCreateDate,
    createDate: createDate,
    createTime: createTime,
    id: id,
    url: item.video.downloadAddr
  };
  console.log(data);
} else {
  let url = `https://www.tiktok.com/foryou?item_id=${id}`;
  alert(`Timestamp for video ${id} not available on page.\nRefresh page or visit the URL below, then retry.\n\n${parsedUrl}`);
}