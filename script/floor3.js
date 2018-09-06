function getPlan3Data() {
    $.ajax({
        url:  baseurl+'/api/v1/plan',
        type: 'GET',
        data: {'house_id': 3},

        dataType: "json",
        success: function (json) {
            setFloor3Data(json);
        }
    });
    // $.getJSON("data/floorData.json", function (json) {
    //     setFloor3Data(json)
    // })

}

function setFloor3Data(json) {
    var con = json.data.container;
    if (con) {
        var width = 1385;
        var height = 620;
        var scale = $(".floor3Container").width() / width;
        $("#floor3-wrapper").css("height", height * scale);
        $("#floor3").css("transform", "scale(" + scale + ")");
        $("#floor3").css("width", width);
        $("#floor3").css("height", height);
        // $("#floor1").css("background-color", con.bgColor);
        // $("#floor3").css("background-image", "url('img/floor3.png')");
        $("#floor3").empty();
        $("#floor3").css("background-color", "transparent");
    }
    // json.signals.map(function(signal){
    //  if(signal){
    // 	 signalMap[''+signal.id]=signal;
    //  }
    // });
    json.data.elements.map(createFloor3Element);
}

//创建一张图片
function createFloor3Element(data) {
    var imageGroup = d3.select("#floor3")
        .append("g")
        .data([data]);

    if (data.status) {
        if (data.vtype == 1) {
            imageGroup.classed("ele", true)
        }
    }

    imageGroup.append("image")
        .classed("control-image", true)
        .attr("x", function (d) {
            return d.x - 552
        })
        .attr("y", function (d) {
            return d.y - 106
        })

        .attr("title", function (d) {
            return d.channel_id + "_" + d.x + "_" + d.y
        })
        .attr("width", function (d) {
            if (d.vtype == 1) {
                return 60

            } else {
                return 30

            }
        })
        .attr("height", function (d) {
            if (d.vtype == 1) {
                return 60

            } else {
                return 30

            }
        })
        .attr("xlink:href", function (d) {
            if (d.status) {
                if (d.vtype == 1)
                    return 'img/light_on2.gif';
                else
                    return 'img/socket_on2.png';

            } else {
                if (d.vtype == 1)
                    return 'img/light_off2.png';
                else
                    return 'img/socket_off2.png';
            }
        });

    imageGroup.on("mousemove", alertPosition2)


}