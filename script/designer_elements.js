/**
 * 创建一条流动条控件
 * @param data 绑定数据
 * @return
 */
function createScrollbar(data){
    var signal = signalMap[data.signalFlag];
    var scrollbarGroup = d3.select("#floor1")
        .append("g")
        .classed("ele",true)
        .data([data]);

    scrollbarGroup.append("line")
        .classed("scrollbar-line",true)
        .attr("x1",data.x)
        .attr("y1",data.y)
        .attr("x2",data.width)
        .attr("y2",data.height)
        .style({'stroke':data.stroke,'stroke-width':data.strokeWidth,'stroke-dasharray':data.strokeDasharray});

    scrollbarGroup.append("polygon")
        .classed("scrollbar-border",true)
        .attr("stroke",data.fill)
        .attr("points",calcScrollbarPoints(data))
        .style("opacity",data.showBg);
    if(signal && signal.value){
        var runScript = "(function(){var X="+signal.value+";return "+data.content+";}())";
        try{
            var result = eval(runScript);
            if(result){
                scrollbarGroup.select("line.scrollbar-line")
                    .style("stroke-dashoffset",0)
                    .transition()
                    .duration(data.radius)
                    .ease("linear")
                    .style("stroke-dashoffset",data.strokeLinecap);
            }
        }catch(e){
            console.log("流动条公式计算异常"+runScript);
        }
    }
    /**
     * 计算边框的坐标
     * @param data
     * @return
     */
    function calcScrollbarPoints(data){
        var absX = data.width-data.x;
        var absY = data.height-data.y;
        var angle = Math.atan(absY/absX);
        var r = data.strokeWidth/2+2;
        var offsetX = Math.sin(angle)*r;
        var offsetY = Math.cos(angle)*r;
        if(isNaN(offsetX) || isNaN(offsetY)){
            return "";
        }
        var point1 = (data.x+offsetX)+","+(data.y-offsetY);
        var point2 = (data.width+offsetX)+","+(data.height-offsetY);
        var point3 = (data.width-offsetX)+","+(data.height+offsetY);
        var point4 = (data.x-offsetX)+","+(data.y+offsetY);
        return point1+" "+point2+" "+point3+" "+point4;
    }

    /**
     * 计算流动条间隔
     * @param data
     * @return
     */
    function calcScrollbarDasharray(data){
        return data.strokeWidth+" "+data.strokeDasharray;
    }
}