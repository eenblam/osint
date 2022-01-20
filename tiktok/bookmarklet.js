// Alert with creation time of currently viewed channel
// Shows Unix timestamp as well as (local) datetime.
javascript:
let d = window['SIGI_STATE'].UserModule.users;
let user = d[Object.keys(d)[0]];
let ts = user.createTime;
alert(ts+'\n'+new Date(parseInt(ts*1000)));
