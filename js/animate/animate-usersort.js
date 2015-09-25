/* 
    Dateiname  : animate-usersort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny Lüttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/


function UserSorting(sortingfunction, target) {
    this.SortingFunction = sortingfunction;
    this.Target = target;

    var svgW = 598, svgH = 100, vRad = 18;


    var maxArray = 8;
    var _SteepFin = false;
    this.SortInfo = {
        "Array": [],
        "ArrayUp": [],
        "Left": -1,
        "Right": -1,
        "UpLeft": -1,
        "UpRight": -1,
        "click": -1,
        "Mode": 0,
        "Update": true
    };
    var _Steep;

    this.startNew = function () {
        this.createNewArray();
        _SteepFin = false;
        this.SortInfo.Left = this.SortingFunction.LeftStart;
        this.SortInfo.Right = this.SortingFunction.RightStart;
        this.SortInfo.click = -1;
        this.SortInfo.UpLeft = -1;
        this.SortInfo.UpRight = -1;
        this.SortInfo.Mode = 0;
        this.SortInfo.Update = true;
        _Steep = 0;
        updateAll(this);
    };
    this.createNewArray = function ()
    {
        this.SortInfo.Array = [];
        this.SortInfo.ArrayUp = [];
        var lMax = Math.floor((Math.random() * (maxArray - 4)) + 5);
        for (var i = 0; i < lMax; i++) {
            this.SortInfo.Array.push(Math.floor((Math.random() * lMax) + 1));
            this.SortInfo.ArrayUp.push(-1);
        }

    };

    this.clickArray = function (Id) {
        this.SortInfo.click = Id;
        this.SortInfo = this.SortingFunction.onClick(this.SortInfo, true);
        if (this.SortInfo.Update)
            updateAll(this);
        else
            redraw(this);
    };
    this.clickArrayUp = function (Id) {
        this.SortInfo.click = Id;
        this.SortInfo = this.SortingFunction.onClick(this.SortInfo, false);
        if (this.SortInfo.Update)
            updateAll(this);
        else
            redraw(this);
    };


    this.getPosition = function (all) {

        var lArray = this.SortInfo.Array;
        var lSteep = svgW / lArray.length;
        var lPositions = [];
        for (var i = 0; i < lArray.length; i++) {
            if (lArray[i] !== -1 || all)
                lPositions.push({v: i, l: lArray[i], up: 0, p: {x: lSteep * i + 30, y: 60}, p2: {x: lSteep * i + 30, y: 60}});
        }
        lArray = this.SortInfo.ArrayUp;
        for (var i = 0; i < lArray.length; i++) {
            if (lArray[i] !== -1)
                lPositions.push({v: i, l: lArray[i], up: 1, p: {x: lSteep * i + 30, y: 20}, p2: {x: lSteep * i + 30, y: 20}});
        }

        return lPositions;
    };

    updateAll = function (pThis)
    {
        var SortDiv = d3.select("#usersort" + pThis.Target);
        SortDiv.select("#info").select('p').text(pThis.SortingFunction.updateMode(pThis.SortInfo.Mode));
        //Löscht die alten Elemente      
        SortDiv.select("#sortsvg").select("#g_circles").remove();
        SortDiv.select("#sortsvg").select("#g_labels").remove();

        //Kreise
        SortDiv.select("#sortsvg").append('g').attr('id', 'g_circles').selectAll('circle').data(pThis.getPosition(true)).enter().append('circle').attr('cx', function (d) {
            return d.p.x;
        }).attr('cy', function (d) {
            return d.p.y;
        }).attr('r', vRad)
                .on('click', function (d) {
            if (d.up === 0)
                return pThis.clickArray(d.v);
            else
                return pThis.clickArrayUp(d.v);
        }).attr('style', function (d) {

            if (d.v === pThis.SortInfo.Left && pThis.SortInfo.Left >= 0 && d.up === 0)
                return 'stroke:green;stroke-width:4px;';
            else if (d.v === pThis.SortInfo.Right && pThis.SortInfo.Right >= 0 && d.up === 0)
                return 'stroke:red;stroke-width:4px;';
            else if (d.v === pThis.SortInfo.UpLeft && pThis.SortInfo.UpLeft >= 0 && d.up === 1)
                return 'stroke:green;stroke-width:4px;';
            else if (d.v === pThis.SortInfo.UpRight && pThis.SortInfo.UpRight >= 0 && d.up === 1)
                return 'stroke:red;stroke-width:4px;';
            else
                return 'steelblue;stroke-width:2px;';

        });

        //Nummerierung der Kreise	
        SortDiv.select("#sortsvg").append('g').attr('id', 'g_labels').selectAll('text').data(pThis.getPosition(false)).enter().append('text').attr('x', function (d) {
            return d.p.x;
        }).attr('y', function (d) {
            return d.p.y + 5;
        }).text(function (d) {
            return d.l;
        }).on('click', function (d) {
            if (d.up === 0)
                return pThis.clickArray(d.v);
            else
                return pThis.clickArrayUp(d.v);
        });
    };
    redraw = function (pThis) {
        var SortDiv = d3.select("#usersort" + pThis.Target);
        var circles = SortDiv.select("#sortsvg").select("#g_circles").selectAll('circle').data(pThis.getPosition(true));

        circles.transition().duration(500).attr('cx', function (d) {
            return d.p.x;
        }).attr('cy', function (d) {
            return d.p.y;
        }).attr('style', function (d) {

            if (d.v === pThis.SortInfo.Left && pThis.SortInfo.Left >= 0 && d.up === 0)
                return 'stroke:green;stroke-width:4px;';
            else if (d.v === pThis.SortInfo.Right && pThis.SortInfo.Right >= 0 && d.up === 0)
                return 'stroke:red;stroke-width:4px;';
            else if (d.v === pThis.SortInfo.UpLeft && pThis.SortInfo.UpLeft >= 0 && d.up === 1)
                return 'stroke:green;stroke-width:4px;';
            else if (d.v === pThis.SortInfo.UpRight && pThis.SortInfo.UpRight >= 0 && d.up === 1)
                return 'stroke:red;stroke-width:4px;';
            else
                return 'steelblue;stroke-width:2px;';

        });

        circles.enter().append('circle').attr('cx', function (d) {
            return d.p2.x;
        }).attr('cy', function (d) {
            return d.p2.y;
        }).attr('r', vRad).on('click', function (d) {
            if (d.up === 0)
                return pThis.clickArray(d.v);
            else
                return pThis.clickArrayUp(d.v);
        }).transition().duration(500).attr('cx', function (d) {
            return d.p.x;
        }).attr('cy', function (d) {
            return d.p.y;
        }).attr('style', function (d) {

            if (d.v === pThis.SortInfo.Left && pThis.SortInfo.Left >= 0 && d.up === 0)
                return 'stroke:green;stroke-width:4px;';
            else if (d.v === pThis.SortInfo.Right && pThis.SortInfo.Right >= 0 && d.up === 0)
                return 'stroke:red;stroke-width:4px;';
            else if (d.v === pThis.SortInfo.UpLeft && pThis.SortInfo.UpLeft >= 0 && d.up === 1)
                return 'stroke:green;stroke-width:4px;';
            else if (d.v === pThis.SortInfo.UpRight && pThis.SortInfo.UpRight >= 0 && d.up === 1)
                return 'stroke:red;stroke-width:4px;';
            else
                return 'steelblue;stroke-width:2px;';

        });

        var labels = SortDiv.select("#sortsvg").select("#g_labels").selectAll('text').data(pThis.getPosition(false));
        labels.text(function (d) {
            return d.l;
        }).transition().duration(500).attr('x', function (d) {
            return d.p.x;
        }).attr('y', function (d) {
            return d.p.y + 5;
        });

        labels.enter().append('text').attr('x', function (d) {
            return d.p2.x;
        }).attr('y', function (d) {
            return d.p2.y + 5;
        }).text(function (d) {
            return d.l;
        }).on('click', function (d) {
            if (d.up === 0)
                return pThis.clickArray(d.v);
            else
                return pThis.clickArrayUp(d.v);
        }).transition().duration(500).attr('x', function (d) {
            return d.p.x;
        }).attr('y', function (d) {
            return d.p.y + 5;
        });
    };

    initialize = function (pThis) {
        d3.select("#" + pThis.Target).append("div").attr('id', 'usersort' + pThis.Target);

        d3.select("#usersort" + pThis.Target).append("svg").attr("width", svgW).attr("height", svgH).attr('id', 'sortsvg').attr('class', 'mybuttondiv');
        d3.select("#usersort" + pThis.Target).append("div").attr('id', 'info').append("p").attr('class', 'mybuttondiv');

        d3.select("#usersort" + pThis.Target).append("div").attr('id', 'buttondiv' + pThis.Target).attr('class', 'mybuttondiv');
        d3.select("#buttondiv" + pThis.Target).append("button").attr('type', 'button').attr('class', 'button orange').text('Neuer Versuch').on('click', function (d) {
            return pThis.startNew();
        });
        pThis.startNew();
    };
    initialize(this);
    return this;
}
