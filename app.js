'use strict';
const server                = (require('express'))();
const bodyParser            = require('body-parser');
const packageJson           = require('./package.json');
const config                = process.env.config? 
                              JSON.parse(process.env.config):
                              require('./config/local-testing.json');
const logger                = require('./logger').create(config);
const auth                  = require('./auth').create(config, logger);
const twilioAPI             = require('./twilioAPI').create(config, logger);

server.use(bodyParser.json());

server.post("/appointmentNotification", (req, res, next) => {
  logger.info(req);
  const apiKey = req.header(config.acl.authCHeader);
  auth.authenticate(apiKey)
    .then(authResponse => { 
      twilioAPI.sendAppointmentNotification(req.body.recipientPhone, req.body.recipientName, req.body.appointmentDateTime)
        .then(response => {
          res.send(response);
        })
    })
    .catch(auth.NotAuthenticated, err => {
      logger.info(err);
      res.status(401).send(err.message.error);
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send({
        message: err.toString()
      });
    })  
});

/*
    .catch(auth.NotAuthenticated, err => {
      return respond(401, err, path, apiKey, callback);
    })
    .catch(auth.NotAuthorized, err => {
      return respond(403, err, path, apiKey, callback);
    })
    .catch(err => {     
      return respond(500, err, path, apiKey, callback);
    });
*/

server.get("/", (req, res, next) => {
  res.send({
    name: packageJson.name,
    author: packageJson.author,
    version: packageJson.version,
    nodeVersion: process.version
  });
});
  
server.listen(process.env.PORT || 8080);