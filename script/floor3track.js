// var dom = document.getElementById("track3");
// var myChart2 = echarts.init(dom);
var track1Color = "#45448f";
var track2Color = "#b960ce";
var trackSpeed = 80;
var track31 = [
    {
        name: "test",
        coords: [
            [128, 414],  // 起点
            [240, 415],
            [320, 450],
            [330, 450],
            [340, 450],
            [350, 445],
            [360, 435],
            [370, 420],

            [350, 378],
            [340, 360],

            [288, 270],
            [265, 216],

            [350, 180],



            [470, 180],
            [1088, 180],
            [1088, 36],
            [1152, 36],




        ],

        lineStyle: {
            normal: {
                color: "#006d6a"
            }
        }
    }

];
var track32 = [
    {
        name: "test",
        coords: [




            [1152, 36],
            [1088, 36],
            [1088, 180],
            [470, 180],

            [350, 180],
            [265, 216],
            [288, 270],
            [340, 360],
            [350, 378],
            [370, 420],
            [360, 435],
            [350, 445],
            [340, 450],
            [330, 450],
            [320, 450],
            [240, 415],
            [128, 414],

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
var option3 = {
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
            show: true,
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
            show: true,
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
            data: track31,
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
            data: track32,
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
        },
 {
            type: 'lines',
            animation: false,

            coordinateSystem: 'cartesian2d',
            polyline: true,
            data: track31,
            lineStyle: {
                // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
                width: 0
            },
            effect: {
                constantSpeed: 60,
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
            data: track32,
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


    ]
};
