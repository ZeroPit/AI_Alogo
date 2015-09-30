/* 
    Dateiname  : bubblesort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny Lüttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

function BubbleSort() {
    /**
     * Visual Sort
     */

    var _Actions, _Array;
	
	/*
	 * Startet die BubbleSort Sortierung
	 */
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        bubblesort();
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
	 * Implementierung von Bubblesort
	 */	
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

    /**
     * User Sort
     */

    this.LeftStart = 0;
    this.RightStart = 1;

	/*
	 * initialisiert benötigte Membervariablen für Usersort
	 */
    this.init = function (pTarget) {
        pTarget.LeftStart = 0;
        pTarget.RightStart = 1;
    }

	/*
	 * gibt die Textbeschreibung für den aktuellen Schritt zurück
	 */
    this.updateMode = function (pMode) {
        switch (pMode) {
            case 0:
                return "Wenn das 1. Vergleichselement (Grün) größer ist als das 2. Vergleichselement (Rot) dann klicke Grün ansonsten Rot";          
            case 3:
                return "Das Array ist sortiert";
        }
    };
	
	/*
	 * Verarbeitet die onClick Events entsprechend des Implementierten Algorithmus
	 */
    this.onClick = function (pSortInfo, pOriginal) {
        switch (pSortInfo.Mode) {
            case 0:
				// Wenn auf grün geklickt wurde
                if (pSortInfo.click === pSortInfo.Left) {
					// und der Linke Wert größer als der Rechte ist
                    if (pSortInfo.Array[pSortInfo.Left] > pSortInfo.Array[pSortInfo.Right]) {
						// tausche die beiden Werte
                        var t = pSortInfo.Array[pSortInfo.Left];
                        pSortInfo.Array[pSortInfo.Left] = pSortInfo.Array[pSortInfo.Right];
                        pSortInfo.Array[pSortInfo.Right] = t;
						// und verschiebe die beiden Markieren um jeweils 1 nach Rechts
                        pSortInfo.Right++;
                        pSortInfo.Left++;
						// und schreibe in Up das sortiert wurde
                        pSortInfo.Up = -1;
                    }
                }
				// Wenn auf rot geklickt wurde
                else if (pSortInfo.click === pSortInfo.Right) {
					// Und der linke Wert kleiner gleich dem Rechten ist
                    if (pSortInfo.Array[pSortInfo.Left] <= pSortInfo.Array[pSortInfo.Right]) {
						// verschiebe die beiden Markieren um jeweils 1 nach Rechts 
                        pSortInfo.Right++;
                        pSortInfo.Left++;
                    }
                }
				// Wenn wir mit dem roten Element ganz Rechts angekommen sind
                if (pSortInfo.Right === pSortInfo.Array.length) {
					// Und nicht getauscht wurde
                    if (pSortInfo.Up === -2) {
						// Wechsel zum nächsten Modus
                        pSortInfo.Left = -1;
                        pSortInfo.Right = -1;
                        pSortInfo.Mode = 3;
                    }
                    else {
						// grün ganz nach Links
						// rot rechts daneben
                        pSortInfo.Left = 0;
                        pSortInfo.Right = 1;
						// es wurde getauscht, also noch einmal durchgehen
                        pSortInfo.Up = -2;
                    }
                }
                break;
        }
        return pSortInfo;
    };
    return this;
}