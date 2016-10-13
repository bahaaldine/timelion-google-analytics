Copy the last installation url for your version of Kibana from [the repository releases](https://github.com/bahaaldine/timelion-google-analytics/releases/latest). The file follows the naming `timelion-google-analytics-major.minor.patch.zip` where the version indicated it's the one in Kibana.

Remember that starting from Kibana 5.0 you always need an update version of every plugin for it to start as indicated [here](https://siren.solutions/in-kibana-5-all-your-plugins-will-break-at-each-and-every-update/).

TGA does not support Kibana version lower than 5.x. The TGA version you will use, should be the same than the Kibana version, you just need to adapt the following command:

```sh
#Kibana >= 5.x

./bin/kibana-plugin install  https://github.com/bahaaldine/timelion-google-analytics/releases/download/version_name/timelion-google-major.minor.patch.zip

```