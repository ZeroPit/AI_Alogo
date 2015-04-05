function BitonicSorter() {
    var _Actions, _Array, ASCENDING = true, DESCENDING = false;
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        bitonicSort(0, _Array.length, ASCENDING);
        _Actions.push({type: "done", "done": 0});
        console.log(_Array)
        return _Actions;
    };
    function swap(i, j) {
        var t = _Array[i];
        _Array[i] = _Array[j];
        _Array[j] = t;
        _Actions.push({type: "swap", i: i, j: j});
    }
    function bitonicSort(lo, n, dir) {
        if (n > 1) {
            var m = ~~(n / 2);
            bitonicSort(lo, m, !dir);
            bitonicSort(lo + m, n - m, dir);
            bitonicMerge(lo, n, dir);
        }
    }
    function bitonicMerge(lo, n, dir) {
        if (n > 1) {
            var m = ~~(n / 2);
            for (var i = lo; i < lo + n-m; i++)
                compare(i, i + m, dir);
            bitonicMerge(lo, m, dir);
            bitonicMerge(lo + m, n - m, dir);
        }
    }
    function compare(i, j, dir) {
        if (dir === (_Array[i] > _Array[j]))
            swap(i, j);
    }
    return this;
}