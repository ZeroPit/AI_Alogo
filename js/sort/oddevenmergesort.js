/* 
    Dateiname  : oddevenmergesort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny Lüttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

function OddEvenMergeSorter() {
    var _Actions, _Array;
	
	/*
	 * Startet die Oddeven Merge Sortierung
	 */
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        oddEvenMergeSort(0, _Array.length);
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
	 * Implementierung von Oddeven Merge Sort
	 */	
    function oddEvenMergeSort(lo, n) {
        if (n > 1) {
            var m = n >>1 ;
            oddEvenMergeSort(lo, m);
            oddEvenMergeSort(lo + m, m);
            oddEvenMerge(lo, n, 1);
        }
    }

	/*
	 * Implementierung der Merge Funktion
	 */	
    function oddEvenMerge(lo, n, r) {
        var m = r * 2;
        if (m < n) {
            oddEvenMerge(lo, n, m);      // gerade Teilfolge
            oddEvenMerge(lo + r, n, m);    // ungerade Teilfolge
            for (var i = lo + r; i + r < lo + n; i += m) {
                if (_Array[i] > _Array[i + r])
                    swap(i, i + r);
            }
        }
        else {
            if (_Array[lo] > _Array[lo + r])
                swap(lo, lo + r);
        }
    }

	/*
	 * initialisiert benötigte Membervariablen für Usersort
	 */
    this.init = function (pTarget) {
    };

    return this;
}    