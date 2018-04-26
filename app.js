'use strict';
const server                = (require('express'))();
const bodyParser            = require('body-parser');
const packageJson           = require('./package.json');

server.use(bodyParser.json());

const config                = process.env.config? 
                              JSON.parse(process.env.config):
                              require('./config/local-testing.json');
                              
const logger                = require('./logger').create(config);
const twilioAPI             = require('./twilioAPI').create(config, logger);

server.post("/appointmentNotification", (req, res, next) => {
  logger.info(req); 
  twilioAPI.sendAppointmentNotification(req.body.recipientPhone, req.body.recipientName, req.body.appointmentDateTime)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send({
        message: err.toString()
      });
    })  
});

server.get("/", (req, res, next) => {
  res.send({
    name: packageJson.name,
    author: packageJson.author,
    version: packageJson.version,
    nodeVersion: process.version
  });
});
  
server.listen(process.env.PORT || 8080);