
function SortingAnimationNew(pArray, pMaxSteps) {
    var ret = {};
    var allActions = [];
    var lines = [];
    var infos = [];

    var srcData = pArray;
    var maxSteps = pMaxSteps;

    var margin = {top: 10, right: 10, bottom: 10, left: 10};
    var width = 800 - margin.left - margin.right;
    var height = 50 - margin.top - margin.bottom;
    var index = d3.range(maxSteps);
    var x = d3.scale.ordinal().domain(index).rangePoints([0, width]);
    var a = d3.scale.linear().domain([0, maxSteps - 1]).range([height / 5, height]);
    var color = d3.scale.quantize().domain([height / 10, height])
            .range(["rgb(255,245,235)", "rgb(254,230,206)", "rgb(253,208,162)", "rgb(253,174,107)", "rgb(253,141,60)", "rgb(241,105,19)", "rgb(217,72,1)", "rgb(166,54,3)", "rgb(127,39,4)"]);

    ret.start = function (delay) {
        setTimeout(
                function () {
                    setInterval(function step() {
                        for (var i = 0; i < allActions.length; i++) {
                            var action = allActions[i].actions.pop();
                            var line = lines[i];
                            var info = infos[i];
                            if (action)
                                switch (action.type) {
                                    case "partition":
                                    {
                                        info.style("stroke", function (d, i) {
                                            return i == action.pivot ? "red" : null;
                                        });
                                        info.style("opacity", function (d, i) {
                                            return i == action.pivot ? 1 : 0;
                                        });
                                        step();
                                        break;
                                    }
                                    case "swap":
                                    {
                                        var t = line[0][action.i];
                                        line[0][action.i] = line[0][action.j];
                                        line[0][action.j] = t;
                                        line.attr("transform", function (d, i) {
                                            return "translate(" + x(i) + ")";
                                        });
                                        line.style("stroke", function (d, i) {
                                            return color(a(d));
                                        });

                                        info.style("opacity", function (d, i) {
                                            return i == action.i || i == action.j ? 1 : 0;
                                        });
                                        info.style("stroke", function (d, i) {
                                            return color(a(d));
                                        });
                                        break;
                                    }
                                    case "move":
                                    {
                                        console.log(line[0][action.i]);
                                        var t = line[0][action.i];
                                        line[0][action.i] = line[0][action.j];
                                        line[0][action.j] = t;
                                        line.attr("transform", function (d, i) {
                                            return "translate(" + x(i) + ")";
                                        });
                                        line.style("stroke", function (d, i) {
                                            return color(a(d));
                                        });

                                        info.style("opacity", function (d, i) {
                                            return i == action.i || i == action.j ? 1 : 0;
                                        });
                                        info.style("stroke", function (d, i) {
                                            return color(a(d));
                                        });
                                        break;
                                    }
                                    case "shuffle":
                                    {
                                        var t = line[0][action.i];
                                        line[0][action.i] = line[0][action.j];
                                        line[0][action.j] = t;
                                        line.attr("transform", function (d, i) {
                                            return "translate(" + x(i) + ")";
                                        });
                                        line.style("stroke", function (d, i) {
                                            return color(a(d));
                                        });
                                        break;
                                    }
                                    case "miss":
                                    {
                                        info.style("opacity", function (d, i) {
                                            return i == action.miss ? 1 : 0;
                                        });
                                        info.style("stroke", function (d) {
                                            return "pink";
                                        })
                                        break;
                                    }
                                    case "traverse":
                                    {
                                        info.style("opacity", function (d, i) {
                                            return i == action.traverse ? 1 : 0;
                                        });
                                        info.style("stroke", function (d) {
                                            return "pink";
                                        })
                                        break;
                                    }
                                    case "done":
                                    {
                                        info.style("opacity", function (d, i) {
                                            return 0;
                                        });
                                        break;
                                    }
                                }
                        }
                    }, 50);
                }, delay);
    };

    ret.reset = function () {
        allActions = [];
        lines = [];
        infos = [];
    };

    ret.add = function (sortingfunction, target) {
        var data = srcData.slice();
        var svg = d3.select(target).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")");

        var line = svg.selectAll("line").data(data).enter().append("line").attr("index", function (d, i) {
            return "i" + i;
        }).style("stroke", function (d) {
            return color(a(d));
        }).attr("x2", function (d) {
            return 0;
        }).attr("y2", function (d) {
            return -a(d);
        }).attr("transform", function (d, i) {
            return "translate(" + x(i) + ")";
        });

        var info = svg.selectAll("g").data(data).enter().append("svg:g").append("svg:line").attr("x1", function (d) {
            return 0;
        }).attr("y1", function (d) {
            return -height - 10;
        }).attr("x2", function (d) {
            return 0;
        }).attr("y2", function (d) {
            return -height - 5;
        }).style("stroke", function (d) {
            return "pink";
        }).style("opacity", function (d) {
            return 0;
        }).attr("transform", function (d, i) {
            return "translate(" + x(i) + ")";
        });

        // sort the list, then reverse the stack of operations so we can animate chronologically from the start
        var actions = sortingfunction(data).reverse();

        // push our actions and reference to our lines to the animator	
        allActions.push({
            actions: actions
        });
        lines.push(line);
        infos.push(info);
    };

    return ret;
}
