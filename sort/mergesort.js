function MergeSorter() {
    var _Actions, _ArrayA, _ArrayB;
    this.sortAll = function (array) {
        _Actions = [];
        _ArrayA = array.slice();
        _ArrayB = array.slice();
        mergesort(0, _ArrayA.length - 1);
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };

    function mergesort(lo, hi) {
        if (lo < hi) {
            var m = ~~((lo + hi) / 2);
            if (m >= 1) {
                mergesort(lo, m);
                mergesort(m + 1, hi);
            }
            var lArrayOld = _ArrayA.slice();
            merge(lo, m, hi);
            var lArrayNew = _ArrayA.slice();
            findChanges(lArrayOld, lArrayNew);
        }
    }
    // einfache Merge-Variante a
    function merge(lo, m, hi) {
        var i, j, k;
        // beide H�lften von a in Hilfsarray b kopieren
        for (i = lo; i <= hi; i++)
            _ArrayB[i] = _ArrayA[i];

        i = lo;
        j = m + 1;
        k = lo;
        // jeweils das n�chstgr��te Element zur�ckkopieren
        while (i <= m && j <= hi) {
            if (_ArrayB[i] <= _ArrayB[j])
                _ArrayA[k++] = _ArrayB[i++];
            else
                _ArrayA[k++] = _ArrayB[j++];
        }
        // Rest der vorderen H�lfte falls vorhanden zur�ckkopieren
        while (i <= m)
            _ArrayA[k++] = _ArrayB[i++];
    }
    function findChanges(arrayOld, arrayNew) {
        for (var i = 0; i < arrayNew.length; i++) {
            for (var j = 0; j < arrayOld.length; j++) {
                if (arrayNew[i] === arrayOld[j]) {
                    if (i !== j) {
                        var t = arrayOld[i];
                        arrayOld[i] = arrayOld[j];
                        arrayOld[j] = t;
                        _Actions.push({type: "swap", i: i, j: j});
                    }
                    break;
                }
            }
        }
    }
    return this;
}    