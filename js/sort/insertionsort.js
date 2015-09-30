/* 
    Dateiname  : insertionsort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny Lüttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

function InsertionSort() {
    /**
     * Visual Sort
     */

    var _Actions, _Array;

    /*
     * Startet die Insertion Sortierung
     */
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        insertionsort();
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
	 * Implementierung von Insertionsort
	 */
    function insertionsort() {
        var i, j;
        for (i = 1; i < _Array.length; i++) {          
            j = i;
            while (j > 0 && _Array[j - 1] > _Array[j]) {
                swap(j, j - 1);
                j--;
            }
        }
    }

    /*
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
    };

    /*
	 * gibt die Textbeschreibung für den aktuellen Schritt zurück
	 */
    this.updateMode = function (pMode) {
        switch (pMode) {
            case 0:
                return "1. Vergleichselement(Grün) anklicken";
            case 1:
                return "Grün Fokussieren";
            case 2:
                return "Ist das Linke Element größer als Grün? Wenn ja anklicken ansonsten auf den Leeren Kreis klicken.";
            case 3:
                return "Das Array ist sortiert.";
        }
    };

    /*
	 * Verarbeitet die onClick Events entsprechend des Implementierten Algorithmus
	 */
    this.onClick = function (pSortInfo,pOriginal) {
        switch (pSortInfo.Mode) {
            case 0:
                // Wenn auf grün geklickt wurde
                if (pSortInfo.click === pSortInfo.Left) {
                    // Gehe zur aktuellen Position
                    pSortInfo.Left = pSortInfo.Right;
                    // Und wechsel in den Modus
                    pSortInfo.Mode++;
                }
                break;
            case 1:
                // Wenn auf grün und rot geklickt wurde
                if (pSortInfo.click === pSortInfo.Left && pSortInfo.click === pSortInfo.Right) {
                    // Verschiebe den aktuellen in das obere Array
                    pSortInfo.ArrayUp[pSortInfo.click] = pSortInfo.Array[pSortInfo.click];
                    // den unteren nicht mehr Anzeigen
                    pSortInfo.Array[pSortInfo.click] = -1;

                    // den oberen Wert auch grün Zeichnen und den Modus wechseln
                    pSortInfo.UpLeft = pSortInfo.Left;
                    pSortInfo.Mode++;
                    pSortInfo.Update = true;
                }
                break;
            case 2:
                // Wenn links von den grünen Kreis geklickt wurde
                if (pSortInfo.Left - 1 === pSortInfo.click) {
                    // Und der geklickte Wert größer als das Array ist
                    if (pSortInfo.Array[pSortInfo.click] > pSortInfo.ArrayUp[pSortInfo.Left]) {
                        // dann schiebe den oberen Wert zur geklickten Position
                        pSortInfo.ArrayUp[pSortInfo.click] = pSortInfo.ArrayUp[pSortInfo.Left];
                        pSortInfo.ArrayUp[pSortInfo.Left] = -1;

                        // und den unteren zur vorherigen Position
                        pSortInfo.Array[pSortInfo.Left] = pSortInfo.Array[pSortInfo.click];
                        pSortInfo.Array[pSortInfo.click] = -1;
                        // den grünen Kreis um eins nach links verschieben
                        pSortInfo.Left--;
                        // Im oberen Array den grünen Kreis auf die gleiche Position wie den unteren Kreis schieben
                        pSortInfo.UpLeft = pSortInfo.Left;
                        pSortInfo.Update = false;
                    }
                }
                // Wenn auf den grünen Kreis geklickt wurde
                else if (pSortInfo.Left === pSortInfo.click) {
                    var Set = false;
                    // und wir bei der ersten Position sind
                    if (pSortInfo.click === 0)
                        Set = true;
                    // oder links von uns ein kleinerer Wert ist
                    else if (pSortInfo.Array[pSortInfo.click - 1] <= pSortInfo.ArrayUp[pSortInfo.Left])
                        Set = true;
                    if (Set) {
                        // Verschiebe den oberen grünen Wert wieder in das untere Array
                        pSortInfo.Array[pSortInfo.click] = pSortInfo.ArrayUp[pSortInfo.Left];
                        // die obere Zahl nicht mehr anzeigen
                        pSortInfo.ArrayUp[pSortInfo.Left] = -1;
                        // den roten Kreis um einen nach Rechts verschieben
                        pSortInfo.Right++;
                        // den oberen grünen Kreis nicht mehr anzeigen
                        pSortInfo.UpLeft = -1;
                        if (pSortInfo.Right === pSortInfo.Array.length) {
                            // wenn der rote Kreis am Array Ende angekommen ist, ist das Array sortiert
                            // und es wird der Modus gewechselt
                            pSortInfo.Left = -1;
                            pSortInfo.Right = -1;
                            pSortInfo.Mode = 3;
                        }
                        else
                            // ansonsten wechsel zum ersten Modus
                            pSortInfo.Mode = 0;
                    }
                     pSortInfo.Update = true;
                }
                break;
        }
        return pSortInfo;
    };
    return this;
}