TGA provides a `ganalytics` Timelion Datasource object that take the following arguments:

- *viewId*: Google analytics view identifier
- *metrics* (optional): A list of comma separated analytics metrics to display. If not set, by default the following list of metric will be displayed users, sessions, pageviews, pageviewsPerSession, sessionDuration, bounces, percentNewSessions.

```js

.ganalytics(viewId="88407851") // display the default list of metrics
.ganalytics(viewId="88407851", metrics="ga:users,ga:bounces") // display users traffic and bounces stats

```