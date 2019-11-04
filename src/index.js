import JoanAPI from './api';

let api = new JoanAPI({
  clientId: 'nAMB0hhgsfuJGMKvPrkbFtm2F7ViCqJffgeWRG81', 
  secret: 'l152CQ4STA01vLGETufkyWPqEyUnD0su2foOnT9DXWWllwhAFn5bf60D2AnMJpNh8Ip70HF3oZKlxHA4APjPgbQAUh9wR2ywjX3It32XtiCKAP5PSAUoAkZtR32uL8AB'
})

// api.me().then(res => console.log('me\n', res))
// api.events().then(res => console.log('events\n', res))


api.book({
  source: "njit.edu_72e2q5dcbqg67t55k2ofli36r4@group.calendar.google.com",
  start: "2019-11-05T13:00:00-05:00",
  end: "2019-11-05T14:00:00-05:00",
}).then(res => {
  console.log('book', res)
  console.log('header', res.headers)
})
.catch(err => console.log('err', err));