function getDevYicmsg() {
    $.ajax({
        url: baseurl + '/api/v1/abnomal',
        type: 'GET',
        dataType: "json",
        success: function (json) {
            setDeviceYichang(json.data);
        }
    });
    //http://dcw.suntrans-cloud.com/api/v1/deviceLog
}

//
function setDeviceYichang(devYichang) {

    if (devYichang.length == 0) {
        $("#warningImg").attr("src", "img/normal.png");
        $("#ulMsg").empty();
        var html =
            '<li class="YichangName2">' + '一切正常';
        '</li>'
        $("#ulMsg")
            .append(html);
        $("#msgContainer")
            .append(html);

    } else {
        $("#warningImg").attr("src", "img/warining.gif");
        $("#ulMsg").empty();
        for (var i = 0; i < devYichang.length; i++) {
            var html =
                '<li class="YichangName">' + devYichang[i].house_number + '-' + devYichang[i].name + '-' + devYichang[i].message + '';
            '</li>'
            $("#ulMsg")
                .append(html);
        }
        if (devYichang.length > 1)
            startScroll();
    }

//消息滚动
//     var messageSwiper = new Swiper('.messageSwiper', {
//         disableOnInteraction: false,
//         direction: 'vertical',
//         autoplay: {
//             delay: 2000,
//             stopOnLastSlide: false,
//             disableOnInteraction: true,
//         },
//     });
}

var timer = null;

function startScroll() {
    if (timer) {
        clearInterval(timer);
    }
    var $uList = $(".scroll-box ul");
    timer = setInterval(function () {
            scrollList($uList);
        },
        3000);

    //触摸清空定时器
    // $uList.hover(function() {
    //         clearInterval(timer);
    //     },
    //     function() { //离开启动定时器
    //         timer = setInterval(function() {
    //                 scrollList($uList);
    //             },
    //             3000);
    //     }).trigger("mouseleave"); //自动触发触摸事件
    //滚动动画
    function scrollList(obj) {
        //获得当前<li>的高度
        var scrollHeight = $("ul li:first").height();
        //滚动出一个<li>的高度
        $uList.stop().animate({
                marginTop: -scrollHeight
            },
            600,
            function () {
                //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
                $uList.css({
                    marginTop: 0
                }).find("li:first").appendTo($uList);
            });
    }
}

function getEnvYiChang() {

    $.ajax({
        url: 'http://dcw.suntrans-cloud.com/api/v1/environmentalLog',
        type: 'GET',
        dataType: "json",
        success: function (json) {
            setEnvYichang(json.data);
        }
    });
}

function setEnvYichang(envYichang) {

    if (envYichang.length == 0) {
        $("#envUl").empty();
        var html = ' <li >' +
            '<p class="" style="text-align: left"><span class="YichangName">' + '没有异常信息!' + '</span> ' +
            ' </li>';
        $("#envUl")
            .append(html);

    } else {
        $("#envUl").empty();
        for (var i = 0; i < envYichang.length; i++) {
            var html = ' <li >' +
                '<p class="" style="text-align: left"><span class="YichangMsg">' + envYichang[i].msg + '</span> ' +
                '<span class="YichangName">  ' + envYichang[i].name + '</span> <span class="YichangName" >' + envYichang[i].created_at + '</span></p>' +
                ' </li>';
            $("#envUl")
                .append(html);
        }
    }

    // $(".envMSg").myScroll({
    //     speed: 100, //数值越大，速度越慢
    //     rowHeight: 30 //li的高度
    // });
}

