// Stores the index of the current year in the svg object
var currentYearIndex = 0;

var R = Raphael("paper", "100%", "100%");
R.setViewBox(0, 0, 1133, 1091);

/**
 * Draws a vector map of the arrondissements for the given year.
 * Gets data from the global svg object.
 *
 * @param      {(number|string)}  year    The year to draw
 */
function drawArrondissements(year) {

    R.clear();
    
    var attr = {
        fill: "#aaa",
        stroke: "#333",
        "stroke-width": 2,
        "stroke-linejoin": "round"
    },
    bgAttr = {
        fill: "#fff",
        stroke: "#333",
        "stroke-width": 2,
        "stroke-linejoin": "round"
    },
    highlightAttr = {
        fill: "#5c5",
        stroke: "#333",
        "stroke-width": 2,
        "stroke-linejoin": "round"
    },
    riverAttr = {
        fill: "#57f",
        stroke: "#57f",
        "stroke-width": 3,
        "stroke-linejoin": "round"
    };

    $(".period").hide();
    $("#" + year).show();

    R.path(svg[year].border).attr(attr);
    R.path(svg[year].river).attr(riverAttr);

    var qc = {};
    for (var name in svg[year].boroughs) {

        // Check to see if we should highlight this path
        var currentAttr = attr;
        if ($.inArray(name, svg[year].highlight) != -1) {
            currentAttr = highlightAttr;
        }
        
        var p = R.path(svg[year].boroughs[name]).attr(currentAttr);
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
}

$(function () {

    $("#left-arrow").click(function() {
        currentYearIndex = Math.max(currentYearIndex - 1, 0);
        currentYear = Object.keys(svg)[currentYearIndex];
        drawArrondissements(currentYear);

        if (currentYearIndex == 0) {
            $("#left-arrow").addClass("disabled");
        } else {
            $("#right-arrow").removeClass("disabled");
        }
    });

    $("#right-arrow").click(function() {
        currentYearIndex = Math.min(currentYearIndex + 1, Object.keys(svg).length - 1);
        currentYear = Object.keys(svg)[currentYearIndex];
        drawArrondissements(currentYear);

        if (currentYearIndex == Object.keys(svg).length - 1) {
            $("#right-arrow").addClass("disabled");
        } else {
            $("#left-arrow").removeClass("disabled");
        }
    });

    drawArrondissements(Object.keys(svg)[0]);
});