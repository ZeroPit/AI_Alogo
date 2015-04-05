
function UserSorting(sortingfunction, target) {
    var _SortingFunction = sortingfunction;
    var _Target = target;
  

    var svgW = 598, svgH = 100, vRad = 12;
    var cy = 40;
    var tree = {cx: svgW / 2, cy: 30, w: 60, h: 70};



    var maxArray = 8;
    var _Array = [];
    var _SteepFin = false;
    var _LeftFocus = 0;
    var _RightFocus = 0;

    startNew = function ()
    {
        createNewArray();
        _SteepFin = false;
        updateAll();
    };
    createNewArray = function () {
        _Array = [];
        var lMax = Math.floor((Math.random() * (maxArray - 4)) + 5);
        for (var i = 0; i < lMax; i++)
            _Array.push(Math.floor((Math.random() * lMax) + 1));
    };
    clickLeft = function (Id) {

    };
    clickRight = function (Id) {

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


    getPosition = function () {
        var lSteep = svgW / _Array.length;
        var lPositions = [];
        for (var i = 0; i < _Array.length; i++) {
            lPositions.push({v: i, l: _Array[i], p: {x: lSteep * i + 30, y: cy}});
        }
        return lPositions;
    };

    updateAll = function ()
    {      
        var SortDiv = d3.select("#usersort" + _Target);
        //Löscht die alten Elemente      
        SortDiv.select("#sortsvg").select("#g_circles").remove();
        SortDiv.select("#sortsvg").select("#g_labels").remove();

        //Kreise für die Blätter
        SortDiv.select("#sortsvg").append('g').attr('id', 'g_circles').selectAll('circle').data(getPosition()).enter().append('circle').attr('cx', function (d) {
            return d.p.x;
        }).attr('cy', function (d) {
            return d.p.y;
        }).attr('r', vRad).on('click', function (d) {
            return clickLeaf(d.v);
        });

        //Nummerierung der Kreise	
        SortDiv.select("#sortsvg").append('g').attr('id', 'g_labels').selectAll('text').data(getPosition()).enter().append('text').attr('x', function (d) {
            return d.p.x;
        }).attr('y', function (d) {
            return d.p.y + 5;
        }).text(function (d) {
            return d.l;
        }).on('click', function (d) {
            return clickLeaf(d.v);
        });
    };
    redraw = function () {

        var circles = d3.select("#g_circles").selectAll('circle').data(getPosition());

        circles.transition().duration(500).attr('cx', function (d) {
            return d.p.x;
        }).attr('cy', function (d) {
            return d.p.y;
        });

        circles.enter().append('circle').attr('cx', function (d) {
            return d.f.p.x;
        }).attr('cy', function (d) {
            return d.f.p.y;
        }).attr('r', vRad).on('click', function (d) {
            return clickLeaf(d.v);
        }).transition().duration(500).attr('cx', function (d) {
            return d.p.x;
        }).attr('cy', function (d) {
            return d.p.y;
        });

        var labels = d3.select("#g_labels").selectAll('text').data(getPosition());
        labels.text(function (d) {
            return d.l;
        }).transition().duration(500).attr('x', function (d) {
            return d.p.x;
        }).attr('y', function (d) {
            return d.p.y + 5;
        });

        labels.enter().append('text').attr('x', function (d) {
            return d.f.p.x;
        }).attr('y', function (d) {
            return d.f.p.y + 5;
        }).text(function (d) {
            return d.l;
        }).on('click', function (d) {
            return clickLeaf(d.v);
        }).transition().duration(500).attr('x', function (d) {
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
        d3.select("#" + _Target).append("div").attr('id', 'usersort' + _Target);
        d3.select("#usersort" + _Target).append("div").attr('id', 'arraydiv');
        d3.select("#usersort" + _Target).append("svg").attr("width", svgW).attr("height", svgH).attr('id', 'sortsvg');
        d3.select("#usersort" + _Target).append("div").attr('id', 'buttondiv'+ _Target);
        d3.select("#buttondiv"+ _Target).append("button").attr('id', 'button1'+ _Target).attr('type', 'button').attr('style', 'width:190px').text('Neuer Veruch').on('click', function (d) {
            return startNew(_Target);
        });
        d3.select("#buttondiv"+ _Target).append("button").attr('id', 'button2'+ _Target).attr('type', 'button').attr('style', 'width:190px; margin-left:15px').text('Hilfe').on('click', function (d) {
            return nextSteep(_Target);
        });
        startNew();
    };
    initialize();
    return this;
}
