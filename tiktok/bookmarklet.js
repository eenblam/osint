// Click video for details. Click basically anywhere in the frame containing the post.
// The only obvious way (to me) to cross-reference a recommend-list-item-container
// with an entry in ItemModules seems to be using the music ID and author to cross-reference.
// Probably falls apart if you you have multiple posts from the same author with the same music
// on one page. (Or, only grabs the first matching video per the order in ItemModules)
javascript:
document.addEventListener('click', getVideoData);
function getVideoData(event) {
  let els = document.elementsFromPoint(event.clientX, event.clientY);
  let post = els[0].closest(`div[data-e2e="recommend-list-item-container"]`);

  let author = post.querySelector(`a[data-e2e="video-author-avatar"]`).href;
  let music = post.querySelector(`h4[data-e2e="video-music"] > a`).href;
  let _ms = music.split('-');
  let music_id = _ms[_ms.length - 1];

  d = window['SIGI_STATE'];
  let _post_kv = Object.entries(d.ItemModule).filter(
    ([k,v]) => v.author === author.split('@')[1] && v.music.id === music_id
  )[0];
  let post_id = _post_kv[0];
  let post_data = _post_kv[1];

  let uploadTimestamp = parseInt(post_data.createTime) * 1000;
  let uploadDate = new Date(uploadTimestamp);
  let videoURL = post_data.video.downloadAddr;

  let data = {
    author: author,
    uploadTimestamp: uploadTimestamp,
    uploadDate: uploadDate,
    videoURL: videoURL
  };
  navigator.clipboard.writeText(uploadTimestamp);
  console.log(data);
}
