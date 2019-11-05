const fetch = require('node-fetch');
const base64 = require('base-64');

class JoanAPI {
  static configure({clientId, secret}){
    JoanAPI.prototype.clientId = clientId;
    JoanAPI.prototype.secret = secret;
  }

  static async getToken(){
    const {clientId, secret} = JoanAPI.prototype
    if (clientId === null || secret === null) throw new Error("Have not configured api credentials.")  

    return new Promise((resolve, reject) => {
      fetch("https://portal.getjoan.com/api/token/", {
        body: "grant_type=client_credentials",
        headers: {
          "Authorization": `Basic ${base64.encode(`${clientId}:${secret}`)}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      })
      .then((res) => {
        if (res.ok) { return res; }
        else { reject(res.statusText); }
      })
      .then(res => res.json())
      .then(json => {
        JoanAPI.prototype.credentials = json;
  
        let dt = new Date();
        dt.setSeconds( dt.getSeconds() + json.expires_in );
        JoanAPI.prototype.expiry = dt;
        resolve(true);
      })
    })
  }

  static async initialize() {
    const {credentials, expiry} = JoanAPI.prototype
    if (!credentials || !credentials.access_token || expiry < new Date()) {
      await JoanAPI.getToken();
    }
  }

  // GET Endpoints here
  static async me(){
    return JoanAPI.getReq('me')
  }

  static async users(){
    return JoanAPI.getReq('users')
  }

  static async events(){
    return JoanAPI.getReq('events')
  }

  static async rooms(){
    return JoanAPI.getReq('rooms')
  }

  static async devices(){
    return JoanAPI.getReq('devices')
  }

  // POST With a body
  static async book(data){
    await JoanAPI.initialize();
    const {access_token} = JoanAPI.prototype.credentials;

    return new Promise((resolve, reject) => {
      fetch("https://portal.getjoan.com/api/v1.0/events/book/", {
        body: JSON.stringify(data),
        headers: {
          Accept: "*/*",
          "Authorization": `Bearer ${access_token}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
        method: "POST"
      })
      .then((res) => {
        if (res.ok) return res;
        else reject(res.statusText);
      })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err))
    })
  }

  static async cancel(data){
    // {
    //   "event_id": "id",
    //   "timezone": "America/New_York",
    //   "room_id": "room address"
    // }
    await JoanAPI.initialize();
    const {access_token} = JoanAPI.prototype.credentials;

    return new Promise((resolve, reject) => {
      fetch("https://portal.getjoan.com/api/v1.0/events/cancel/", {
        body: JSON.stringify(data),
        headers: {
          Accept: "*/*",
          "Authorization": `Bearer ${access_token}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
        method: "POST"
      })
      .then((res) => {
        if (res.ok) return res;
        else reject(res.statusText);
      })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err))
    })
  }

  static async getReq(endpoint = 'me') {
    await JoanAPI.initialize();
    const {access_token} = JoanAPI.prototype.credentials;

    return new Promise((resolve, reject) => {
      fetch(`https://portal.getjoan.com/api/v1.0/${endpoint}`, {
        headers: { "Authorization": `Bearer ${access_token}`},
        method: 'GET'
      })
      .then((res) => {
        if (res.ok) { return res; } 
        else { console.log('not ok'); reject(res.statusText); }
      })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err))
    })
  }
}

export default JoanAPI;
