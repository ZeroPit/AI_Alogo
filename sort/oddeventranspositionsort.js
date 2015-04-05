function OddEvenTranspositionSort() {
    var _Actions, _Array;
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        sort();
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
    function swap(i, j) {
        var t = _Array[i];
        _Array[i] = _Array[j];
        _Array[j] = t;
        _Actions.push({type: "swap", i: i, j: j});
    }
    function sort() {
        var sorted = false;
        while (!sorted) {
            sorted = true;
            for (var i = 1; i < _Array.length - 1; i += 2) {
                if (_Array[i] > _Array[i + 1]) {
                    swap(i, i + 1);
                    sorted = false;
                }
            }
            for (var i = 0; i < _Array.length - 1; i += 2) {
                if (_Array[i] > _Array[i + 1]) {
                    swap(i, i + 1);
                    sorted = false;
                }
            }
        }
    }
    return this;
}