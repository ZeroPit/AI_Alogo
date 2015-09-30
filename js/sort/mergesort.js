/* 
    Dateiname  : mergesort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny Lüttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

function MergeSorter() {
    /**
     * Visual Sort
     */
    var _Actions, _ArrayA, _ArrayB;

    /*
	 * Startet die Mergesort Sortierung
	 */
    this.sortAll = function (array) {
        _Actions = [];
        _ArrayA = array.slice();
        _ArrayB = array.slice();
        mergesort(0, _ArrayA.length - 1);
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };

    /*
	 * Implementierung von Mergesort
	 */
    function mergesort(lo, hi) {
        if (lo < hi) {
            var m = (lo + hi)>>1 ;
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

    /**
     * User Sort
     */

    this.LeftStart = 0;
    this.RightStart = -1;

    this.GlobalPosition = 0;
    this.HelpArraySize = 1;
    this.ArrayLeftPosition = 0;
    this.ArrayRightPosition = 0;

    /*
	 * initialisiert benötigte Membervariablen für Usersort
	 */
    this.init = function (pTarget) {
        pTarget.LeftStart = 0;
        pTarget.RightStart = -1;

        pTarget.GlobalPosition = 0;
        pTarget.HelpArraySize = 1;
        pTarget.ArrayLeftPosition = 0;
        pTarget.ArrayRightPosition = 0;
    };

    /*
	 * gibt die Textbeschreibung für den aktuellen Schritt zurück
	 */
    this.updateMode = function (pMode) {
        switch (pMode) {
            case 0:
                return "Grün anklicken um Array ins Hilfsarray zu kopieren";
            case 1:
                return "Merge Größe " + this.HelpArraySize + ", Array zusammen kopieren, dafür den größeren der Markierten Werte anklicken";
            case 2:
                return "Hilfs Array löschen";
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
                    // verschiebe das untere Array in das obere
                    for (var i = 0; i < pSortInfo.Array.length; i++) {
                        pSortInfo.ArrayUp[i] = pSortInfo.Array[i];
                        pSortInfo.Array[i] = -1;
                    }
                    // Lösche die rote Markierung
                    pSortInfo.Right = -1;
                    // setze die grüne Markierung nach unten und oben Links
                    pSortInfo.Left = 0;
                    pSortInfo.UpLeft = 0;
                    // und die obere rote an die Position des 2. Arrays
                    pSortInfo.UpRight = pSortInfo.Left + this.HelpArraySize;
                    // Wechsel den Modus
                    pSortInfo.Mode = 1;
                }
                break;
            case 1:
                if (!pOriginal) {
                    // Wenn oben auf grün geklickt wurde
                    if (pSortInfo.click === pSortInfo.UpLeft) {
                        // Vergleiche den Wert der oberen roten Markierung mit dem Wert der oberen grünen Markierung
                        if (pSortInfo.ArrayUp[pSortInfo.UpLeft] <= pSortInfo.ArrayUp[pSortInfo.UpRight])
                        {
                            // wenn er kleiner gleich ist, verschiebe den oberen grünen Wert in
                            // die untere grüne Markierung und lösche die obere grüne Markierung
                            pSortInfo.Array[pSortInfo.Left] = pSortInfo.ArrayUp[pSortInfo.UpLeft];
                            pSortInfo.ArrayUp[pSortInfo.UpLeft] = -1;
                            // erhöhe die Position im ersten Hilfsarray
                            this.ArrayLeftPosition++;
                            // wenn das Ende vom Hilfsarray nicht erreicht ist
                            if (this.ArrayLeftPosition < this.HelpArraySize) {
                                // verschiebe beide grünen Markierungen um eins nach rechts
                                pSortInfo.UpLeft++;
                                pSortInfo.Left++;
                            }
                            else {
                                // wenn das Ende erreicht wurde, lösche die obere grüne Markierung
                                pSortInfo.UpLeft = -1;
                                // und verschiebe nur die untere einen nach Rechts
                                pSortInfo.Left++;
                            }
                        }
                        // Wenn auf grün geklickt wurde und das rechte Array leer ist
                        // (Die Position im 2. Array ist über/gleich der Arraygrenze
                        else if (this.ArrayRightPosition >= this.HelpArraySize)
                        {
                            // verschiebe den oberen Wert in den unteren
                            pSortInfo.Array[pSortInfo.Left] = pSortInfo.ArrayUp[pSortInfo.UpLeft];
                            // lösche die obere grüne Markierung
                            pSortInfo.ArrayUp[pSortInfo.UpLeft] = -1;
                            // erhöhe die Postion im Hilfsarray
                            this.ArrayLeftPosition++;
                            if (this.ArrayLeftPosition < this.HelpArraySize) {
                                // wenn das Ende im Hilfsarray noch nicht erreicht ist
                                // verschiebe beide grüne Markierungen um eins nach rechts
                                pSortInfo.UpLeft++;
                                pSortInfo.Left++;
                            }
                            else {
                                // wenn das Ende erreicht ist, lösche die obere grüne Markierung
                                pSortInfo.UpLeft = -1;
                            }
                        }
                    }
                    // Wenn oben auf rot geklickt wurde 
                    else if (pSortInfo.click === pSortInfo.UpRight) {
                        // Vergleiche den Wert der oberen grünen Markierung mit der oberen Roten
                        if (pSortInfo.ArrayUp[pSortInfo.UpLeft] >= pSortInfo.ArrayUp[pSortInfo.UpRight])
                        {
                            // wenn er größer gleich ist, verschiebe den oberen roten Wert
                            // in den unteren grünen und lösche die obere grüne Markierung
                            pSortInfo.Array[pSortInfo.Left] = pSortInfo.ArrayUp[pSortInfo.UpRight];
                            pSortInfo.ArrayUp[pSortInfo.UpRight] = -1;
                            // erhöhe die Position im zweiten Hilfsarray
                            this.ArrayRightPosition++;
                            // wenn das Ende vom Hilfarray nicht erreicht ist
                            if (this.ArrayRightPosition < this.HelpArraySize) {
                                // verschiebe die obere rote und die untere grüne Markierung einen nach rechts
                                pSortInfo.UpRight++;
                                pSortInfo.Left++;
                            }
                            else {
                                // wenn das Ende erreicht wurde, lösche die obere rote Markierung
                                pSortInfo.UpRight = -1;
                                // und verschiebe nur die untere einen nach Rechts 
                                pSortInfo.Left++;
                            }
                        }
                        // Wenn auf rot geklickt wurde und das linke Array leer ist
                        // (Die Position im 1. Array ist über/gleich der Arraygrenze
                        else if (this.ArrayLeftPosition >= this.HelpArraySize)
                        {
                            // verschiebe den oberen Wert in den unteren
                            pSortInfo.Array[pSortInfo.Left] = pSortInfo.ArrayUp[pSortInfo.UpRight];
                            // lösche die obere rote Markierung
                            pSortInfo.ArrayUp[pSortInfo.UpRight] = -1;
                            // erhöhe die Position im 1. Hilfsarray
                            this.ArrayRightPosition++;
                            if (this.ArrayRightPosition < this.HelpArraySize) {
                                //wenn das Ende im Hilfsarray noch nicht erreicht ist
                                // verschiebe die obere rote und die untere grüne Markierung um 1 nach rechts
                                pSortInfo.UpRight++;
                                pSortInfo.Left++;
                            }
                            else {
                                // wenn das Ende erreicht ist, lösche die obere rote Markierung
                                pSortInfo.UpRight = -1;
                            }
                        }
                    }               
                }
                // Haben beide Hilfsarrays ihr Ende erreicht?
                else if (this.ArrayLeftPosition >= this.HelpArraySize && this.ArrayRightPosition >= this.HelpArraySize) {
                        // Wenn ja die Position wieder auf 0 setzen
                        this.ArrayLeftPosition = 0;
                        this.ArrayRightPosition = 0;
                        // Merge größe der Arrays erhöhen?
                        if (this.GlobalPosition + this.HelpArraySize * 2 >= pSortInfo.Array.length)
                        {
                            //ja, also den Modus wechseln, die Globale Position zurücksetzen
                            // und die größe der Arrays verdoppeln
                            this.GlobalPosition = 0;
                            this.HelpArraySize *= 2;
                            pSortInfo.Mode = 0;
                        }
                        else
                        {
                            //nein, also ist das Array noch groß genug um beide Arrays nach rechte zu verschieben
                            this.GlobalPosition += 2 * this.HelpArraySize;
                        }
                        // Die Markierungen wieder zum Anfang zurücksetzen
                        pSortInfo.UpLeft = this.GlobalPosition;
                        pSortInfo.UpRight = this.GlobalPosition + this.HelpArraySize;
                        pSortInfo.Left = this.GlobalPosition;
                }
                if (this.HelpArraySize === pSortInfo.Array.length) {
                    // Das Ende wurde erreicht, es ist alles sortiert
                    pSortInfo.Mode = 2;
                }
                break;
            case 2:
                // Es wurde alles sortiert, das obere Array löschen
                for (var i = 0; i < pSortInfo.Array.length; i++) {
                    if (pSortInfo.ArrayUp[i] >= 0) {
                        pSortInfo.Array[pSortInfo.Left] = pSortInfo.ArrayUp[i];
                        pSortInfo.ArrayUp[i] = -1;
                        pSortInfo.Left++;
                    }
                }
                // und die Werte zurücksetzen
                this.Left = 0;
                this.Right = -1;
                this.GlobalPosition = 0;
                this.HelpArraySize = 1;
                this.ArrayLeftPosition = 0;
                this.ArrayRightPosition = 0;
                pSortInfo.Mode = 3;
                break;
        }
        return pSortInfo;
    };

    return this;
}    