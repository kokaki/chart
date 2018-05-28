/*
 *
 */
var http = require('http').createServer(handler);
var fs = require('fs');
var chart = require('./chart.js');

http.listen(8080);

/*
 *
 */
function handler(req, res) {
  var dataArray = new Array();
  var data = fs.readFileSync(__dirname + '/denpa-gardening/sensor_data/sensor_data.csv', 'utf8');
  var data1 = chart.csv2Array(data);
  var data2 = chart.transposeArray(data1);
  var barChartData = chart.getBarChartData(data2);
  var complexChartOption = chart.getComplexChartOption(data2);

  fs.readFile('chart.html', 'utf-8', function (err, data) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    var result = data.replace('__barChartData__', JSON.stringify(barChartData));
    result = result.replace('__complexChartOption__', JSON.stringify(complexChartOption));

    res.write(result);
    return res.end();
  });
}