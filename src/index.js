const fetch = require('node-fetch');
const base64 = require('base-64');

class JoanAPI {
  constructor() {
    this.credentials = { 
      expires_in: 36000,
      token_type: 'Bearer',
      scope: 'read write'
    };
    this.expiry = new Date();
  }

  static configure({clientId, secret}){
    JoanAPI.prototype.clientId = clientId;
    JoanAPI.prototype.secret = secret;
  }

  static getToken(){
    if (this.clientId === null || this.secret === null) throw new Error("Have not configured api credentials.")

    return new Promise((resolve, reject) => {
      fetch("https://portal.getjoan.com/api/token/", {
        body: "grant_type=client_credentials",
        headers: {
          "Authorization": `Basic ${base64.encode(`${this.clientId}:${this.secret}`)}`,
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

  async initialize() {
    if (!!this.credentials.access_token || this.expiry < new Date()) {
      await this.getToken();
    }
  }

  // GET Endpoints here
  static async me(){
    return this.getReq('me')
  }

  static async users(){
    return this.getReq('users')
  }

  static async events(){
    return this.getReq('events')
  }

  static async rooms(){
    return this.getReq('rooms')
  }

  static async devices(){
    return this.getReq('devices')
  }

  // POST With a body
  static async book(data){
    await this.initialize();

    return new Promise((resolve, reject) => {
      fetch("https://portal.getjoan.com/api/v1.0/events/book/", {
        body: JSON.stringify(data),
        headers: {
          Accept: "*/*",
          "Authorization": `Bearer ${this.credentials.access_token}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
        method: "POST"
      })
      .then((res) => {
        if (res.ok) { return res; } 
        else { reject(res.statusText); }
      })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err))
    })
  }

  async getReq(endpoint = 'me') {
    await this.initialize();

    return new Promise((resolve, reject) => {
      fetch(`https://portal.getjoan.com/api/v1.0/${endpoint}`, {
        headers: { "Authorization": `Bearer ${this.credentials.access_token}`},
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
