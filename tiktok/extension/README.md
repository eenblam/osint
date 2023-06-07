# TikTok Unlocked
This is a simple Chrome extension for extracting metadata from a Tiktok video page
for [social media verification research](https://www.bellingcat.com/resources/2021/11/01/a-beginners-guide-to-social-media-verification/).

One of the original features was getting the creation date of the account that posted the video, which is unfortunately no longer viable.
While TikTok still publishes this field, the value is now consistently zero, which causes it to look like the time of the [Unix epoch](https://en.wikipedia.org/wiki/Unix_time).

To install, you'll need to load this directory as an unpacked extension.
Here are [the docs](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#:~:text=To%20load%20an%20unpacked%20extension,the%20bottom%20of%20the%20menu.) on that.

Some notes:

* I need to replace the logo eventually. Maybe. Who knows?
* This *probably* works on Firefox without many changes, but I haven't tested it yet. However, `bookmarklet.js` in the parent directory should provide the same functionality in Firefox.
* I don't really do much front-end, so if I'm doing something funky here or could be using the related async APIs better, please feel free to open an issue and make suggestions. I'm always happy to learn! :)
