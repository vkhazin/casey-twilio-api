'use strict';
const promise           = require('bluebird');
const twilioClient      = require('twilio');

      
exports.create = function (config, logger) {

  const twilioClient = require('twilio')(config.twilio.username, config.twilio.password);
  
  const sendAppointmentNotification = (toPhoneNumber, toName, appDateTime) => {
    return twilioClient.studio.flows(config.twilio.appointmentFlowId)
      .engagements.create({ 
        to: toPhoneNumber, 
        from: config.twilio.fromPhoneNumber, 
        parameters: JSON.stringify({
          name: toName,
          appointment_time: appDateTime
        })
      })
      .then(twilioResponse => {
        if (twilioResponse.errorCode) {
          return promise.reject({
            errorCode: twilioResponse.errorCode,
            errorMessage: twilioResponse.errorMessage
          });
        } else {
          return promise.resolve({
            sid: twilioResponse.sid
          });
        }
      })
      .catch(err => {
        logger.error(JSON.stringify(err));
        return promise.reject(err);
      })
  };
  
  return (function () {
    return {
      sendAppointmentNotification: sendAppointmentNotification
    };
  }());
};