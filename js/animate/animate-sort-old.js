//Sortierte Animation eines Array auf der Sich von X und Y Achse
/*
 * 
 * @param {int[]} pArray
 * Das zu sortierende Array 
 * 
 * @param {int} pMaxSteps
 * Anzahl der enthaltenden Werte
 * 
 * @returns {SortingAnimationNew.ret}
 */
function SortingAnimationOld(pArray, pMaxSteps) {
    //Variablen
    var ret = {};
    var allActions = [];
    var rects = [];

    var maxSteps = pMaxSteps;
    var srcData = pArray;

    var margin = {top: 10, right: 10, bottom: 10, left: 10};
    var widthHeight = 200 - margin.left - margin.right;
    var z = (widthHeight - margin.left - margin.right) / maxSteps;

    /*
     * Startet die Ausgabe der Sortierten Stacks
     * @param {type} delay
     * das delay gibt an wie lange gewartet werden soll bis es gestartet werden soll nach dem Start ausgeführt wurden ist 
     * 
     * @returns {undefined}
     */
    ret.start = function (delay) {
        setTimeout(
                function () {
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
                                        rect.attr("transform", function (d, i) {
                                            return "translate(" + (i * z) + "," + ((maxSteps - d) * z) + ")";
                                        });
                                        break;
                                    }
                                }
                            }
                        }
                    }, 1);
                }, delay);
    };
    /*
     * Resetet die Ausgabe bevor man die Function Start ausführt.
     * @returns {undefined}
     */
    ret.reset = function () {
        allActions = [];
        rects = [];
    };

    /*
     * Hinzufügen des zu Sortierenden Animation
     * 
     * sortingfunction
     * Sortierfunktion die das gesamte Array Sortiert 
     * und die Einzelen Schritte als Stack zurück gibt
     * 
     * target (String) "#target"
     * ID des  <section> Tags
     */
    ret.add = function (sortingfunction, target) {
        //Erzeugung einer Kopie des genutzten Arrays 
        var data = srcData.slice();

        //Erstellung der SVG Zeichnung in HTML Tag <section> mit der ID der target Variable        
        var svg = d3.select(target).append("svg")
                .attr("width", widthHeight + margin.left + margin.right)
                .attr("height", widthHeight + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //Zeichnen aller Rechtecke in der SVG Zeichnung 
        var rect = svg.selectAll("rect")
                .data(data)
                .enter().append("rect")
                .attr("transform", function (d, i) {
                    return "translate(" + (i * z) + "," + ((maxSteps - d) * z) + ")";
                })
                .attr("width", z)
                .attr("height", z)
                .style("fill", "black");
        //Sortierung des Arrays und Speicherung des Stacks in der Variable actions, sodass die Sortierung animiert werden kann
        var actions = sortingfunction(data, maxSteps).reverse();
        allActions.push({actions: actions});
        rects.push(rect);
    };
    return ret;
}
