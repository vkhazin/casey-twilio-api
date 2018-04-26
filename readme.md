# Casey Twilio Api

## Overview

* Part of a hackathon for Casey House
* Build a secure end-point to send notifications through Twilio API
* Deploy to two PaaS providers to demo interoperability: Pivotal Cloud Foundry and Heroku

## Deployment

* Use any PaaS to deploy the end-point
* Make sure to populate environment variable named `config` with the content of *updated* ./config/config-template.json

## Sample Request
```
curl -X POST \
  https://vk-casey.herokuapp.com/appointmentNotification \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: 80af8618-2a5b-43ea-a93b-270a9d18bf5c' \
  -d '{
	"recipientPhone": "4168022771",
	"recipientName": "Bob",
	"appointmentDatetime": "2018-04-26T00:13:48+00:00"
}'
```

## Sample Response
```
{
    "sid": "FNa540d2cd8a47f8d76bca325c5df49c9c"
}
```