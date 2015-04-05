function BubbleSort() {
    var _Actions, _Array;
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        bubblesort();
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
    function swap(i, j) {
        var t = _Array[i];
        _Array[i] = _Array[j];
        _Array[j] = t;
        _Actions.push({type: "swap", i: i, j: j});
    }
    function bubblesort() {
        var swapped = true;
        var i = 0;
        while (swapped) {
            swapped = false;
            for (i = 0; i < _Array.length - 1; i++) {
                if (_Array[i] > _Array[i + 1]) {
                    swap(i, i + 1);
                    swapped = true;
                }
            }
        }
    }
    return this;
}