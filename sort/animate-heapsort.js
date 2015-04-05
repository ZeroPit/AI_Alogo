
function heapsort() {
    var svgW = 598, svgH = 300, vRad = 12;
    var tree = {cx: svgW / 2, cy: 30, w: 60, h: 70};
    tree.vis = {v: 0, l: '?', p: {x: tree.cx, y: tree.cy}, c: []};
    tree.size = 1;

    var maxArray = 15;
    var heapArray = [];
    var treeFin = false;
    var leafFocus = 0;

    startNewAttempt = function ()
    {
        createNewArray();
        tree.vis = {v: 0, l: heapArray[0], p: {x: tree.cx, y: tree.cy}, c: []};
        tree.size = 1;
        treeFin = false;
        updateAll();
    };

    createTree = function () {
        if (treeFin)
            return;
        while (tree.size < heapArray.length) {
            addLeaf(getNextLeaf(-1));
        }
        ;
        treeFin = true;
    };
    finTree = function ()
    {
        leafFocus = 0;
        do {
            if (isLeafHeap(leafFocus, (leafFocus * 2) + 1) === 1) {
                changeLeaf(leafFocus, (leafFocus * 2) + 1);
            }
            else if (isLeafHeap(leafFocus, (leafFocus + 1) * 2) === 1) {
                changeLeaf(leafFocus, (leafFocus + 1) * 2);
            }
            leafFocus = hasHeap();
        } while (leafFocus >= 0);
        setFocus(0);
    };
    createNewArray = function () {
        heapArray = [];
        var lMax = Math.floor((Math.random() * (maxArray - 7)) + 8);
        for (var i = 0; i < lMax; i++)
            heapArray.push(Math.floor((Math.random() * lMax) + 1));
    };
    clickLeaf = function (leafId) {
        if (tree.size >= heapArray.length || treeFin)
        {
            if (leafFocus === leafId)
            {
                if (isLeafHeap(leafFocus, leafId) === 1) {
                    setFocus(leafFocus + 1);
                }
                else
                    alert("Heap ist nicht koreckt");
            }
            else
            {
                if (leafFocus === getNextLeaf(leafId)) {

                    if (isLeafHeap(leafFocus, leafId) === 1)
                    {
                        changeLeaf(leafFocus, leafId);
                        setFocus(leafFocus + 1);
                    }
                    else
                        alert("Heap ist nicht koreckt");
                }
            }
        }
        else
        {
            if (leafId !== getNextLeaf(-1))
            {
                treeFin = true;
                alert("Der Baum ist noch nicht fertig");
            }
            else
                addLeaf(leafId);
        }

    };
    startHeapSort = function (remove) {
        if (remove)
        {
            tree.vis.l = getLeaf(tree.size - 1);
            removeLeaf(tree.size - 1);
            if (tree.size === 0)
                alert("Fertig");
            else
                setFocus(0);
        }
        else
            setFocus(0);
    };
    hasHeap = function ()
    {
        var lReturn = -2;
        function heap(t) {
            if (lReturn !== -2)
                return;
            if (t.c.length === 0)
                return;
            if (t.c.length === 1)
            {
                if (t.l < t.c[0].l)
                {
                    lReturn = t.v;
                    return;
                }
            }
            if (t.c.length === 2)
            {
                if (t.l < t.c[0].l || t.l < t.c[1].l)
                {
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
    isLeafHeap = function (leafId1, leafId2)
    {
        var lReturn = -2;
        function isHeap(t) {
            if (t.v === leafId1)
            {
                if (lReturn !== -2)
                    return;
                if (t.c.length === 0)
                    return;
                if (t.v === leafId2)
                {
                    if (t.c.length === 1)
                    {
                        if (t.l < t.c[0].l)
                        {
                            lReturn = 0;
                            return;
                        }
                    }
                    if (t.c.length === 2)
                    {
                        if (t.l < t.c[0].l || t.l < t.c[1].l)
                        {
                            lReturn = 0;
                            return;
                        }
                    }
                    lReturn = 1;
                    return;
                }
                else
                {
                    if (t.c.length === 1)
                    {
                        if (t.c[0].v === leafId2 && t.l < t.c[0].l)
                        {
                            lReturn = 1;
                            return;
                        }
                    }
                    else
                    {
                        if (t.c[0].v === leafId2 && t.l < t.c[0].l && t.c[1].l <= t.c[0].l)
                        {
                            lReturn = 1;
                            return;
                        }
                        if (t.c[1].v === leafId2 && t.l < t.c[1].l && t.c[0].l <= t.c[1].l)
                        {
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
    setFocus = function (leafId) {
        if (hasHeap() === -1)
            leafId = -1;
        else if (isLeafHeap(leafId, leafId) === -1)
            leafId = hasHeap();
        leafFocus = leafId;
        var circles = d3.select("#g_circles").selectAll('circle').data(getVertices());
        circles.attr('style', function (d) {
            if (d.v === leafId)
                return 'stroke:red;stroke-width:4px;';
            else
                return 'steelblue;stroke-width:2px;';
        });
        if (leafId === -1)
            alert("Heap Vollstandig");
    };


    getVertices = function () {
        var v = [];
        function getVert(t, f) {
            v.push({v: t.v, l: t.l, p: t.p, f: f});
            t.c.forEach(function (d) {
                return getVert(d, {v: t.v, p: t.p});
            });
        }

        getVert(tree.vis, {});
        return v.sort(function (a, b) {
            return a.v - b.v;
        });
    };

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

    addLeaf = function (leafId) {
        function add(t) {
            if (t.v === leafId) {
                t.c.push({v: tree.size++, l: heapArray[tree.size - 1], p: {}, c: []});
                return;
            }
            t.c.forEach(add);
        }
        add(tree.vis);
        reposition(tree.vis);
        redraw();
        if (tree.size >= heapArray.length)
            startHeapSort(false);
    };
    getLeaf = function (leafId) {
        var lReturn = -1;
        function get(t) {
            if (lReturn !== -1)
                return;
            if (t.v === leafId) {
                lReturn = t.l;
                return;
            }
            t.c.forEach(get);
        }
        get(tree.vis);
        return lReturn;
    };
    removeLeaf = function (leafId) {
        var lReturn = -2;
        function remove(t) {
            if (lReturn !== -2)
                return;
            if (t.c.length === 0)
                return;
            if (t.c.length === 1)
            {
                if (t.c[0].v === leafId)
                {
                    t.c.splice(0, 1);
                    lReturn = 1;
                    return;
                }
            }
            if (t.c.length === 2)
            {
                if (t.c[0].v === leafId)
                {
                    t.c.splice(0, 1);
                    lReturn = 1;
                    return;
                }
                if (t.c[1].v === leafId)
                {
                    t.c.splice(1, 2);
                    lReturn = 1;
                    return;
                }
            }
            t.c.forEach(remove);
        }
        remove(tree.vis);
        if (lReturn === 1)
        {
            tree.size--;
            reposition(tree.vis);
            updateAll();
        }
        return lReturn;
    };
    changeLeaf = function (leafId1, leafId2) {

        function change(t) {
            if (t.v === leafId1) {
                var l = t.l;
                if (t.c[0].v === leafId2) {
                    t.l = t.c[0].l;
                    t.c[0].l = l;
                }
                else
                {
                    t.l = t.c[1].l;
                    t.c[1].l = l;
                }
                return;
            }
            t.c.forEach(change);
        }
        change(tree.vis);
        redraw();
    };
    getNextLeaf = function (leafId)
    {
        if (leafId > -1)
            return 	parseInt((leafId - 1) / 2, 10);
        else
            return 	parseInt((tree.size - 1) / 2, 10);
    };

    relabel = function (lbl) {
        function relbl(t) {
            t.l = lbl.lbl[t.v];
            t.c.forEach(relbl);
        }
        relbl(tree.vis);
    };
    updateAll = function ()
    {
        //Löscht die alten Elemente
        d3.select("#g_lines").remove();
        d3.select("#g_circles").remove();
        d3.select("#g_labels").remove();

        //Lines für die verbindungen
        d3.select("#treesvg").append('g').attr('id', 'g_lines').selectAll('line').data(getEdges()).enter().append('line')
                .attr('x1', function (d) {
                    return d.p1.x;
                }).attr('y1', function (d) {
            return d.p1.y;
        })
                .attr('x2', function (d) {
                    return d.p2.x;
                }).attr('y2', function (d) {
            return d.p2.y;
        });
        //Kreise für die Blätter
        d3.select("#treesvg").append('g').attr('id', 'g_circles').selectAll('circle').data(getVertices()).enter()
                .append('circle').attr('cx', function (d) {
            return d.p.x;
        }).attr('cy', function (d) {
            return d.p.y;
        }).attr('r', vRad)
                .on('click', function (d) {
                    return clickLeaf(d.v);
                });
        //Nummerierung der Kreise	
        d3.select("#treesvg").append('g').attr('id', 'g_labels').selectAll('text').data(getVertices()).enter().append('text')
                .attr('x', function (d) {
                    return d.p.x;
                }).attr('y', function (d) {
            return d.p.y + 5;
        }).text(function (d) {
            return d.l;
        })
                .on('click', function (d) {
                    return clickLeaf(d.v);
                });
    };
    redraw = function () {
        var edges = d3.select("#g_lines").selectAll('line').data(getEdges());

        edges.transition().duration(500)
                .attr('x1', function (d) {
                    return d.p1.x;
                }).attr('y1', function (d) {
            return d.p1.y;
        })
                .attr('x2', function (d) {
                    return d.p2.x;
                }).attr('y2', function (d) {
            return d.p2.y;
        });

        edges.enter().append('line')
                .attr('x1', function (d) {
                    return d.p1.x;
                }).attr('y1', function (d) {
            return d.p1.y;
        })
                .attr('x2', function (d) {
                    return d.p1.x;
                }).attr('y2', function (d) {
            return d.p1.y;
        })
                .transition().duration(500)
                .attr('x2', function (d) {
                    return d.p2.x;
                }).attr('y2', function (d) {
            return d.p2.y;
        });

        var circles = d3.select("#g_circles").selectAll('circle').data(getVertices());

        circles.transition().duration(500).attr('cx', function (d) {
            return d.p.x;
        }).attr('cy', function (d) {
            return d.p.y;
        });

        circles.enter().append('circle').attr('cx', function (d) {
            return d.f.p.x;
        }).attr('cy', function (d) {
            return d.f.p.y;
        }).attr('r', vRad)
                .on('click', function (d) {
                    return clickLeaf(d.v);
                })
                .transition().duration(500).attr('cx', function (d) {
            return d.p.x;
        }).attr('cy', function (d) {
            return d.p.y;
        });

        var labels = d3.select("#g_labels").selectAll('text').data(getVertices());

        labels.text(function (d) {
            return d.l;
        }).transition().duration(500)
                .attr('x', function (d) {
                    return d.p.x;
                }).attr('y', function (d) {
            return d.p.y + 5;
        });

        labels.enter().append('text').attr('x', function (d) {
            return d.f.p.x;
        }).attr('y', function (d) {
            return d.f.p.y + 5;
        })
                .text(function (d) {
                    return d.l;
                }).on('click', function (d) {
            return clickLeaf(d.v);
        })
                .transition().duration(500)
                .attr('x', function (d) {
                    return d.p.x;
                }).attr('y', function (d) {
            return d.p.y + 5;
        });
    };

    getLeafCount = function (_) {
        if (_.c.length === 0)
            return 1;
        else
            return _.c.map(getLeafCount).reduce(function (a, b) {
                return a + b;
            });
    };

    reposition = function (v) {
        var lC = getLeafCount(v), left = v.p.x - tree.w * (lC - 1) / 2;
        v.c.forEach(function (d) {
            var w = tree.w * getLeafCount(d);
            left += w;
            d.p = {x: left - (w + tree.w) / 2, y: v.p.y + tree.h};
            reposition(d);
        });
    };

    initialize = function () {
        //HeapSort
        d3.select("body").append("div").attr('id', 'heapsort');
        //Array Anzeige
        d3.select("#heapsort").append("div").attr('id', 'arraydiv');
        //Baum
        d3.select("#heapsort").append("svg").attr("width", svgW).attr("height", svgH).attr('id', 'treesvg');
        startNewAttempt();
        //Button
        d3.select("#heapsort").append("div").attr('id', 'buttondiv');
        d3.select("#buttondiv").append("button").attr('type', 'button').attr('style', 'width:190px').text('Neuer Veruch')
                .on('click', function (d) {
                    return startNewAttempt();
                });
        d3.select("#buttondiv").append("button").attr('type', 'button').attr('style', 'width:190px; margin-left:15px').text('Baum Erstellen')
                .on('click', function (d) {
                    return createTree();
                });
        d3.select("#buttondiv").append("button").attr('type', 'button').attr('style', 'width:190px; margin-left:15px').text('Baum Lösen')
                .on('click', function (d) {
                    return finTree();
                });
        d3.select("#buttondiv").append("button").attr('type', 'button').attr('style', 'width:190px; margin-left:15px').text('Nächster Schritt')
                .on('click', function (d) {
                    return startHeapSort(true);
                });
    };
    initialize();

    return this;
}
var heapsort = heapsort();
