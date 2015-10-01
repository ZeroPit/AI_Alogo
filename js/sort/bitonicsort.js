/* 
    Dateiname  : bitonicsort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny Lüttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

function BitonicSorter() {
    var _Actions, _Array, ASCENDING = true, DESCENDING = false;
	
	/*
	 * Startet die Bitonic Sortierung
	 */
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        bitonicSort(0, _Array.length, ASCENDING);
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
	
	/*
	 * Tauscht den Inhalt der 2 übergebenen Parameter und merkt sich die Aktion zur späteren Darstellung
	 */
    function swap(i, j) {
        var t = _Array[i];
        _Array[i] = _Array[j];
        _Array[j] = t;
        _Actions.push({type: "swap", i: i, j: j});
    }
	
	/*
	 * Implementiert Bitonic Sort
	 */
    function bitonicSort(lo, n, dir) {
        if (n > 1) {
            var m = n >>1 ;
            bitonicSort(lo, m, !dir);
            bitonicSort(lo + m, n - m, dir);
            bitonicMerge(lo, n, dir);
        }
    }
	
	/*
	 * Implementiert die Merge Funktion für Bitonic Sort
	 */
    function bitonicMerge(lo, n, dir) {
        if (n > 1) {
            var m = greatestPowerOfTwoLessThan(n);
            for (var i = lo; i < lo + n-m; i++)
                compare(i, i + m, dir);
            bitonicMerge(lo, m, dir);
            bitonicMerge(lo + m, n - m, dir);
        }
    }
	
	/*
	 * Vergleicht die Argumente und tauscht wenn die Reihenfolge korrekt ist
	 */
    function compare(i, j, dir) {
        if (dir === (_Array[i] > _Array[j]))
            swap(i, j);
    }

	/*
	 * Berechnet den gr��ten Faktor von 2 kleiner n
	 */
	function greatestPowerOfTwoLessThan(n)
	{
		var k = 1;
		while(k < n)
			k = k << 1;
		return k >> 1;
	}

	/*
	 * initialisiert ben�tigte Membervariablen für Usersort
	 */
	this.init = function (pTarget) {
	};

    return this;
}
