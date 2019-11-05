# JoanAPI

This is a light weight api for getjoan.com

### Installing 

```sh
$ yarn add joanapi
```
or
```sh
$ npm install joanapi
```

### Example

```js
import JoanAPI from 'joanapi';

// Put this as close to the entrypoint as you can.
JoanAPI.configure({
  clientId: 'client_id_here', 
  secret: 'secret_id_here'
})

JoanAPI.book({
  source: "conf_room_one.calendar.google.com",
  start: "2019-11-05T13:00:00-05:00",
  end: "2019-11-05T14:00:00-05:00",
})
.then(res => {
  console.log('book', res)
  console.log('header', res.headers)
})
.catch(err => console.log('err', err));
```

### Endpoints built:
- me
- users
- events
- rooms
- devices
- book

See: https://portal.getjoan.com/api/docs/ for more info.
### API
All endpoints return a promise.
### Built With
- node-fetch
- base-64
### Contributors
I'm looking to add new contributors/maintainers to help out. So if you like this repo and want to help make it better let me know.
### ToDos
- Write tests
- More endpoints
