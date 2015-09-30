/* 
    Dateiname  : oddeventranspositionsort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny L�ttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

function OddEvenTranspositionSort() {
    var _Actions, _Array;
	
	/*
	 * Startet die Oddeven Sortierung
	 */
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        sort();
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
	
	/*
	 * Tauscht den Inhalt der 2 �bergebenen Parameter und merkt sich die Aktion zur sp�teren Darstellung
	 */
    function swap(i, j) {
        var t = _Array[i];
        _Array[i] = _Array[j];
        _Array[j] = t;
        _Actions.push({type: "swap", i: i, j: j});
    }
	
	/*
	 * Implementierung von Oddeven Sort
	 */	
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

	/*
	 * initialisiert ben�tigte Membervariablen f�r Usersort
	 */
    this.init = function (pTarget) {
    };

    return this;
}