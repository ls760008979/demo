function getPlan4Data() {
    $.ajax({
        url: baseurl+'/api/v1/plan',
        type: 'GET',
        data: {'house_id': 4},

        dataType: "json",
        success: function (json) {
            setFloor4Data(json);
        }
    });
    // $.getJSON("data/floorData.json", function (json) {
    //     setFloor4Data(json);
    // })

}

function setFloor4Data(json) {
    var con = json.data.container;
    if (con) {
        var width = 1385;
        var height = 620;
        var scale = $(".floor4Container").width() / width;
        $("#floor4-wrapper").css("height", height * scale);
        $("#floor4").css("transform", "scale(" + scale + ")");
        $("#floor4").css("width", width);
        $("#floor4").css("height", height);
        // $("#floor1").css("background-color", con.bgColor);
        // $("#floor4").css("background-image", "url('img/floor4.png')");
        $("#floor4").empty();
        $("#floor4").css("background-color", "transparent");
    }
    // json.signals.map(function(signal){
    //  if(signal){
    // 	 signalMap[''+signal.id]=signal;
    //  }
    // });
    json.data.elements.map(createFloor4Element);
}

//创建一张图片
function createFloor4Element(data) {
    var imageGroup = d3.select("#floor4")
        .append("g")
        .data([data]);

    if (data.status){
        if (data.vtype == 1){
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
        .attr("width", function (d) {
            if (d.vtype == 1){
                return 60

            }else {
                return 30

            }
        })
        .attr("height", function (d) {
            if (d.vtype == 1){
                return 60

            }else {
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

    imageGroup.on("mousemove",alertPosition2)


}