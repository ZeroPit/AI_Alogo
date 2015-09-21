function ShellSort() {
    var _Actions, _Array;
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        shellsort();
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
    function swap(i, j) {
        var t = _Array[i];
        _Array[i] = _Array[j];
        _Array[j] = t;
        _Actions.push({type: "swap", i: i, j: j});
    }
    function shellsort() {
        var i, j;
        var m = (_Array.length)>>1 ;
        while (m > 0) {
            for (i = m; i < _Array.length; i++) {              
                j = i;
                while (j >= m && _Array[j - m] > _Array[j]) {
                    swap(j, j - m);
                    j = j - m;
                }
            }
            m = ~~(m / 2);
        }
    }
    return this;
}