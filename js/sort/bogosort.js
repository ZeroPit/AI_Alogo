/* 
    Dateiname  : bogosort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny Lüttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

function Bogosort() {
    var _Actions, _Array, n;
	
	/*
	 * Startet die Bogosort Sortierung
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
	 * Füllt das Array mit Zufallszahlen
	 */
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

	/*
	 * Kontrolliert ob ein Array korrekt sortiert ist
	 */	
    function inOrder() {
        for (var i = 1; i < _Array.length; i++) {        
            if (_Array[i] < _Array[i - 1]) {
                return false;
            }
        }
        return true;
    }
	
	/*
	 * Implementiert Bogosort
	 */	
    function start() {
        var tries = 0;
        while (!inOrder()) {
            if (tries > 100)
                return;
            tries++;
            shuffle();
        }
    }

	/*
	 * initialisiert benötigte Membervariablen für Usersort
	 */
    this.init = function (pTarget) {
    };

    return this;
}