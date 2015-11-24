$(function () {

    var R = Raphael("paper", "100%", "100%");

    R.setViewBox(0, 0, 1133, 1091);
    
    var attr = {
        fill: "#aaa",
        stroke: "#333",
        "stroke-width": 1,
        "stroke-linejoin": "round"
    };

    R.path(svg.border).attr(attr);
    var qc = {
        lacitelimoilou: R.path(svg.lacitelimoilou).attr(attr),
        lanciennelorette: R.path(svg.lanciennelorette).attr(attr),
        lesrivieres: R.path(svg.lesrivieres).attr(attr),
        wendake: R.path(svg.wendake).attr(attr),
        saintefoysillerycaprouge: R.path(svg.saintefoysillerycaprouge).attr(attr),
        charlesbourg: R.path(svg.charlesbourg).attr(attr),
        beauport: R.path(svg.beauport).attr(attr),
        lahautesaintcharles: R.path(svg.lahautesaintcharles).attr(attr),
    }
    
    var current = null;
    for (var arrondissement in qc) {

        qc[arrondissement].color = Raphael.getColor(0.9);

        (function (ar, arrondissement) {

            ar[0].style.cursor = "pointer";

            ar[0].onmouseover = function () {
                if (current) {
                    qc[current].animate({fill: "#aaa", stroke: "#333"}, 150);
                    $("#" + current).hide();
                }
                ar.animate({fill: ar.color, stroke: "#000"}, 150);
                ar.toFront();
                R.safari();
                $("#" + arrondissement).show();
                current = arrondissement;
            };

            ar[0].onmouseout = function () {
                ar.animate({fill: "#aaa", stroke: "#333"}, 150);
                ar.toFront();
                R.safari();
            };

        })(qc[arrondissement], arrondissement);
    }
});