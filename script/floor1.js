function getPlan1Data() {

    $.ajax({
        url: 'http://stsz119.suntrans-cloud.com/api/v1/plan',
        type: 'GET',
        data: {'area_id': 4},

        dataType: "json",
        success: function (json) {
            setPlan1Data(json);
        }
    });


    // $.getJSON("data/floorData.json", function (json) {
    //     setPlan1Data(json);
    // })
}

function getDashedLineData() {
    $.ajax({
        url: 'http://stsz119.suntrans-cloud.com/api/v1/dashLine',
        type: 'GET',
        data: {'area_id': 4},
        dataType: "json",
        success: function (json) {
            createScrollBarElements(json);
        }
    });
}

function setPlan1Data(json) {
    var con = json.data.container;
    if (con) {
        var width = 1385;
        var height = 625;
        var scale = $(".floor1Container").width() / width;
        $("#floor1-wrapper").css("height", height * scale);
        $("#floor1").css("transform", "scale(" + scale + ")");
        $("#floor1").css("width", width);
        $("#floor1").css("height", height);
        // $("#floor1").css("background-color", con.bgColor);
        // $("#floor1").css("background-image", "url('img/floor1.png')");
        $("#floor1").empty();
        $("#floor1").css("background-color", "transparent");
        json.data.elements.map(createFloor1Element);
        json.data.device.map(createFloor1Element);
        getDashedLineData();

    }
    // json.signals.map(function(signal){
    //  if(signal){
    // 	 signalMap[''+signal.id]=signal;
    //  }
    // });

}

function createScrollBarElements(json) {
    for (var i = 0; i < floor1ScrollBar.length; i++) {

        var filter = json.data.filter(function (t) {
            // console.error(floor1ScrollBar[i].id);
            return t.name == floor1ScrollBar[i].id;
        });

        if (filter && filter.length > 0) {
            var b = filter[0].status == "0" ? false : true;
            floor1ScrollBar[i].isShow = b;
        }

    }
    floor1ScrollBar.map(createScrollbar);
}

//创建一张图片
function createFloor1Element(data) {

    var imageGroup = d3.select("#floor1")
        .append("g")
        .data([data]);

    if (data.vtype == 1 || data.vtype == 2 || data.vtype == 3) {
        if (data.status) {
            if (data.vtype == 1) {
                imageGroup.classed("ele", true)
            }
        }

    }


    imageGroup.append("image")
        .classed("control-image", true)
        .attr("x", function (d) {
            return d.x
        })
        .attr("y", function (d) {
            return d.y
        })

        .attr("width", function (d) {
           return 32;
        })
        .attr("height", function (d) {
            return 32;

        })
        .attr("xlink:href", function (d) {
            if (d.vtype == 1 || d.vtype == 2 || d.vtype == 3) {
                if (d.status) {
                    if (d.vtype == 1)
                        return 'img/light_on2.png';
                    else if (d.vtype == 2 || d.vtype == 3) {
                        return 'img/socket_on2.png';
                    }

                } else {
                    if (d.vtype == 1) {
                        return 'img/light_off2.png';
                    } else if (d.vtype == 2 || d.vtype == 3) {

                        return 'img/socket_off2.png';
                    }

                }
            } else if (d.vtype == 6100) {
                if (d.is_online == 0) {
                    return 'img/diliugan_offline.png';

                } else {
                    return 'img/diliugan_online.png';

                }
            } else if (d.vtype == 4300) {
                if (d.is_online == 0) {
                    return 'img/liutongdao_offline.png';

                } else {
                    return 'img/liutongdao_online.png';

                }
            }

        });
    if (data.vtype == 1 || data.vtype == 3 || data.vtype == 2) {
        imageGroup.on("click", openRoomChart);
    }

}


/**
 * 创建一条流动条控件
 * @param data 绑定数据
 * @return
 */
function createScrollbar(data) {
    var signal = data.isShow;

    var scrollbarGroup = d3.select("#floor1")
        .append("g")
        .data([data]);

    scrollbarGroup.append("line")
        .classed("scrollbar-line", true)
        .attr("x1", data.x1)
        .attr("y1", data.y1)
        .attr("x2", data.x2)
        .attr("y2", data.y2)
        .style({'stroke': data.stroke, 'stroke-width': data.strokeWidth, 'stroke-dasharray': data.strokeDasharray});

    scrollbarGroup.append("polygon")
        .classed("scrollbar-border", true)
        .attr("stroke", data.fill)
        .attr("points", calcScrollbarPoints(data))
        .style("opacity", data.showBg);
    if (signal) {
        // var runScript = "(function(){var X=" + signal.value + ";return " + data.content + ";}())";
        try {
            // var result = eval(runScript);
            // if (result) {
            scrollbarGroup.select("line.scrollbar-line")
                .style("stroke-dashoffset", 0)
                .transition()
                .duration(data.radius)
                .ease("linear")
                .style("stroke-dashoffset", data.strokeLinecap);
            // }
        } catch (e) {
            console.log("流动条公式计算异常" + runScript);
        }
    }

    /**
     * 计算边框的坐标
     * @param data
     * @return
     */
    function calcScrollbarPoints(data) {
        var absX = data.width - data.x;
        var absY = data.height - data.y;
        var angle = Math.atan(absY / absX);
        var r = data.strokeWidth / 2 + 2;
        var offsetX = Math.sin(angle) * r;
        var offsetY = Math.cos(angle) * r;
        if (isNaN(offsetX) || isNaN(offsetY)) {
            return "";
        }
        var point1 = (data.x + offsetX) + "," + (data.y - offsetY);
        var point2 = (data.width + offsetX) + "," + (data.height - offsetY);
        var point3 = (data.width - offsetX) + "," + (data.height + offsetY);
        var point4 = (data.x - offsetX) + "," + (data.y + offsetY);
        return point1 + " " + point2 + " " + point3 + " " + point4;
    }

    /**
     * 计算流动条间隔
     * @param data
     * @return
     */
    function calcScrollbarDasharray(data) {
        return data.strokeWidth + " " + data.strokeDasharray;
    }


}

