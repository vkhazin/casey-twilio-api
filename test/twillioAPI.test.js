'use strict';
const assert          = require('assert');
const config          = require('../config/local-testing.json');
const logger          = require('../logger').create(config);
const twilioAPI       = require('../twilioAPI').create(config, logger);
const toPhoneNumber   = '4168022771' //'4168092126';
const toName          = 'Vlad Khazin';
const appDateTime     = '2019-01-01T13:01:01−05:00';

describe('twilioAPI', function () {

  it('sendMessage', function (done) {
    
    twilioAPI.sendAppointmentNotification(toPhoneNumber, toName, appDateTime)
    .then(response => {
//       console.log(response);
      assert.notEqual(response.sid, null, 'Sid should not be empty')
    })
    .done(done);
  });

});