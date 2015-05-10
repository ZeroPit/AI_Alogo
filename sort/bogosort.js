function Bogosort() {
    var _Actions, _Array, n;
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        n = _Array.length;
        start();
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
    function shuffle() {
        var i = _Array.length, j, t;
        while (--i > 0) {
            j = (2*(Math.random() * (i + 1)))>>1;
            t = _Array[j];
            _Array[j] = _Array[i];
            _Array[i] = t;
            _Actions.push({type: "swap", i: i, j: j});
        }
        return _Array;
    }
    function inOrder() {
        for (var i = 1; i < _Array.length; i++) {
            _Actions.push({type: "traverse", "traverse": i});
            if (_Array[i] < _Array[i - 1]) {
                return false;
            }
        }
        return true;
    }
    function start() {
        var tries = 0;
        while (!inOrder()) {
            if (tries > 100)
                return;
            tries++;
            shuffle();
        }
    }
    return this;
}