function Quicksort() {
    var _Actions, _Array;
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        recurse(0, _Array.length - 1);
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
    function swap(i, j) {
        var t = _Array[i];
        _Array[i] = _Array[j];
        _Array[j] = t;
        _Actions.push({type: "swap", i: i, j: j});
    }
    function recurse(left, right) {
        var i = left, j = right;
        // Vergleichs�element x           
        var x = _Array[ (left + right)>> 1 ];
        _Actions.push({type: "partition", pivot: x});
        //  Aufteilung
        while (i <= j) {
            while (_Array[i] < x)
                i++;
            while (_Array[j] > x)
                j--;
            if (i <= j)
                swap(i++, j--);
        }
        // Rekursion
        if (left < j)
            recurse(left, j);
        if (i < right)
            recurse(i, right);
    }
    return this;
}