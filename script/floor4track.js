// var dom = document.getElementById("track4");
// var myChart2 = echarts.init(dom);
var track1Color = "#45448f";
var track2Color = "#b960ce";
var trackSpeed = 80;
var track41 = [
    {
        name: "test",
        coords: [
            [64, 405],  // 起点
            [215, 405],


            [245, 395],
            [270, 380],
            [280, 370],
            [310, 306],


            [300, 248],
            [286, 230],
            [256, 190],
            [192, 162],

            [1065, 162],
            [1065, 18],
            [1152, 18],


        ],

        lineStyle: {
            normal: {
                color: "#006d6a"
            }
        }
    }

];
var track42 = [
    {
        name: "test",
        coords: [


            [1152, 18],

            [1065, 18],
            [1065, 162],
            [192, 162],
            [256, 190],
            [286, 230],
            [300, 248],
            [310, 306],
            [280, 370],
            [270, 380],
            [245, 395],
            [215, 405],
            [64, 405],  // 起点

        ],

        lineStyle: {
            normal: {
                color: "#006d6a"
            }
        }
    }
];
var track3 = [
    {
        name: "test",
        coords: [
            [0, 480],  // 起点
            [200, 480],
            [200, 280],
            [865, 280],
            [865, 390],
            [1500, 390],
        ],

        lineStyle: {
            normal: {
                color: "#006d6a"
            }
        }
    }
];
var track4 = [
    {
        name: "test",
        coords: [
            [200, 680],  // 起点
            [200, 480],
            [200, 280],
            [865, 280],
            [865, 390],
            [1500, 390],
        ],

        lineStyle: {
            normal: {
                color: "#006d6a"
            }
        }
    }
];
var track5 = [
    {
        name: "test",
        coords: [
            [530, 0],  // 起点
            [530, 280],
            [0, 280],
        ],

        lineStyle: {
            normal: {
                color: "#006d6a"
            }
        }
    }
];

var xAxisData = [];
var yAxisData = [];
for (var i = 0; i <= 1309; i++) {
    xAxisData.push(i);
}
for (var i = 0; i <= 693; i++) {
    yAxisData.push(i);
}
var option4 = {
    backgroundColor: 'rgba(255,255,255,0)',
    title: {
        show: false,
        text: '',
        subtext: '',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        show: false,
        trigger: 'item'
    },
    xAxis: {

        max: 1309,
        min: 0,
        show: false,
        data: xAxisData,
        axisLine: {
            show: false,
            lineStyle: {
                color: "#ffffff",
                width: '3'
            }
        },
    },
    yAxis: {
        max: 693,
        min: 0,
        show: false,
        data: yAxisData,
        axisLine: {
            show: false,
            lineStyle: {
                color: "#ffffff",
                width: '3'
            }
        },
    },
    legend: {
        show: false,
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data: [''],
        textStyle: {
            color: '#fff'
        }
    },
    grid: {
        left: '2%',
        top: '0',
        right: '0%',
        bottom: '50',
    },

    series: [
        {
            type: 'lines',
            animation: false,
            coordinateSystem: 'cartesian2d',
            polyline: true,
            data: track41,
            lineStyle: {
                // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
                width: 0
            },
            effect: {
                constantSpeed: trackSpeed,
                show: true,
                trailLength: 0.5,
                symbolSize: 4,
                color: track1Color
            },
            zlevel: 1
        },
        {
            type: 'lines',
            animation: false,

            coordinateSystem: 'cartesian2d',
            polyline: true,
            data: track42,
            lineStyle: {
                // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
                width: 0
            },
            effect: {
                constantSpeed: trackSpeed,
                show: true,
                trailLength: 0.5,
                symbolSize: 4,
                color: track2Color
            },
            zlevel: 1
        }, {
            type: 'lines',
            animation: false,
            coordinateSystem: 'cartesian2d',
            polyline: true,
            data: track41,
            lineStyle: {
                // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
                width: 0
            },
            effect: {
                constantSpeed: 90,
                show: true,
                trailLength: 0.5,
                symbolSize: 4,
                color: track1Color
            },
            zlevel: 1
        },
        {
            type: 'lines',
            animation: false,

            coordinateSystem: 'cartesian2d',
            polyline: true,
            data: track42,
            lineStyle: {
                // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
                width: 0
            },
            effect: {
                constantSpeed: 100,
                show: true,
                trailLength: 0.5,
                symbolSize: 4,
                color: track2Color
            },
            zlevel: 1
        },
        {
            type: 'lines',
            animation: false,

            coordinateSystem: 'cartesian2d',
            polyline: true,
            data: track42,
            lineStyle: {
                // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
                width: 0
            },
            effect: {
                constantSpeed: 40,
                show: true,
                trailLength: 0.5,
                symbolSize: 4,
                color: track2Color
            },
            zlevel: 1
        },


    ]
};
