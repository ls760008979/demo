var roomVolChart = null; //电压曲线容器
var roomCurrentChart = null;//电流曲线容器
var roomPowerChart = null;//功率曲线容器
var roomWenuChart = null;//温度曲线容器
var roomYanwuChart = null;//烟雾曲线容器
var roomPm25Chart = null;//pm2.5曲线容器

//echarts通用设置项目
var option1 = {
    title: {
        text: '',
        textStyle: {
            color: "#333333"
        }
    },
    // grid: {
    //     show: false,
    //     bottom: 40,
    //     right: '10%',
    //     top: 50,
    // },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: [
            {
                name: '',
                icon: 'image://img/today_line.png',
                textStyle: {
                    color: '#03AFF8'
                }
            }]
    },

    xAxis: {
        type: 'time',
        boundaryGap: false,
        name: "",
        show: true,
        nameGap: 4,
        // data: xData,
        // x轴的颜色和宽度
        axisTick: {
            length: 5
        },
        axisLabel: {
            alignWithLabel: true,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "#333333",
                width: '1'
            }
        },
        // 控制网格线是否显示
        splitLine: {
            show: true,
            //  改变轴线颜色
            lineStyle: {
                // 使用深浅的间隔色
                color: ['#f3f4f5'],
                width: 1

            }
        },


    },
    yAxis: [
        {
            min: 'dataMin',
            max: 'dataMax',
            type: 'value',
            name: '',
            nameTextStyle: {
                color: nameTextColor
            },
            position: 'left',
            // x轴的颜色和宽度
            axisLine: {
                show: true,
                lineStyle: {
                    color: axisColor,
                    width: axisWidth
                }
            },
            // 控制网格线是否显示
            splitLine: {
                show: false,
                //  改变轴线颜色
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['#f75617']
                }
            }

        }
    ],
    series: [
        {
            // name: '电压曲线',
            type: 'line',
            data: [],
            showSymbol: false,
            areaStyle: {
                normal: {
                    color: lineFillColorConfig
                }
            },
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: '#03AFF8'
                    }
                }
            }
        }
    ]
};

//初始化房间历史曲线div
function initRoomHisChart() {
    if (roomVolChart == null) {
        roomVolChart = echarts.init(document.getElementById('roomVolChart'));
        roomCurrentChart = echarts.init(document.getElementById('roomCurrentChart'));
        roomPowerChart = echarts.init(document.getElementById('roomPowerChart'));
        roomWenuChart = echarts.init(document.getElementById('roomWenuChart'));
        roomYanwuChart = echarts.init(document.getElementById('roomYanwuChart'));
        roomPm25Chart = echarts.init(document.getElementById('roomPm25Chart'));
    }
    //先清空
    setdata([], roomWenuChart, '温度','(℃)');
    setdata([], roomYanwuChart, '烟雾','(等级)');
    setdata([], roomPm25Chart, 'PM2.5','(ug/m³)');
    setdata([], roomVolChart, '电压','(V)');
    setdata([], roomCurrentChart, '电流','(A)');
    setdata([], roomPowerChart, '功率','(KW)');
    isChartInit = true;
    // roomCharts = [roomVolChart, roomCurrentChart, roomPowerChart, roomWenuChart, roomYanwuChart, roomPm25Chart]
}

var isChartInit = false;//echats容器是否初始化
function getRoomHisChart(house_id) {
    if (!isChartInit) {
        $('#myModal').on('shown.bs.modal', function (e) {
            initRoomHisChart();
        });
    }
    $("#loading").show();
    var startTime = $("#start").val();
    var endTime = $("#end").val();
    isLoading = true;
    $.ajax({
        url: baseurl + '/api/v1/getCuv',
        type: 'GET',
        data: {
            'house_id': house_id,
            'startTime': startTime,
            'endTime': endTime
        },
        dataType: "json",
        success: function (json) {
            isLoading = false;
            $("#loading").hide();
            setdata(json.data.wendu, roomWenuChart, '温度','(℃)');
            setdata(json.data.yanwu, roomYanwuChart, '烟雾','(等级)');
            setdata(json.data.pm25, roomPm25Chart, 'PM2.5','(ug/m³)');
            setdata(json.data.voltage, roomVolChart, '电压','(V)');
            setdata(json.data.current, roomCurrentChart, '电流','(A)');
            setdata(json.data.power, roomPowerChart, '功率','(KW)');
        }
    });

}

//设置echarts 参数
function setdata(json, chart, name,unit) {
    var yAxisData = [];
    for (var i = 0; i < json.length; i++) {
        // var date = new Date(json.data.rukou[i].updated_at);
        yAxisData.push({
            name: json[i].GetTime,
            value: [json[i].GetTime, json[i].value],
            textStyle: {
                color: "#333333"
            }
        });

    }
    option1.legend.data[0].name = name;
    option1.title.text = name;

    option1.yAxis[0].name = name+unit;
    option1.xAxis.name = "时间";
    option1.series[0].data = yAxisData;
    option1.series[0].name = name+unit;
    chart.setOption(option1)
}


//给日期框赋初始值
var d = new Date();
var t = formatDate(d);
$("#start").val(t);
$("#end").val(t);


//格式化时间 2018-05-01
function formatDate(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    // return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
    if (month.toString().length < 2) {
        month = "0" + month.toString()
    }
    if (date.toString().length < 2) {
        date = "0" + date.toString()
    }

    return year + "-" + month + "-" + date;
}


//查询房间历史
function queryRoomHis() {
    if(isLoading){//如果当前正在加载则直接返回
        return false;
    }
    var startTime = $("#start ").val();
    var endTime = $("#end").val();
    if (startTime > endTime) {
        alert("起始时间必须小于结束时间");
        return;
    }
    //先清空
    setdata([], roomWenuChart, '温度(ug/m³)');
    setdata([], roomYanwuChart, '烟雾(ug/m³)');
    setdata([], roomPm25Chart, 'PM2.5(ug/m³)');
    setdata([], roomVolChart, '电压(V)');
    setdata([], roomCurrentChart, '电流(A)');
    setdata([], roomPowerChart, '功率(KW)');
    getRoomHisChart(currnet_house_id);
}


var currnet_house_id = "";//当前选择查看的房间id
var isLoading =false;//是否正在加载历史数据
//打开模态框
function openRoomChart(d) {
    currnet_house_id = d.house_id;
    $(".modal-title").html(d.house_number+"房间环境、能耗历史记录");
    $('#myModal').modal('show');
    getRoomHisChart(d.house_id)// 初始化后立即调用 show 方法
}