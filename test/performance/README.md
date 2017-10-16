# Performance Testing

The `profiles.jmx` [JMeter](http://jmeter.apache.org/) test will call the
Profiles application for a number of different surgeries.
Several parameters are exposed to customise the base test.


| Parameter    | Description                                                                                                     | Default                     |
| :------------| :-------------------------------------------------------------------------------------------------------------- | :-------------------------- |
| `hostname`   | URL of server to test                                                                                           | staging.beta.nhschoices.net |
| `protocol`   | Protocol required for request                                                                                   | https                       |
| `port`       | Port required for request                                                                                       | 443                         |
| `users`      | Simulated number of concurrent users                                                                            | 5                           |
| `rampup`     | Time in seconds to ramp up to total number of users                                                             | 20                          |
| `duration`   | Time in seconds to run test                                                                                     | 120                         |
| `throughput` | target throughput in samples per minute                                                                         | 120                         |
| `csvfile`    | CSV data file containing choicesIds, used to request a profile. Any file in `./test/performance/data/` is valid | ids_100.csv                 |

## Threshold

The `threshold` file specifies the maximum average response time.
The test will fail if the total average time exceeds the threshold. This is set to 500ms.

To enable use of the threshold file in TeamCity, `Performance Metrics Calculation` in `Build Features`
must have the `file` checkbox selected, and `threshold` entered into the text box within the `Get reference values from` section.
Unchecking the box will revert to using the build history to determine performance drops.

## Running Tests

The test can be loaded into JMeter and run from the GUI. However, this is only
recommended during test development and debugging. All other times the test
should be run via the JMeter CLI.

On a machine where the JMeter CLI is available run the following command (from
the project root directory) to start a test execution using the default values.
This will create a log file in the project root directory called
`profiles`:

`jmeter -n -t ./test/performance/profiles.jmx -l profiles.jtl`

In order to override any of the configurable parameters they need to be
supplied to the CLI in the following manner. The example below overrides all of
the available parameters.
Note: only parameters wishing to be overridden need to be supplied.

`jmeter -n -t ./<path-to-test>/<test-name>.jmx
-Jhostname=localhost -Jprotocol=http -Jport=3000 -Jusers=10 -Jrampup=10
-Jduration=500 -Jthroughput=60 Jcsvfile=search-terms.csv -l profiles.jtl`
