/* 
    Dateiname  : heapsort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny Lüttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

function Heapsort() {
    var _Actions, _Array, n;
	
	/*
	 * Startet die Heapsort Sortierung
	 */
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        n = _Array.length;
        start();
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
	 * Implementiert Heapsort
	 */	
    function start() {
        buildheap();
        while (n > 1) {
            n--;
            swap(0, n);
            downheap(0);
        }
    }
	
	/*
	 * buildheap und downheap erstellen den Heap
	 */	
    function buildheap() {
        for (var v = (n >>1 ) - 1; v >= 0; v--) {          
            downheap(v);
        }
    }
	
    function downheap(v) {
        var w = 2 * v + 1;		// erster Nachfolger von v
        while (w < n) {
            if (w + 1 < n)		// gibt es einen zweiten Nachfolger?
                if (_Array[w + 1] > _Array[w])
                    w++;
            // w ist der Nachfolger von v mit maximaler Markierung
            if (_Array[v] >= _Array[w])
                return;  // v hat die Heap-Eigenschaft
            // sonst
            swap(v, w);  // vertausche Markierungen von v und w
            v = w;             // fahre mit v=w fort
            w = 2 * v + 1;
        }
    }

	/*
	 * initialisiert benötigte Membervariablen für Usersort
	 */
    this.init = function (pTarget) {
    }

    return this;
}