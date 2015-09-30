/* 
    Dateiname  : selectionsort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny Lüttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

function SelectionSort() {
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
        selectionsort();
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
    * Implementierung von Selectionsort
    */
    function selectionsort() {
        var i = 0, j = 0;
        for (i = 0; i < _Array.length - 1; i++) {
            for (j = i + 1; j < _Array.length; j++) {
                if (_Array[i] > _Array[j]) {
                    swap(i, j);
                }
            }
        }
    }

    /*
     * User Sort
     */
    this.LeftStart = 0;
    this.RightStart = -1;

    /*
	 * initialisiert benötigte Membervariablen für Usersort
	 */
    this.init = function (pTarget) {
        pTarget.LeftStart = 0;
        pTarget.RightStart = -1;
    };

    /*
	 * gibt die Textbeschreibung für den aktuellen Schritt zurück
	 */
    this.updateMode = function (pMode) {
        switch (pMode) {
            case 0:
                return "Auf das Grüne Element klicken.";
            case 1:
                return "Den oberen Wert(Grün) anklicken wenn er kleiner gleich als der Untere(Rot) ist.";
            case 2:
                return "Fertig";
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
                    // setze den roten Kreis rechts von grün
                    pSortInfo.Right = pSortInfo.Left + 1;
                    // und den oberen roten über den unteren roten Kreis
                    pSortInfo.UpLeft = pSortInfo.Right;
                    // in den oberen roten Kreis wird der Wert von dem geklickten geschrieben
                    pSortInfo.ArrayUp[pSortInfo.Right] = pSortInfo.Array[pSortInfo.click];
                    // wechsel den Modus
                    pSortInfo.Mode++;
                    pSortInfo.Update = true;
                }
                break;
            case 1:
                // Wenn auf Rot geklickt wurde
                if (pSortInfo.click === pSortInfo.Right) {
                    pSortInfo.Update = false;
                    if (pOriginal) {
                        // Und der Wert im oberen Grünen Kreis über den im unteren roten Kreis liegt
                        if (pSortInfo.ArrayUp[pSortInfo.UpLeft] > pSortInfo.Array[pSortInfo.Right])
                        {
                            // schreibe den Wert vom roten Kreis in den grünen
                            pSortInfo.Array[pSortInfo.Left] = pSortInfo.Array[pSortInfo.Right];
                            // in den roten Wert den von den oberen Grünen
                            pSortInfo.Array[pSortInfo.Right] = pSortInfo.ArrayUp[pSortInfo.UpLeft];
                            // den oberen grünen Wert um 1 nach rechts verschieben
                            pSortInfo.ArrayUp[pSortInfo.UpLeft + 1] = pSortInfo.Array[pSortInfo.Left];
                            // und den alten Wert nicht mehr anzeigen
                            pSortInfo.ArrayUp[pSortInfo.UpLeft] = -1;
                            // den oberen grünen und den unteren roten Kreis nach rechts verschieben
                            pSortInfo.UpLeft++;
                            pSortInfo.Right++;
                        }                       
                    }
                    else {
                        // Wenn der obere Grüne kleiner gleich dem unteren Roten ist
                        if (pSortInfo.ArrayUp[pSortInfo.UpLeft] <= pSortInfo.Array[pSortInfo.Right]) {
                            // dann verschiebe den Wert und die grüne Markierung um 1 nach Rechts
                            pSortInfo.ArrayUp[pSortInfo.UpLeft + 1] = pSortInfo.ArrayUp[pSortInfo.UpLeft];
                            pSortInfo.ArrayUp[pSortInfo.UpLeft] = -1;
                            pSortInfo.UpLeft++;
                            // genauso die Rote Markierung
                            pSortInfo.Right++;
                        }
                    }
                    // Wenn die rote Umrandung das Array Ende erreicht hat, fang nochmal von vorne an
                    if (pSortInfo.Right === pSortInfo.Array.length) {
                        pSortInfo.Left++;
                        pSortInfo.Right = -1;
                        pSortInfo.Mode = 0;
                        pSortInfo.Update = true;
                    }
                    // Wenn die grüne Umrandung das Array Ende erreicht hat, beende die Sortierung
                    if (pSortInfo.Left === pSortInfo.Array.length-1) {
                        pSortInfo.Left = -1;
                        pSortInfo.Mode = 2;
                        pSortInfo.Update = true;
                    }
                }
                break;
        }
        return pSortInfo;
    };
    return this;
}