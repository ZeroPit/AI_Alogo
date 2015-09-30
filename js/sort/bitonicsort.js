/* 
    Dateiname  : bitonicsort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny Lüttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

function BitonicSorter() {
    var _Actions, _Array, ASCENDING = true, DESCENDING = false;
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        bitonicSort(0, _Array.length, ASCENDING);
        _Actions.push({type: "done", "done": 0});
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
            var m = n >>1 ;
            bitonicSort(lo, m, !dir);
            bitonicSort(lo + m, n - m, dir);
            bitonicMerge(lo, n, dir);
        }
    }
    function bitonicMerge(lo, n, dir) {
        if (n > 1) {
            var m = greatestPowerOfTwoLessThan(n);
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

	function greatestPowerOfTwoLessThan(n)
	{
		var k = 1;
		while(k < n)
			k = k << 1;
		return k >> 1;
	}

	this.init = function (pTarget) {
	}

    return this;
}
