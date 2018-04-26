const promise = require('bluebird');

exports.create = function (config, logger) {

  function NotAuthenticated(message) {
    this.message = message;
    this.name = 'NotAuthenticated';
    Error.captureStackTrace(this, NotAuthenticated);
  }

  NotAuthenticated.prototype = Object.create(Error.prototype);
  NotAuthenticated.prototype.constructor = NotAuthenticated;

  const authenticate = (apiKey) => {
    
    console.log('apiKey: ' + apiKey);
    console.log('apiKeys: ' + JSON.stringify(config.acl.apiKeys));
    
    const filteredKeys = config.acl.apiKeys.filter(x => (x === apiKey) && (apiKey));
    
    if (filteredKeys.length == 0) {
      return promise.reject(new NotAuthenticated({error: 'ApiKey invalid or is missing'}));
    }
    return promise.resolve({ apiKey: apiKey});
  };

  return (function () {
    return {
      authenticate: authenticate,
      NotAuthenticated: NotAuthenticated
    };
  }());
};