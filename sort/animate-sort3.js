var SortingAnimation3 = function() {

    function shuffle(array) {
        var i = array.length, j, t;
        while (--i > 0) {
            j = ~~(Math.random() * (i + 1));
            t = array[j];
            array[j] = array[i];
            array[i] = t;
        }
        return array;
    }

    var ret = {};
    var margin = {top: 10, right: 10, bottom: 10, left: 10};
    var maxSteps = 64;
    var widthHeight = 200 - margin.left - margin.right;

    var z = (widthHeight - margin.left - margin.right) / maxSteps;
    var index = d3.range(maxSteps); 
    
    var srcData = shuffle(index.slice());

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
                                                  return "translate(" + (i * z) + "," + ((maxSteps - d) * z)+ ")";
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
                .attr("transform", function(d, i) {
            		return "translate(" + (i * z) + "," + ((maxSteps - d) * z)+ ")";
                })
                .attr("width", z)
                .attr("height", z)
                .style("fill", "black");
        // sort the list, then reverse the stack of operations so we can animate chronologically from the start
        var actions = sortingfunction(data, maxSteps).reverse();

        // push our actions and reference to our lines to the animator	
        allActions.push({
            actions: actions
        });
        rects.push(rect);
    };

    return ret;
}();
