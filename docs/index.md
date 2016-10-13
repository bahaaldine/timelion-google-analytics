# Timelion Google Analytics (TGA)

![alt TGA](https://raw.githubusercontent.com/bahaaldine/timelion-google-analytics/master/timelion-google-analytics.png)

TGA is a plugin that brings Google Analytics data to Timelion.
So far it support all the metrics available as part of the Google analytics 
API that can be found [here](https://developers.google.com/analytics/devguides/reporting/core/dimsmets)

However, it does not support all the dimensions available in the link above, the only used dimension is `ga:date`; this is just because Timelion works with data over time dimension.

## Google API project configuration

### Create project

Before using TGA, you need to create a Google API project on:
https://console.developers.google.com

### Configure access from the IAM console

Once created, because we need a server-server connection between 
Kibana nodejs server and Google API server, you have to create a service account key [here](https://console.developers.google.com/permissions/serviceaccounts). Note that you need to set a role that could access to Google analytics data, and also create a JSON private key

### Enable Analytics reporting API

Search for the Google Reporting Analytics API [here](https://console.developers.google.com/apis/library) and enable it for the newly created project.

### Add new email to list of Google analytics users:

In order to get data from the Google Analytic Reporting API, you need to add a user in the google analytics admin console [here](https://support.google.com/analytics/answer/1009702?hl=en#Add)

## Installation

TGA does not support Kibana version lower than 5.x. The TGA version you will use, should be the same than the Kibana version, you just need to adapt the following command:

```sh
#Kibana >= 5.x

./bin/kibana-plugin install  https://github.com/bahaaldine/timelion-google-analytics/releases/download/version_name/timelion-google-major.minor.patch.zip

```

Add the your service account JSON private key to the `timelion.json` file located in `kibana_home/src/core_plugins/timelion` as follow:

```json
...
"google": {
    "service_account": {
      "type": "service_account",
      "project_id": " ... PROJECT ID ... ",
      "private_key_id": " ... PRIVATE ID ... ",
      "private_key": " ... PRIVATE KEY ... ",
      "client_email": " ... CLIENT EMAIL ... ",
      "client_id": " ... CLIENT ID ... ",
      "auth_uri": " ... AUTH URI ... ",
      "token_uri": " ... TOKEN URI ...  ",
      "auth_provider_x509_cert_url": " ... AUTH PROVIDER X509 CERT URL ... ",
      "client_x509_cert_url": " ... CLIENT X509 CERT URL ...  "
    }
  }
...
```
Note that I've created a Google object that conains a service_account object which content is the actual JSON private key.

## Examples

TGA provides a `ganalytics` Timelion Datasource object that take the following arguments:

- *viewId*: Google analytics view identifier
- *metrics* (optional): A list of comma separated analytics metrics to display. If not set, by default the following list of metric will be displayed users, sessions, pageviews, pageviewsPerSession, sessionDuration, bounces, percentNewSessions.

```js

.ganalytics(viewId="88407851") // display the default list of metrics
.ganalytics(viewId="88407851", metrics="ga:users,ga:bounces") // display users traffic and bounces stats

```

## Supported Kibana versions

This plugin is supported by:

* Kibana 5 beta 1

## Features:

* Full-featured google analytics reporting api in Timelion
* google analytics metrics 
* multiple anlaytics at once 
