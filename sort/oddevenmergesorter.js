function OddEvenMergeSorter() {
    var _Actions, _Array;
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        oddEvenMergeSort(0, _Array.length);
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
    function swap(i, j) {
        var t = _Array[i];
        _Array[i] = _Array[j];
        _Array[j] = t;
        _Actions.push({type: "swap", i: i, j: j});
    }
    function oddEvenMergeSort(lo, n) {
        if (n > 1) {
            var m = n >>1 ;
            oddEvenMergeSort(lo, m);
            oddEvenMergeSort(lo + m, m);
            oddEvenMerge(lo, n, 1);
        }
    }

    function oddEvenMerge(lo, n, r) {
        var m = r * 2;
        if (m < n) {
            oddEvenMerge(lo, n, m);      // gerade Teilfolge
            oddEvenMerge(lo + r, n, m);    // ungerade Teilfolge
            for (var i = lo + r; i + r < lo + n; i += m) {
                if (_Array[i] > _Array[i + r])
                    swap(i, i + r);
            }
        }
        else {
            if (_Array[lo] > _Array[lo + r])
                swap(lo, lo + r);
        }
    }

    return this;
}    