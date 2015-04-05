function InsertionSort() {
    var _Actions, _Array;
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        insertionsort();
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
    function swap(i, j) {
        var t = _Array[i];
        _Array[i] = _Array[j];
        _Array[j] = t;
        _Actions.push({type: "swap", i: i, j: j});
    }
    function insertionsort() {
        var i, j;
        for (i = 1; i < _Array.length; i++) {
            _Actions.push({type: "traverse", "traverse": i});
            j = i;
            while (j > 0 && _Array[j - 1] > _Array[j]) {
                swap(j, j - 1);
                j--;
            }
        }
    }
    return this;
}