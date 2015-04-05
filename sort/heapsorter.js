function Heapsort() {
    var _Actions, _Array, n;
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        n = _Array.length;
        start();
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
    function swap(i, j) {
        var t = _Array[i];
        _Array[i] = _Array[j];
        _Array[j] = t;
        _Actions.push({type: "swap", i: i, j: j});
    }
    function start() {
        buildheap();
        while (n > 1) {
            n--;
            swap(0, n);
            downheap(0);
        }
    }
    function buildheap() {
        for (var v = ~~(n / 2) - 1; v >= 0; v--) {
            _Actions.push({type: "traverse", "traverse": v});
            downheap(v);
        }
    }
    function downheap(v) {
        var w = 2 * v + 1;         // erster Nachfolger von v
        while (w < n) {
            if (w + 1 < n)       // gibt es einen zweiten Nachfolger?
                if (_Array[w + 1] > _Array[w])
                    w++;
            // w ist der Nachfolger von v mit maximaler Markierung
            if (_Array[v] >= _Array[w])
                return;  // v hat die Heap-Eigenschaft
            // sonst
            swap(v, w);  // vertausche Markierungen von v und w
            v = w;             // fahre mit v=w fort
            w = 2 * v + 1;
        }
    }
    return this;
}