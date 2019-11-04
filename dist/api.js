'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fetch = require('node-fetch');
var base64 = require('base-64');

var JoanAPI = function () {
  function JoanAPI(_ref) {
    var clientId = _ref.clientId,
        secret = _ref.secret;

    _classCallCheck(this, JoanAPI);

    this.clientId = clientId;
    this.secret = secret;
    this.credentials = {
      access_token: '',
      expires_in: 36000,
      token_type: 'Bearer',
      scope: 'read write'
    };
    this.expiry = new Date();
  }

  _createClass(JoanAPI, [{
    key: 'getToken',
    value: function getToken() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        fetch("https://portal.getjoan.com/api/token/", {
          body: "grant_type=client_credentials",
          headers: {
            "Authorization": 'Basic ' + base64.encode(_this.clientId + ':' + _this.secret),
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST"
        }).then(function (res) {
          if (res.ok) {
            return res;
          } else {
            reject(res.statusText);
          }
        }).then(function (res) {
          return res.json();
        }).then(function (json) {
          _this.credentials = json;

          var dt = new Date();
          dt.setSeconds(dt.getSeconds() + json.expires_in);
          _this.expiry = dt;
          resolve(true);
        });
      });
    }
  }, {
    key: 'initialize',
    value: async function initialize() {
      if (this.credentials.access_token === '' || this.expiry < new Date()) {
        await this.getToken();
      }
    }

    // GET Endpoints here

  }, {
    key: 'me',
    value: async function me() {
      return this.getReq('me');
    }
  }, {
    key: 'users',
    value: async function users() {
      return this.getReq('users');
    }
  }, {
    key: 'events',
    value: async function events() {
      return this.getReq('events');
    }
  }, {
    key: 'rooms',
    value: async function rooms() {
      return this.getReq('rooms');
    }
  }, {
    key: 'devices',
    value: async function devices() {
      return this.getReq('devices');
    }

    // POST With a body

  }, {
    key: 'book',
    value: async function book(data) {
      var _this2 = this;

      await this.initialize();

      return new Promise(function (resolve, reject) {
        fetch("https://portal.getjoan.com/api/v1.0/events/book/", {
          body: JSON.stringify(data),
          headers: {
            Accept: "*/*",
            "Authorization": 'Bearer ' + _this2.credentials.access_token,
            "Cache-Control": "no-cache",
            "Content-Type": "application/json"
          },
          method: "POST"
        }).then(function (res) {
          if (res.ok) {
            return res;
          } else {
            reject(res.statusText);
          }
        }).then(function (res) {
          return res.json();
        }).then(function (json) {
          return resolve(json);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: 'getReq',
    value: async function getReq() {
      var _this3 = this;

      var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'me';

      await this.initialize();

      return new Promise(function (resolve, reject) {
        fetch('https://portal.getjoan.com/api/v1.0/' + endpoint, {
          headers: { "Authorization": 'Bearer ' + _this3.credentials.access_token },
          method: 'GET'
        }).then(function (res) {
          if (res.ok) {
            return res;
          } else {
            console.log('not ok');reject(res.statusText);
          }
        }).then(function (res) {
          return res.json();
        }).then(function (json) {
          return resolve(json);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: 'postReq',
    value: async function postReq() {
      var _this4 = this;

      var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'book';
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      await this.initialize();

      return new Promise(function (resolve, reject) {
        fetch('https://portal.getjoan.com/api/v1.0/' + endpoint, {
          headers: { "Authorization": 'Bearer ' + _this4.credentials.access_token },
          body: JSON.stringify(body),
          method: "OPTIONS"
        }).then(function (res) {
          if (res.ok) {
            return res;
          } else {
            reject(res.statusText);
          }
        })
        // .then(res => {console.log(res); return res})
        // .then(resp => resolve(resp))
        .then(function (res) {
          return res.json();
        }).then(function (json) {
          return resolve(json);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }]);

  return JoanAPI;
}();

exports.default = JoanAPI;