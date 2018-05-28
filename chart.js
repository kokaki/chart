/*
 *  CSV形式のファイルから配列(Array)に変換する関数
 */
exports.csv2Array = function (data) {
    var result = new Array();
    var LF = String.fromCharCode(10);
    var lines = data.split(LF);
    for (var i = 0; i < lines.length; ++i) {
        var cells = lines[i].split(',');
        if (cells.length != 1) {
            result.push(cells);
        }
    }
    return result;
}

/*
 *  配列(Array)の行列を入れ替える関数
 */
exports.transposeArray = function (data) {
    return Object.keys(data[0]).map(function (c) {
        return data.map(function (r) {
            return r[c];
        });
    });
}

/*
 *  Chartのデータを生成する関数
 */
exports.getBarChartData = function (data) {
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
exports.getComplexChartOption = function (data) {
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