function SelectionSort() {
    var _Actions, _Array;
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        selectionsort();
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
    function swap(i, j) {
        var t = _Array[i];
        _Array[i] = _Array[j];
        _Array[j] = t;
        _Actions.push({type: "swap", i: i, j: j});
    }
    function selectionsort() {
        var i = 0, j = 0;
        for (i = 0; i < _Array.length - 1; i++) {
            for (j = i + 1; j < _Array.length; j++) {
                if (_Array[i] > _Array[j]) {
                    swap(i, j);
                }
            }
        }
    }
    return this;
}