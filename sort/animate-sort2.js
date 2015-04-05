var SortingAnimation2 = function() {

    function shuffle(array) {
        var i = array.length, j, a, b;
        while (--i > 0) {
            j = ~~(Math.random() * (i + 1));
            a = array[j].a;
            array[j].a = array[i].a;
            array[i].a = a;
            b = array[j].b;
            array[j].b = array[i].b;
            array[i].b = b;
        }
        return array;
    }

    var ret = {};
    var margin = {top: 10, right: 10, bottom: 10, left: 10};
    var step = 24;
    var widthHeight = 275 - margin.left - margin.right;

    var z = (widthHeight - margin.left - margin.right) / step;
    var index = d3.range(step * step);
    var x = d3.scale.ordinal().domain(index).rangePoints([0, widthHeight]);
    var y = d3.scale.ordinal().domain(index).rangePoints([0, widthHeight]);

    var srcDataFin = [];
    index.forEach(function(d) {
        srcDataFin.push({
            "x": (d % 24) * z,
            "y": Math.floor(d / 24) * z,
            "a": ((d % 24) * z) - 120,
            "b": ((Math.floor(d / 24) * z) - 120) * -1
        });
    });
    var srcData = shuffle(srcDataFin.slice());

    var allActions = [];
    var rects = [];
    ret.start = function(delay) {
        setTimeout(
                function() {

                    setInterval(function step() {
                        for (var i = 0; i < allActions.length; i++) {
                            var action = allActions[i].actions.pop();
                            var rect = rects[i];
                            if (action)
                            {                               
                                switch (action.type) {
                                    case "swap":
                                        {       
                                            var t = rect[0][action.i];
                                            rect[0][action.i] = rect[0][action.j];
                                            rect[0][action.j] = t;                                          
                                            rect.attr("transform", function(d, i) {
                                                  return "translate(" + (i % 24) * z + ","+ Math.floor(i / 24) * z +")";                                             
                                            });
                                            break;
                                        }
                                }
                            }
                        }
                    }, 1);
                }, delay);
    };

    ret.prepareAnimation = function(sortingfunction, target) {
        var data = srcData.slice();
        var svg = d3.select(target).append("svg").attr("width", widthHeight + margin.left + margin.right).attr("height", widthHeight + margin.top + margin.bottom)
                .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var rect = svg.selectAll("rect")
                .data(data)
                .enter().append("rect")
                .attr("transform", function(d) {
                    return  "translate(" + d.x + "," + d.y + ")";
                })
                .attr("width", z)
                .attr("height", z)
                .style("fill", function(d) {
                    return d3.lab(70, d.a, d.b);
                });
        // sort the list, then reverse the stack of operations so we can animate chronologically from the start
        var actions = sortingfunction(data, step).reverse();

        // push our actions and reference to our lines to the animator	
        allActions.push({
            actions: actions
        });
        rects.push(rect);
    };

    return ret;
}();
