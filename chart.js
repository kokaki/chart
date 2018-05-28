/*
 *
 */
var http = require('http').createServer(handler);
var fs = require('fs');

http.listen(8080);

/*
 *
 */
function handler(req, res) {
  var data1 = csv2Array(__dirname + '/denpa-gardening/sensor_data/sensor_data.csv');
  var data2 = transposeArray(data1);
  var barChartData = getBarChartData(data2);
  var complexChartOption = getComplexChartOption(data2);

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

/*
 *  CSV形式のファイルから配列(Array)に変換する関数
 */
function csv2Array(fileName) {
  var dataArray = new Array();
  var data = fs.readFileSync(fileName, 'utf8');
  var LF = String.fromCharCode(10);
  var lines = data.split(LF);
  for (var i = 0; i < lines.length; ++i) {
    var cells = lines[i].split(',');
    if (cells.length != 1) {
      dataArray.push(cells);
    }
  }
  return dataArray;
}

/*
 *  配列(Array)の行列を入れ替える関数
 */
function transposeArray(array) {
  return Object.keys(array[0]).map(function (c) {
    return array.map(function (r) {
      return r[c];
    });
  });
}

/*
 *  Chartのデータを生成する関数
 */
function getBarChartData(data) {
  var barChartData = {
    labels: data[0],
    datasets: [{
        type: 'line',
        label: '気温',
        data: data[1],
        borderColor: 'rgba(254,97,132,0.8)',
        backgroundColor: 'rgba(230, 188, 196,0.5)',
        pointBackgroundColor: 'rgba(254,97,132,0.8)',
        yAxisID: 'y-axis-1',
      },
      {
        type: 'line',
        label: '湿度',
        data: data[2],
        borderColor: 'rgba(46, 173, 63,0.8)',
        backgroundColor: 'rgba(199, 240, 204,0.5)',
        pointBackgroundColor: 'rgba(46, 173, 63,0.8)',
        yAxisID: 'y-axis-2',
      },
      {
        type: 'line',
        label: '気圧',
        data: data[3],
        borderColor: 'rgba(54,164,235,0.8)',
        backgroundColor: 'rgba(183, 217, 235,0.5)',
        pointBackgroundColor: 'rgba(54,164,235,0.8)',
        yAxisID: 'y-axis-3',
      },
    ],
  };
  return barChartData;
}

/*
 *  Chartの表示オプションを生成する関数
 */
function getComplexChartOption(data) {
  var complexChartOption = {
    responsive: true,
    scales: {
      yAxes: [{
          id: 'y-axis-1', // Y軸のID
          type: 'linear', // linear固定 
          position: 'left', // どちら側に表示される軸か？
          ticks: { // スケール
            max: 40.0,
            min: 20.0,
            stepSize: 5.0
          },
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          position: 'right',
          ticks: {
            max: 100.0,
            min: 20.0,
            stepSize: 10.0
          },
          gridLines: {
            drawOnChartArea: false,
          },
        },
        {
          id: 'y-axis-3',
          type: 'linear',
          position: 'right',
          ticks: {
            max: 1040.0,
            min: 950.0,
            stepSize: 5.0
          },
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
    }
  };
  return complexChartOption;
}