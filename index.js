$(function () {

    var R = Raphael("paper", "100%", "100%");

    R.setViewBox(0, 0, 1133, 1091);
    
    var attr = {
        fill: "#aaa",
        stroke: "#333",
        "stroke-width": 1,
        "stroke-linejoin": "round"
    },
    bgAttr = {
        fill: "#fff",
        stroke: "#333",
        "stroke-width": 1,
        "stroke-linejoin": "round"
    },
    riverAttr = {
        fill: "#57f",
        stroke: "#57f",
        "stroke-width": 3,
        "stroke-linejoin": "round"
    };

    var year = 2002;

    $(".period").hide();
    $("#" + year).show();

    R.path(svg[year].border).attr(attr);
    R.path(svg[year].river).attr(riverAttr);

    var qc = {};
    for (var name in svg[year].boroughs) {
        var p = R.path(svg[year].boroughs[name]).attr(attr);
        if (year == 2009) {
            qc[name] = p;
        }
    }
    
    for (var name in svg[year].nonboroughs) {
        R.path(svg[year].nonboroughs[name]).attr(bgAttr);
    }
    
    var current = null;
    for (var arrondissement in qc) {

        qc[arrondissement].color = Raphael.getColor(0.9);

        (function (ar, arrondissement) {

            ar[0].style.cursor = "pointer";

            ar[0].onmouseover = function () {

                $(".period-info").hide();
                if (current) {
                    qc[current].animate({fill: "#aaa", stroke: "#333"}, 150);
                    $(".arrondissement-info").hide();
                }
                ar.animate({fill: ar.color, stroke: "#000"}, 150);
                ar.toFront();
                R.safari();
                $("#" + arrondissement).show();
                current = arrondissement;
            };

            ar[0].onmouseout = function () {
                $(".period-info").show();
                ar.animate({fill: "#aaa", stroke: "#333"}, 150);
                ar.toFront();
                R.safari();
                $(".arrondissement-info").hide();
                current = null;
            };

        })(qc[arrondissement], arrondissement);
    }
});