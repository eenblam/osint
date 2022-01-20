/* Activate bookmarklet, then click on an image to open it in Yandex's reverse image search.
 * Currently busted if image is obscured by another element with onClick.
 *
 * TODO: try to get element on click, then walk down tree to lowest img (or all images)
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/elementsFromPoint
 */
javascript:
function yandexify(event) {
  let img = event.target;
  let y = 'https://yandex.com/images/search?rpt=imageview&url=';
  window.open(y + img.src);
  img.removeEventListener('click', yandexify);
}
Array.from(document.querySelectorAll('img')).forEach(el => el.addEventListener('click', yandexify));

