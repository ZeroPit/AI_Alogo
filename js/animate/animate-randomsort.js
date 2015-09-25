/* 
    Dateiname  : animate-randomsort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny Lüttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

/*
 * Erstellt ein Array welches alle Grundfarben enthält
 * die anschlissen Zufallig vertauscht werden
 * @param {int} pMax
 * @returns {creatRGB.lArray|Array}
 */
function creatRGB(pMax) {
    var lArray = [];
    var lMode = 1;
    var R, G, B;
    R = 255;
    G = 0;
    B = 0;
    var s = 1530.0 / pMax;
    var i = -1;
    do {
        switch (lMode) {
            case 1:
                B += s;
                if (B >= 255)
                    lMode++;
                break;
            case 2:
                R -= s;
                if (R <= 0)
                    lMode++;
                break;
            case 3:
                G += s;
                if (G >= 255)
                    lMode++;
                break;
            case 4:
                B -= s;
                if (B <= 0)
                    lMode++;
                break;
            case 5:
                R += s;
                if (R >= 255)
                    lMode++;
                break;
            case 6:
                G -= s;
                if (G <= 0)
                    lMode = 1;
                break;
        }
        i++;
        if (R < 0)
            R = 0;
        if (R > 255)
            R = 255;
        if (G < 0)
            G = 0;
        if (G > 255)
            G = 255;
        if (B < 0)
            B = 0;
        if (B > 255)
            B = 255;
        lArray.push({i: i, v: {r: R, g: G, b: B, color: "rgb(" + R + "," + G + "," + B + ")"}});
    } while (i < pMax);

    var i = lArray.length, j, v;
    while (--i > 0) {
        j = ~~(Math.random() * (i + 1));
        v = lArray[j].v;
        lArray[j].v = lArray[i].v;
        lArray[i].v = v;
    }
    return lArray;
}
/*
 * 
 * @param {type} pWidth
 * @param {type} pSteps
 * @param {type} pArray
 * @returns {SortingAnimationRandom.ret}
 */
function SortingAnimationRandom(pWidth, pSteps, pArray) {
    var ret = {};
    var margin = {top: 10, right: 10, bottom: 10, left: 10};
    var steps = pSteps;
    var widthHeight = pWidth;
    var z = (widthHeight) / steps;
    var srcData = pArray;
    var allActions = [];
    var rects = [];
    var timer_off = true;

    /*
     * Kopier Funktion da Array.slice() nicht funktionier 
     * wenn das Array Ojekte enthält
     * @returns {Array|SortingAnimationRandom.copyArray.lCopyArray}
     */
    function copyArray() {
        var lCopyArray = [];
        srcData.forEach(function (entry) {
            lCopyArray.push({i: entry.i, v: {r: entry.v.r, g: entry.v.g, b: entry.v.b, color: entry.v.color}});
        });
        return lCopyArray;
    }
    /*
     * Erzeugt aus dem Letzten stand des zu sortierenden Array eine neuen stand
     * sodass Random sort weiter sortiert wird bis unter 100 änderungen sind 
     * dannn wird die Sortierung gestopt
     * @param {type} pObjekt
     * @param {type} delay
     * @returns {undefined}
     */
    function startNew(pObjekt, delay) {
        var actions = pObjekt.sortingfunction(pObjekt.data, steps).reverse();
        if (actions.length < 100)
            pObjekt.stop = true;
        else
            pObjekt.actions = actions;
    }
    /*
     * Leert das gesamte Target sodass es nicht zu fehlern kommt
     * @param {type} pTarget
     * @returns {Boolean}
     */
    function clear(pTarget) {
        for (var i = 0; i < allActions.length; i++) {
            var actionTarget = allActions[i];
            if (pTarget === actionTarget.Target) {
                allActions.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /*
     * Startet die Ausgabe von Random Sort solange bis es gestopt wird 
     * @param {type} delay
     * @returns {undefined}
     */
    ret.start = function (delay) {
        timer_off = false;
        d3.timer(function () {
            for (l = 0; l < 5; l++) {
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
                                    return "translate(" + (i % steps) * z + "," + Math.floor(i / steps) * z + ")";
                                });
                                break;
                            }
                        }
                    }
                }
            }
            for (var i = 0; i < allActions.length; i++) {
                if (allActions[i].actions.length === 0 && allActions[i].stop === false) {
                    startNew(allActions[i]);
                    i--;
                }
            }
            return timer_off;
        });
    };
    /*
     * Resetet die Ausgabe bevor man die Function Start ausführt.
     * @returns {undefined}
     */
    ret.reset = function () {
        allActions = [];
        rects = [];
        timer_off = true;
    };
    /*
     * Startet den Sortierung wenn sie ganz aus ist 
     * @returns {undefined}
     */
    ret.restart = function () {
        if (timer_off)
            ret.start(0);
    };
    /*
     * Hizufügen einer Instanz für RandomSort
     */
    ret.add = function (sortingfunction, target) {
        clear(target);
        var data = copyArray();
        var svg = d3.select(target).append("svg").attr("width", widthHeight + margin.left + margin.right).attr("height", widthHeight + margin.top + margin.bottom)
                .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var rect = svg.selectAll("rect")
                .data(data)
                .enter().append("rect")
                .attr("transform", function (d) {
                    var lX = Math.floor(widthHeight / z);
                    return "translate(" + (d.i % lX) * z + "," + Math.floor(d.i / lX) * z + ")";
                })
                .attr("width", z)
                .attr("height", z)
                .style("fill", function (d) {
                    return d3.rgb(d.v.color);
                });
        // sort the list, then reverse the stack of operations so we can animate chronologically from the start
        var actions = sortingfunction(data, steps).reverse();

        // push our actions and reference to our lines to the animator	
        allActions.push({
            actions: actions,
            sortingfunction: sortingfunction,
            data: data,
            target: target,
            stop: false
        });
        rects.push(rect);
    };
    return ret;
}