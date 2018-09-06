var dom = document.getElementById("track");
var track1Chart = echarts.init(dom);
var track1Color = "#006d6a";
var track2Color = "#1f8e94";
var trackSpeed = 80;
var track1 = [
    {
        name: "test",
        coords: [
            [0, 400],  // 起点
            [865, 400],
            [865, 400],
            [1500, 400],

        ],

        lineStyle: {
            normal: {
                color: "#006d6a"
            }
        }
    }

];
var track2 = [
    {
        name: "test",
        coords: [
            [1500, 400],
            [865, 400],
            [865, 400],
            [0, 400],  // 起点




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
            [0, 400],  // 起点
            [865, 400],
            [865, 400],
            [1500, 400],
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
            [1500, 400],
            [865, 400],
            [865, 400],
            [0, 400],  // 起点

        ],

        lineStyle: {
            normal: {
                color: "#006d6a"
            }
        }
    }
];var track5 = [
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


var option1 = {
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
        data: xAxisData
    },
    yAxis: {
        max: 693,
        min: 0,
        show: false,
        data: yAxisData
    },
    legend: {
        show: false,
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data: [''],
        textStyle: {
            color: '#fff'
        },
    },

    series: [
        {
            type: 'lines',
            animation: false,
            coordinateSystem: 'cartesian2d',
            polyline: true,
            data: track1,
            lineStyle: {
                // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
                width: 0
            },
            effect: {
                constantSpeed: 120,
                show: true,
                trailLength: 0.5,
                symbolSize: 4,
                color: "#ff5736"
            },
            zlevel: 1
        },

        {

            type: 'lines',
            animation: false,
            coordinateSystem: 'cartesian2d',
            polyline: true,
            data: track2,
            lineStyle: {
                // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
                width: 0
            },
            effect: {
                constantSpeed: 80,
                show: true,
                trailLength: 0.5,
                symbolSize: 4,
                color: "#fff8ca"
            },
            zlevel: 1
        },

        {
            type: 'lines',
            animation: false,
            coordinateSystem: 'cartesian2d',
            polyline: true,
            data: track3,
            lineStyle: {
                // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
                width: 0
            },
            effect: {
                constantSpeed: 60,
                show: true,
                trailLength: 0.5,
                symbolSize: 4,
                color: "#00ff2f"
            },
            zlevel: 1
        },

        {
            type: 'lines',
            animation: false,

            coordinateSystem: 'cartesian2d',
            polyline: true,
            data: track4,
            lineStyle: {
                // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
                width: 0
            },
            effect: {
                constantSpeed: 100,
                show: true,
                trailLength: 0.5,
                symbolSize: 4,
                color: "#ff24be"
            },
            zlevel: 1
        },

        {
            type: 'lines',
            animation: false,

            coordinateSystem: 'cartesian2d',
            polyline: true,
            data: track5,
            lineStyle: {
                // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
                width: 0
            },
            effect: {
                constantSpeed: 60,
                show: true,
                trailLength: 0.5,
                symbolSize: 4,
                color: "#ffdd24"
            },
            zlevel: 1
        }


    ]
};

function setTrack1Option(option1) {
    // track1Chart.clear();
    // track1Chart.setOption(option1);
}

