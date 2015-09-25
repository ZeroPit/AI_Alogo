/* 
    Dateiname  : animate-heapsort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny Lüttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

/*
 * Erzuegt ein Bereich der alle Ausgabe 
 * und eingabefelder besitzt die benötigt werden
 * @param {type} pTarget
 * @returns {heapsortTree}
 */
function heapsortTree(pTarget) {

    //Variablen
    var target = pTarget;

    var startHeapArray = [];
    var heapArray = [];
    var endHeapArray = [];
    var maxArray = 13;
    var leafFocus = 0;
    var svgW = 620;
    var svgH = 320;
    var vRad = 18;
    var treeFin = false;
    var isHeap = false;
    var tree = {cx: svgW / 2, cy: 30, w: 60, h: 70};
    tree.vis = {v: 0, v2: 0, l: '?', p: {x: tree.cx, y: tree.cy}, c: []};
    tree.size = 1;

    /*
     * Initialisiert einen neuen Baum mit neuem Array
     * @returns {undefined}
     */
    initTree = function () {
        createNewArray();
        tree.vis = {v: 0, v2: 0, l: heapArray[0], p: {x: tree.cx, y: tree.cy}, c: []};
        tree.size = 1;
        treeFin = false;
        drawStartArrayDiv();
        drawEndArrayDiv();
        drawTree();
        setFocus(0);
        drawInfoText("Zunächst muss der Baum erstellt werden");
    };
    /*
     * Wenn der Baum noch nicht fertiggestellt wurde
     * Wird er mit einer leichten Verzögerung zu Ende erstellt 
     * @returns {undefined}
     */
    finAutoTree = function () {
        if (treeFin)
            return;
        function addWithTimeout() {
            if (tree.size < heapArray.length) {
                addLeaf(getNextLeaf(-1));
                setTimeout(function () {
                    addWithTimeout();
                }, 500);
            }
            else {
                treeFin = true;
                setFocus(0);
                drawInfoText("Der Baum ist nun erstellt, nun zur Heap Eigenschaft");
            }
        }
        addWithTimeout();
    };
    /*
     * es wird geschaut ob der Baum schon seine Heap eigenschaft hat 
     * wenn nicht wird die Heap eigenschaft umgesetzt
     * mit eine leichten verzögerung
     * @returns {undefined}
     */
    finAutoHeap = function () {
        leafFocus = 0;
        function heapWithTimeout() {
            if ((leafFocus >= 0)) {
                setFocus(leafFocus);
                if (isLeafHeap(leafFocus, (leafFocus * 2) + 1) === 1) {
                    changeLeaf(leafFocus, (leafFocus * 2) + 1);
                }
                else if (isLeafHeap(leafFocus, (leafFocus + 1) * 2) === 1) {
                    changeLeaf(leafFocus, (leafFocus + 1) * 2);
                }
                leafFocus = hasHeap();
                setTimeout(function () {
                    heapWithTimeout();
                }, 1000);
            }
            else {
                isHeap = true;
                setFocus(0);
            }
        }
        heapWithTimeout();
    };
    /*
     * Löste den gesamten Baum von anfang an oder mitten drin an gestartet
     * @returns {undefined}
     */
    finAutoFullTree = function () {
        function addWithTimeout() {
            if (tree.size < heapArray.length) {
                addLeaf(getNextLeaf(-1));
                setTimeout(function () {
                    addWithTimeout();
                }, 500);
            }
            else {
                treeFin = true;
                setFocus(0);
                drawInfoText("Der Baum ist nun erstellt, nun zur Heap Eigenschaft");
                leafFocus = 0;
                setTimeout(function () {
                    heapWithTimeout();
                }, 2000);
            }
        }
        function heapWithTimeout() {
            if ((leafFocus >= 0)) {
                setFocus(leafFocus);
                if (isLeafHeap(leafFocus, (leafFocus * 2) + 1) === 1) {
                    changeLeaf(leafFocus, (leafFocus * 2) + 1);
                }
                else if (isLeafHeap(leafFocus, (leafFocus + 1) * 2) === 1) {
                    changeLeaf(leafFocus, (leafFocus + 1) * 2);
                }
                leafFocus = hasHeap();
                setTimeout(function () {
                    heapWithTimeout();
                }, 1000);
            }
            else {
                isHeap = true;
                setFocus(0);
                setTimeout(function () {
                    setToEndArray();
                }, 1000);
                if (tree.size !== 0) {
                    setTimeout(function () {
                        heapWithTimeout();
                    }, 1000);
                }
            }
        }
        if (treeFin) {
            leafFocus = 0;
            heapWithTimeout();
        }
        else
            addWithTimeout();
    };
    /*
     * Erstellt ein neues Array welches mit zufallszahlen gefühlt wird
     * @returns {undefined}
     */
    createNewArray = function () {
        heapArray = [];
        endHeapArray = [];
        var lMax = Math.floor((Math.random() * (maxArray - 7)) + 8);
        for (var i = 0; i < lMax; i++) {
            heapArray.push(Math.floor((Math.random() * lMax) + 1));
            endHeapArray.push(-1);
        }
        startHeapArray = heapArray.slice();
    };
    /*
     * Setzt die Variable des Stams in das end Array
     * und setzt das die Variable des letzte Blattes an die Stelle des Stams
     * @returns {undefined}
     */
    setToEndArray = function () {
        endHeapArray[tree.size - 1] = getLeaf(0);
        drawEndArrayDiv();
        tree.vis.l = getLeaf(tree.size - 1);
        removeLeaf(tree.size - 1);
        if (tree.size === 0)
            drawInfoText("Der Baum wurde vollständig gelöst");
        else
            drawInfoText("Heap Eigenschaft erneut erreichen");
        setFocus(0);
    };
    /*
     * Füght einen neues Blat hinzu 
     * und nimmt die ensprechende näschte Astgabelung in focus
     * @param {type} leafId
     * @returns {undefined}
     */
    addLeaf = function (pLeafId) {
        function add(t) {
            if (t.v === pLeafId) {
                t.c.push({v: tree.size++, v2: tree.size, l: heapArray[tree.size - 1], p: {}, c: []});
                return;
            }
            t.c.forEach(add);
        }
        add(tree.vis);
        reposition(tree.vis);
        redrawTree();
        setFocus(getNextLeaf(-1));
    };
    /*
     * Gibt die Variable des entsprechenden Blattes zurück
     * @param {int} leafId
     * @returns {Number}
     */
    getLeaf = function (pLeafId) {
        var lReturn = -1;
        function get(t) {
            if (lReturn !== -1)
                return;
            if (t.v === pLeafId) {
                lReturn = t.l;
                return;
            }
            t.c.forEach(get);
        }
        get(tree.vis);
        return lReturn;
    };
    /*
     * Entfernt das ensprechende Blatt 
     * Wenn keine Blatter mehr da sind wird einen Leeres Blatt stehen gelassen 
     * @param {type} pLeafId
     * @returns {Number}
     */
    removeLeaf = function (pLeafId) {
        var lReturn = -2;
        function remove(t) {
            if (lReturn !== -2)
                return;
            if (t.c.length === 0)
                return;
            if (t.c.length === 1) {
                if (t.c[0].v === pLeafId) {
                    t.c.splice(0, 1);
                    lReturn = 1;
                    return;
                }
            }
            if (t.c.length === 2) {
                if (t.c[0].v === pLeafId) {
                    t.c.splice(0, 1);
                    lReturn = 1;
                    return;
                }
                if (t.c[1].v === pLeafId) {
                    t.c.splice(1, 2);
                    lReturn = 1;
                    return;
                }
            }
            t.c.forEach(remove);
        }
        remove(tree.vis);
        if (tree.size === 1) {
            tree.vis = {v: 0, v2: 0, l: '', p: {x: tree.cx, y: tree.cy}, c: []};
            lReturn = 1;
        }
        if (lReturn === 1) {
            tree.size--;
            reposition(tree.vis);
            drawTree();
        }
        return lReturn;
    };
    /*
     * Vertausch zwei entsprechende Blätter 
     * um die Heap eigenschaft zu gewährleisten
     * @param {type} pLeafIdFrom
     * @param {type} pLafIdTo
     * @returns {undefined}
     */
    changeLeaf = function (pLeafIdFrom, pLafIdTo) {
        function change(t) {
            if (t.v === pLeafIdFrom) {
                var v2 = t.v2;
                var l = t.l;
                if (t.c[0].v === pLafIdTo) {
                    t.v2 = t.c[0].v2;
                    t.c[0].v2 = v2;
                    t.l = t.c[0].l;
                    t.c[0].l = l;
                }
                else {
                    t.v2 = t.c[1].v2;
                    t.c[1].v2 = v2;
                    t.l = t.c[1].l;
                    t.c[1].l = l;
                }
                return;
            }
            t.c.forEach(change);
        }
        change(tree.vis);
        redrawTree();
    };
    /*
     * Gibt die nächste Astgabelung zurück
     * des entsprechenden Blattes
     * @param {type} pLeafId
     * @returns {unresolved}
     */
    getNextLeaf = function (pLeafId) {
        if (pLeafId > -1)
            return parseInt((pLeafId - 1) / 2, 10);
        else
            return parseInt((tree.size - 1) / 2, 10);
    };
    /*
     * Zählt alle Blätter die an der Astgableung dran sind
     * @param {type} pLeaf
     * @returns {Number}
     */
    getLeafCount = function (pBranch) {
        if (pBranch.c.length === 0)
            return 1;
        else
            return pBranch.c.map(getLeafCount).reduce(function (a, b) {
                return a + b;
            });
    };
    /*
     * Sortiert den Baum ab den entsprechenden Astgabelung um 
     * @param {type} pBranch
     * @returns {undefined}
     */
    reposition = function (pBranch) {
        var lC = getLeafCount(pBranch), left = pBranch.p.x - tree.w * (lC - 1) / 2;
        pBranch.c.forEach(function (d) {
            var w = tree.w * getLeafCount(d);
            left += w;
            d.p = {x: left - (w + tree.w) / 2, y: pBranch.p.y + tree.h};
            reposition(d);
        });
    };
    /*
     * Klick Funktion der Blätter 
     * @param {type} pLeafId
     * @returns {undefined}
     */
    clickLeaf = function (pLeafId) {
        if (tree.size >= heapArray.length || treeFin) {
            if (leafFocus === pLeafId) {
                if (isLeafHeap(leafFocus, pLeafId) === 1) {
                    setFocus(leafFocus + 1);
                }
                else
                    drawInfoText("Heap Eigenschaft ist nicht erreicht");
            }
            else {
                if (leafFocus === getNextLeaf(pLeafId)) {
                    if (isLeafHeap(leafFocus, pLeafId) === 1) {
                        changeLeaf(leafFocus, pLeafId);
                        setFocus(leafFocus + 1);
                    }
                    else
                        drawInfoText("Heap Eigenschaft ist nicht erreicht");
                }
                else {
                    if (isHeap) {
                        setToEndArray();
                    }
                }
            }
        }
        else {
            if (pLeafId !== getNextLeaf(-1)) {
                drawInfoText("Der Baum ist noch nicht fertig");
            }
            else {
                addLeaf(pLeafId);
                if (tree.size === heapArray.length) {
                    treeFin = true;
                    setFocus(0);
                    drawInfoText("Der Baum ist nun erstellt, nun zur Heap Eigenschaft");
                }
            }
        }
    };
    /*
     * Überprüft ob der gesamte Baum die Heap Eigenschaft besitzt
     * Wenn  gibt er -1 zurück
     * wenn nicht die Blatt ID an der es keine Heap Eigenschaft gibt 
     * @returns {t.v|Number}
     */
    hasHeap = function () {
        var lReturn = -2;
        function heap(t) {
            if (lReturn !== -2)
                return;
            if (t.c.length === 0)
                return;
            if (t.c.length === 1) {
                if (t.l < t.c[0].l) {
                    lReturn = t.v;
                    return;
                }
            }
            if (t.c.length === 2) {
                if (t.l < t.c[0].l || t.l < t.c[1].l) {
                    lReturn = t.v;
                    return;
                }
            }
            t.c.forEach(heap);
        }
        heap(tree.vis);
        if (lReturn === -2)
            lReturn = -1;
        return lReturn;
    };
    /*
     * Überprüft ob die beiden Blätter die Heap Eigenschaft besitzen
     * wenn nicht -1
     * @param {int} pLeafIdFrom
     * @param {int} pLeafIdTo
     * @returns {Number}
     */
    isLeafHeap = function (pLeafIdFrom, pLeafIdTo) {
        var lReturn = -2;
        function isHeap(t) {
            if (t.v === pLeafIdFrom) {
                if (lReturn !== -2)
                    return;
                if (t.c.length === 0)
                    return;
                if (t.v === pLeafIdTo) {
                    if (t.c.length === 1) {
                        if (t.l < t.c[0].l)
                        {
                            lReturn = 0;
                            return;
                        }
                    }
                    if (t.c.length === 2) {
                        if (t.l < t.c[0].l || t.l < t.c[1].l) {
                            lReturn = 0;
                            return;
                        }
                    }
                    lReturn = 1;
                    return;
                }
                else {
                    if (t.c.length === 1) {
                        if (t.c[0].v === pLeafIdTo && t.l < t.c[0].l) {
                            lReturn = 1;
                            return;
                        }
                    }
                    else {
                        if (t.c[0].v === pLeafIdTo && t.l < t.c[0].l && t.c[1].l <= t.c[0].l) {
                            lReturn = 1;
                            return;
                        }
                        if (t.c[1].v === pLeafIdTo && t.l < t.c[1].l && t.c[0].l <= t.c[1].l) {
                            lReturn = 1;
                            return;
                        }
                    }
                    lReturn = 0;
                    return;
                }
            }
            t.c.forEach(isHeap);
        }
        isHeap(tree.vis);
        if (lReturn === -2)
            lReturn = -1;
        return lReturn;
    };
    /*
     * Setzt das ensprechende Blatt in den Focus 
     * @param {type} pLeafId
     * @returns {undefined}
     */
    setFocus = function (pLeafId) {
        if (hasHeap() === -1)
            pLeafId = -1;
        else if (isLeafHeap(pLeafId, pLeafId) === -1 && treeFin)
            pLeafId = hasHeap();
        leafFocus = pLeafId;
        if (pLeafId === -1) {
            if (tree.size > 0) {
                drawInfoText("Heap Eigenschaft erreicht, Wurzel entfernen");
                pLeafId = 0;
            }
            isHeap = true;
        }
        else
            isHeap = false;

        var circles = d3.select("#g_circles").selectAll('circle').data(getVertices());
        circles.attr('style', function (d) {
            if (d.v === pLeafId) {
                drawFocusArea(pLeafId);
                return 'stroke:steelblue;stroke-width:4px;';
            }
            else
                return '';
        });
    };
    /*
     * Gibt die Positionen der einzelenen Kreise zurück die angezeigt werden sollen
     * für den Baum
     * @returns {Array}
     */
    getVertices = function () {
        var v = [];
        function getVert(t, f) {
            v.push({v: t.v, v2: t.v2, l: t.l, p: t.p, f: f});
            t.c.forEach(function (d) {
                return getVert(d, {v: t.v, v2: t.v2, p: t.p});
            });
        }

        getVert(tree.vis, {});
        return v.sort(function (a, b) {
            return a.v2 - b.v2;
        });
    };
    /*
     * Gibt die Positionen der Verbindungslinien zurück 
     * die angezeigt werden sollen für den Baum
     * @returns {Array}
     */
    getEdges = function () {
        var e = [];
        function getEd(t) {
            t.c.forEach(function (d) {
                e.push({v1: t.v, l1: t.l, p1: t.p, v2: d.v, l2: d.l, p2: d.p});
            });
            t.c.forEach(getEd);
        }
        getEd(tree.vis);
        return e.sort(function (a, b) {
            return a.v2 - b.v2;
        });
    };
    /*
     * Gibt die Positionen der Verbindungslinien 
     * für den Focusierten Bereich zurück 
     * @param {type} pLeafId
     * @returns {heapsortTree.getFocusArea.e2|Array}
     */
    getFocusArea = function (pLeafId) {
        var e = [];
        function getEd(t) {
            t.c.forEach(function (d) {
                if (t.v === pLeafId)
                    e.push({v1: t.v, l1: t.l, p1: t.p, v2: d.v, l2: d.l, p2: d.p});
            });
            t.c.forEach(getEd);
        }
        getEd(tree.vis);
        var e2 = [];
        if (e.length === 0)
            return e2;
        var lLeft = e[0];
        var lRight = e[0];
        if (e.length > 1)
            lRight = e[1];
        var lSpeas = 25;
        e2.push({p1: {x: lLeft.p2.x - lSpeas, y: lLeft.p2.y + lSpeas}, p2: {x: lRight.p2.x + lSpeas, y: lRight.p2.y + lSpeas}});
        e2.push({p1: {x: lRight.p2.x + lSpeas, y: lRight.p2.y + lSpeas}, p2: {x: lRight.p2.x + lSpeas, y: lRight.p1.y - lSpeas}});
        e2.push({p1: {x: lRight.p2.x + lSpeas, y: lRight.p1.y - lSpeas}, p2: {x: lLeft.p2.x - lSpeas, y: lLeft.p1.y - lSpeas}});
        e2.push({p1: {x: lLeft.p2.x - lSpeas, y: lLeft.p1.y - lSpeas}, p2: {x: lLeft.p2.x - lSpeas, y: lLeft.p2.y + lSpeas}});
        return e2;
    };
    /*
     * Gibt die Positionen der einzelenen Kreise zurück die angezeigt werden sollen
     * für das Start Array und das End Array
     */
    getPosition = function (pStart) {
        var lSteep = svgW / startHeapArray.length;
        var lPositions = [];

        if (pStart) {
            for (var i = 0; i < startHeapArray.length; i++) {
                lPositions.push({v: i, l: startHeapArray[i], up: 1, p: {x: lSteep * i + 30, y: 20}, p2: {x: lSteep * i + 30, y: 20}});
            }
        }
        else {
            for (var i = 0; i < endHeapArray.length; i++) {
                lPositions.push({v: i, l: endHeapArray[i], up: 0, p: {x: lSteep * i + 30, y: 20}, p2: {x: lSteep * i + 30, y: 20}});
            }
        }
        return lPositions;
    };
    /*
     * Zeichnet den Baum neu ohne Animation
     * @returns {undefined}
     */
    drawTree = function () {
        //Löscht die alten Elemente
        d3.select("#g_lines").remove();
        d3.select("#g_circles").remove();
        d3.select("#g_labels").remove();
        //Lines für die verbindungen
        d3.select("#treesvg").append('g').attr('id', 'g_lines').selectAll('line').data(getEdges()).enter().append('line')
                .attr('x1', function (d) {
                    return d.p1.x;
                })
                .attr('y1', function (d) {
                    return d.p1.y;
                })
                .attr('x2', function (d) {
                    return d.p2.x;
                })
                .attr('y2', function (d) {
                    return d.p2.y;
                });
        //Kreise für die Blätter
        d3.select("#treesvg").append('g').attr('id', 'g_circles').selectAll('circle').data(getVertices()).enter().append('circle')
                .attr('cx', function (d) {
                    return d.p.x;
                })
                .attr('cy', function (d) {
                    return d.p.y;
                })
                .attr('r', vRad)
                .on('click', function (d) {
                    return clickLeaf(d.v);
                });
        //Nummerierung der Kreise	
        d3.select("#treesvg").append('g').attr('id', 'g_labels').selectAll('text').data(getVertices()).enter().append('text')
                .attr('x', function (d) {
                    return d.p.x;
                })
                .attr('y', function (d) {
                    return d.p.y + 5;
                })
                .text(function (d) {
                    return d.l;
                })
                .on('click', function (d) {
                    return clickLeaf(d.v);
                });
    };
    /*
     * Zeichnet den Baum mitrtels Animation um 
     * @returns {undefined}
     */
    redrawTree = function () {
        //Verbindungsstriche des Baums
        var edges = d3.select("#g_lines").selectAll('line').data(getEdges());
        edges.transition().duration(500)
                .attr('x1', function (d) {
                    return d.p1.x;
                })
                .attr('y1', function (d) {
                    return d.p1.y;
                })
                .attr('x2', function (d) {
                    return d.p2.x;
                })
                .attr('y2', function (d) {
                    return d.p2.y;
                });
        edges.enter().append('line')
                .attr('x1', function (d) {
                    return d.p1.x;
                })
                .attr('y1', function (d) {
                    return d.p1.y;
                })
                .attr('x2', function (d) {
                    return d.p1.x;
                })
                .attr('y2', function (d) {
                    return d.p1.y;
                })
                .transition().duration(500)
                .attr('x2', function (d) {
                    return d.p2.x;
                })
                .attr('y2', function (d) {
                    return d.p2.y;
                });
        //Variablen Kreise des Baums
        var circles = d3.select("#g_circles").selectAll('circle').data(getVertices());
        circles.transition().duration(500)
                .attr('cx', function (d) {
                    return d.p.x;
                })
                .attr('cy', function (d) {
                    return d.p.y;
                });
        circles.enter().append('circle')
                .attr('cx', function (d) {
                    return d.f.p.x;
                })
                .attr('cy', function (d) {
                    return d.f.p.y;
                })
                .attr('r', vRad)
                .on('click', function (d) {
                    return clickLeaf(d.v);
                })
                .transition().duration(500)
                .attr('cx', function (d) {
                    return d.p.x;
                })
                .attr('cy', function (d) {
                    return d.p.y;
                });
        //Variablen Texte der Kreise des Baums      
        var labels = d3.select("#g_labels").selectAll('text').data(getVertices());
        labels.transition().duration(500)
                .text(function (d) {
                    return d.l;
                })
                .attr('x', function (d) {
                    return d.p.x;
                })
                .attr('y', function (d) {
                    return d.p.y + 5;
                });
        labels.enter().append('text')
                .attr('x', function (d) {
                    return d.f.p.x;
                })
                .attr('y', function (d) {
                    return d.f.p.y + 5;
                })
                .text(function (d) {
                    return d.l;
                })
                .on('click', function (d) {
                    return clickLeaf(d.v);
                })
                .transition().duration(500)
                .attr('x', function (d) {
                    return d.p.x;
                })
                .attr('y', function (d) {
                    return d.p.y + 5;
                });
    };
    /*
     * Zeichnet den Fokussierten Bereich der zurzeit relevant ist
     * @param {type} pLeafId
     * @returns {undefined}
     */
    drawFocusArea = function (pLeafId) {
        //Fokussierter Bereich mittels Linien
        d3.select("#g_linesArea").remove();
        if (treeFin) {
            d3.select("#treesvg").append('g').attr('id', 'g_linesArea').selectAll('line').data(getFocusArea(pLeafId)).enter().append('line')
                    .attr('style', 'stroke:steelblue; stroke-width:3px')
                    .attr('stroke-dasharray', '3,3')
                    .attr('x1', function (d) {
                        return d.p1.x;
                    })
                    .attr('y1', function (d) {
                        return d.p1.y;
                    })
                    .attr('x2', function (d) {
                        return d.p2.x;
                    })
                    .attr('y2', function (d) {
                        return d.p2.y;
                    });
        }
    };
    /*
     * Zeichnet die Info Ausgabe in den Baum Bereich
     * @param {type} pText
     * @returns {undefined}
     */
    drawInfoText = function (pText) {
        d3.select("#g_labelInfo").remove();
        d3.select("#treesvg").append('g').attr('id', 'g_labelInfo').append('text')
                .attr('x', 20)
                .attr('y', 300)
                .text(pText);
    };
    /*
     * Zeichnet das Start Array welches zum Sortieren genutzt wird
     * @returns {undefined}
     */
    drawStartArrayDiv = function () {
        var SortDiv = d3.select("#startArraydiv");
        //Löscht die alten Elemente      
        SortDiv.select("#startArraySvg").select("#g_circles2").remove();
        SortDiv.select("#startArraySvg").select("#g_labels2").remove();

        //Kreise
        SortDiv.select("#startArraySvg").append('g').attr('id', 'g_circles2').selectAll('circle').data(getPosition(true)).enter().append('circle')
                .attr('cx', function (d) {
                    return d.p.x;
                })
                .attr('cy', function (d) {
                    return d.p.y;
                })
                .attr('r', vRad);

        //Nummerierung der Kreise	
        SortDiv.select("#startArraySvg").append('g').attr('id', 'g_labels2').selectAll('text').data(getPosition(true)).enter().append('text')
                .attr('x', function (d) {
                    return d.p.x;
                })
                .attr('y', function (d) {
                    return d.p.y + 5;
                })
                .text(function (d) {
                    return d.l;
                });
    };
    /*
     * Zeichnet das Ergebnis Array welches beim Sortieren entsteht
     * @returns {undefined}
     */
    drawEndArrayDiv = function () {
        var SortDiv = d3.select("#endArraydiv");
        //Löscht die alten Elemente      
        SortDiv.select("#endArraySvg").select("#g_circles2").remove();
        SortDiv.select("#endArraySvg").select("#g_labels2").remove();

        //Kreise
        SortDiv.select("#endArraySvg").append('g').attr('id', 'g_circles2').selectAll('circle').data(getPosition(false)).enter().append('circle')
                .attr('cx', function (d) {
                    return d.p.x;
                })
                .attr('cy', function (d) {
                    return d.p.y;
                })
                .attr('r', vRad);

        //Nummerierung der Kreise	
        SortDiv.select("#endArraySvg").append('g').attr('id', 'g_labels2').selectAll('text').data(getPosition(false)).enter().append('text')
                .attr('x', function (d) {
                    return d.p.x;
                })
                .attr('y', function (d) {
                    return d.p.y + 5;
                })
                .text(function (d) {
                    if (d.l !== -1)
                        return d.l;
                    else
                        return "";
                });
    };
    /*
     * Initialisiert die entsprechenden Bereiche der Ausgaben und Eingabe möglichkeiten der Buttons
     */
    initHeapSort = function () {
        //Start Array Anzeige 
        d3.select(target).append("div").attr('id', 'startArraydiv').append("svg").attr("width", svgW + 10).attr("height", 40).attr('id', 'startArraySvg');

        //Baum
        d3.select(target).append("svg").attr("width", svgW + 10).attr("height", svgH).attr('id', 'treesvg');

        //End Array Anzeige 
        d3.select(target).append("div").attr('id', 'endArraydiv').append("svg").attr("width", svgW + 10).attr("height", 40).attr('id', 'endArraySvg');


        //Button
        d3.select(target).append("div").attr('id', 'buttondiv');

        d3.select("#buttondiv").append("button").attr('type', 'button').attr('class', 'button orange').attr('style', 'width:250px').text('Neuer Versuch')
                .on('click', function (d) {
                    return initTree();
                });
        d3.select("#buttondiv").append("button").attr('type', 'button').attr('class', 'button orange').attr('style', 'width:250px; float:right').text('Baum Erstellen')
                .on('click', function (d) {
                    return finAutoTree();
                });
        d3.select("#buttondiv").append("button").attr('type', 'button').attr('class', 'button orange').attr('style', 'width:250px;  margin-top: 10px;').text('Heap Lösen')
                .on('click', function (d) {
                    return finAutoHeap();
                });
        d3.select("#buttondiv").append("button").attr('type', 'button').attr('class', 'button orange').attr('style', 'width:250px;  margin-top: 10px; float:right').text('Baum Lösen')
                .on('click', function (d) {
                    return finAutoFullTree();
                });

        initTree();
    };
    initHeapSort();
    return this;
}