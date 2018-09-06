var left_content = null;
var bottom_content = null;

$(function () {
    left_content = new Vue({
        el: "#left-content",
        data: {
            devices: [1, 1, 1, 1, 1, 1]
        }
    });
    bottom_content = new Vue({
        el: "#bottom-content",
        data: {
            devices: [{sub_list: [1, 1, 1, 1, 1, 1]}, {sub_list: [1, 1, 1, 1, 1, 1]}, {sub_list: [1, 1, 1, 1, 1, 1]}]

        },

    });


    getLeftData();
    getBottomData();
    // animationCircle("#bottom-item-circle");

});
//显示时间
function mytime(){
    var a = new Date();
    var b = a.toLocaleTimeString();
    var c = a.toLocaleDateString();
    var day = a.getDay();
    var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    var week = weeks[day];//根据day值，获取星期数组中的星期数。

    document.getElementById("moni-time").innerHTML = c+"&nbsp"+week+"&nbsp"+b;
}
setInterval(function() {mytime()},1000);



//左边的数据接口
function getLeftData() {
    $.ajax({
        url: 'https://stm.91yunpan.com/api/statusCurrent',
        type: 'GET',
        dataType: "json",
        success: function (json) {
            left_content.devices = [];
            left_content.devices = left_content.devices.concat(json.data);

        }
    });
}


//底部数据接口
function getBottomData() {
    $.ajax({
        url: 'https://stm.91yunpan.com/api/statusByClass',
        type: 'GET',
        dataType: "json",
        success: function (json) {
            bottom_content.devices = [];
            bottom_content.devices = bottom_content.devices.concat(json.data);
            setgsname(json);
            fillBar(json);
           setTimeout("bar()",500);
           setTimeout("front_bar()",500);
        }
    });
}

var a = [];
function fillBar(json) {
    var i, j;
    for (i = 0; i < json.data.length; i++) {
        for (j = 0; j < json.data[i].sub_list.length; j++) {
            if (json.data[i].sub_list[j].online==0) {
                var  barpercent =0;
                var front_percent=0;
                bar("bar_" + i + "" + j,barpercent);
                front_bar("bar_" + i + "" + j,front_percent);
            }
            else {
              var  barpercent = 195 *json.data[i].sub_list[j].online / json.data[i].sub_list[j].total;
              var front_percent=100*json.data[i].sub_list[j].online / json.data[i].sub_list[j].total;
                bar("bar_" + i + "" + j,barpercent);
                front_bar("bar_" + i + "" + j,front_percent);
            }
        }
    }
}

function bar(id,barpercent) {


    var c = document.getElementById(id);

    var ctx = c.getContext("2d");
    ctx.fillStyle = "#3399CC";
    ctx.fillRect(0, 0, barpercent, 20);


}
function front_bar(id,front_percent) {
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    ctx.fillStyle ="#FFFFFF";
    ctx.font="16px 黑体";
    ctx.fillText(front_percent+"%",95,15);
}



var abc1 = 0.0;
var abc2 = 0.0;
var abc3 = 0.0;

function setgsname(json) {

    abc1 = json.data[0].percent / 100;
    abc2 = json.data[1].percent / 100;
    abc3 = json.data[2].percent / 100;
    animationCircle("#circle_0");
    animationCircle("#circle_1");
    animationCircle("#circle_2");
}


//圆环
function animationCircle(id) {
    var va = 0.0;
    if (id == '#circle_0') {
        va = abc1;
    } else if (id == '#circle_1') {
        va = abc2;
    } else {
        va = abc3;
    }

    $(id).circleProgress({

        value: va,
        startAngle: Math.PI / 4,
        thickness: '20%',
        lineCap: 'round',
        emptyFill: "#dddddd",
        size: 140,
        animation: {duration: 2000, easing: "circleProgressEasing"},

        fill: {
            color: "#339999",
            gradient: ['#3aeabb', '#fdd250']
        }
    });
}


