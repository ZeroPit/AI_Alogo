/* 
    Dateiname  : shellsort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny L�ttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

function ShellSort() {
    var _Actions, _Array;

    /*
     * Startet die Shellsort Sortierung
     */
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        shellsort();
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
    function shellsort() {
        var i, j;
        var m = (_Array.length)>>1 ;
        while (m > 0) {
            for (i = m; i < _Array.length; i++) {              
                j = i;
                while (j >= m && _Array[j - m] > _Array[j]) {
                    swap(j, j - m);
                    j = j - m;
                }
            }
            m = ~~(m / 2);
        }
    }

    /*
     * User Sort
     */

    this.LeftStart = 0;
    this.RightStart = 1;

    this.cols = [4, 2, 1];
    this.LeftStart = 0;
    this.RightStart = -1;
    this.i = 0;
    this.j = 0;
    this.k = 0;
    this.h = 0;
    this.t = 0;

    /*
	 * initialisiert benötigte Membervariablen für Usersort
	 */
    this.init = function (pTarget) {
        pTarget.LeftStart = 0;
        pTarget.RightStart = 1;
        pTarget.cols = [4, 2, 1];
        pTarget.LeftStart = 0;
        pTarget.RightStart = -1;
        pTarget.i = 0;
        pTarget.j = 0;
        pTarget.k = 0;
        pTarget.h = 0;
        pTarget.t = 0;
    };

    /*
	 * gibt die Textbeschreibung für den aktuellen Schritt zurück
	 */
    this.updateMode = function (pMode) {
        switch (pMode) {
            case 0:
                return "Spalten Anzahl auf " + String(this.cols[0]) + " setzen.";
            case 1:
                return "In der " + String(this.i % this.cols[0] + 1) + ". Spalte mit dem nächsten Element(Rot) vergleichen.";
            case 2:
                return "Wenn das 1. Element (Grün) größer ist als das 2. Element (Rot) dann klicke Grün ansonsten Rot.";
            case 3:
                return "Das Array ist sortiert.";
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
                    // die colum Breite setzen
                    this.h = this.cols[0];
                    this.i = this.cols[0];
                    // Die grüne und rote Umrandung setzen
                    pSortInfo.Left = this.i - this.h;
                    pSortInfo.Right = this.i;
                    // Modus wechseln
                    pSortInfo.Mode++;
                }
                break;

            case 1:
                // Wenn auf grün oder Rot geklickt wurde
                if (pSortInfo.click === pSortInfo.Left || pSortInfo.click === pSortInfo.Right) {
                    if (this.i < pSortInfo.Array.length) {
                        // Und wir noch nicht am Ende angekommen sind
                        this.j = this.i;
                        this.t = pSortInfo.Array[this.j];
                        pSortInfo.Left = this.i - this.h;
                        pSortInfo.Right = this.j;

                        if (this.j >= this.h && pSortInfo.Array[this.j - this.h] > this.t)
                        {
                            // Es muss ein Objekt in der Colum getauscht werden
                            // hierfür den Modus wechseln
                            pSortInfo.Mode++;
                        }
                        else {
                            // Kein Objekt in der Colum gefunden
                            // in die nächste Colum wechseln
                            this.i += 1;
                            pSortInfo.Left++;
                            pSortInfo.Right++;
                        }
                    }
                    else {
                        this.cols.shift();
                        if (this.cols.length == 0) {
                            // Keine weiteren colums
                            // Sind am Ende angekommen
                            pSortInfo.Left = -1;
                            pSortInfo.Right = -1;
                            pSortInfo.Mode = 3;
                        }
                        else {
                            // Es sind noch colums vorhanden
                            // von vorne anfangen
                            pSortInfo.Mode = 0;
                        }
                    }
                }
                break;

            case 2:
                // Wenn auf rot oder grün geklickt wurde
                if (pSortInfo.click === pSortInfo.Left || pSortInfo.click === pSortInfo.Right) {
                    // Und das nächste Element in der Colum kleiner ist als der Vorgänger
                    if (this.j >= this.h && pSortInfo.Array[this.j - this.h] > this.t) {
                        //dann tausche die Werte
                        pSortInfo.Array[this.j] = pSortInfo.Array[this.j - this.h];
                        this.j = this.j - this.h;
                        pSortInfo.Array[this.j] = this.t;

                        // um einen klick zu sparen fragen wir hier die bedingung nochmal ab
                        if (this.j >= this.h && pSortInfo.Array[this.j - this.h] > this.t) {
                            // und gehen ein Element in der Colum zurück wenn sie erfüllt ist
                            pSortInfo.Left -= this.h;
                            pSortInfo.Right -= this.h;
                        }
                        else {
                            // oder wechseln in in die nächste Colum wenn sie nicht erfüllt ist
                            pSortInfo.Mode = 1;
                            pSortInfo.Left++;
                            pSortInfo.Right++;
                            this.i += 1;
                        }
                    }
                    else {
                        // Wenn das Element nicht kleiner ist dann wechsel in die nächste Column
                        pSortInfo.Mode = 1;
                        pSortInfo.Left++;
                        pSortInfo.Right++;
                        this.i += 1;
                    }
                }
                break;

            case 3:
                break;
        }
        return pSortInfo;
    };
    return this;
}