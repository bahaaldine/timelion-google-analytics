# Timelion Google Analytics

...

### Installation

... 

```sh
#Kibana >= 5.x

./bin/kibana-plugin install  https://github.com/bahaaldine/timelion-google-analytics/releases/download/version_name/mathlion-major.minor.patch.zip

#Kibana <= 4.x
./bin/kibana --install mathlion -u https://github.com/fermiumlabs/mathlion/releases/download/version_name/mathlion-major.minor.patch.zip
```

### Examples

```js
.es(*).math("a=source")  //the variable "a" now contains the elasticsearch query.
.nop().math("a")  //this row now equals the former elasticsearch query

.es(*).math("source") //return the .es(*) query
.es(*).math("source+5") // add 5 to the .es(*) query

.nop().math("a=a+2 ; a=a+3 ")  //adds 5 to a
.nop().math("a=a+2 ; a=a+3 ; a ")  //adds 5 to a and displays a+5

.es(*).math("a=source")  //this query is invisible and does not generate an axis
.es(*).math("a=source; a")  //this query does

.nop.math("sqrt(3^2 + 4^2)") //returns 5

//Calculate power comsumption based on measured current and stimated voltage (in Europe)
.nop().math("electricPower(v,i)=(v*i)")
.es(metric=avg:current).math(machineCurrent=source)
.nop().math("elascPower(230,machineCurrent)")

//plot the horizontal statistical mean and variance
.es(*).math("me=mean(source); va=var(source)")
.value(1).math(me*source) 
.value(1).math("(me+sqrt(va))*source") 
.value(1).math("(me-sqrt(va))*source")

```

## Supported Kibana versions

This plugin is supported by:

* Kibana 5 beta 1
* Kibana 4.x (check out branch [backport-4](https://github.com/fermiumlabs/mathlion/tree/backport-4))

We regularly test only for Kibana 5. If you find bugs on Kibana 4 you can open a issue, but we would prefer a pull request.

## Features:

* Full-featured math in Timelion
* Variables and custom functions
* Physical constants
* Units of measurement

For upcoming features and TODOs check [here](https://github.com/fermiumlabs/mathlion/projects).
