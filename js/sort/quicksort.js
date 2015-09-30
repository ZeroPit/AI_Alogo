/* 
    Dateiname  : quicksort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny Lüttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

function Quicksort() {
    var _Actions, _Array;

    /*
	 * Startet die BubbleSort Sortierung
	 */
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        recurse(0, _Array.length - 1);
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
	 * Implementierung von Quicksort
	 */
    function recurse(left, right) {
        var i = left, j = right;
        // Vergleichselement x           
        var x = _Array[ (left + right)>> 1 ];
        _Actions.push({type: "partition", pivot: x});
        //  Aufteilung
        while (i <= j) {
            while (_Array[i] < x)
                i++;
            while (_Array[j] > x)
                j--;
            if (i <= j)
            {
                swap(i, j);
                i++;
                j--;
            }
        }
        // Rekursion
        if (left < j)
            recurse(left, j);
        if (i < right)
            recurse(i, right);
    }
    /**
      * User Sort
      */

    this.LeftStart = -2;
    this.RightStart = -1;
    // untere Grenze der Rekursion
    this.Low = 0;
    // obere Grenze der Rekursion
    this.High = -1;
    this.CompareElement = 0;
    this.SwapElementOne = 0;
    this.SwapElementTwo = 0;
    this.RecursionArray = [];

    /*
	 * initialisiert benötigte Membervariablen für Usersort
	 */
    this.init = function (pTarget) {
        pTarget.LeftStart = -2;
        pTarget.RightStart = -1;
        pTarget.Low = 0;
        pTarget.High = -1;
        pTarget.CompareElement = 0;
        pTarget.SwapElementOne = 0;
        pTarget.SwapElementTwo = 0;
        pTarget.RecursionArray = [];
    };

    /*
	 * gibt die Textbeschreibung für den aktuellen Schritt zurück
	 */
    this.updateMode = function (pMode) {
        switch (pMode) {
            case 0:
                return "Wähle das Mittlere Element(Grün) der Folge als Vergleichselement.";
            case 1:
                return "Suche von Links(Grün) das erste Element welches größer gleich das Vergleichselement ist.";
            case 2:
                return "Suche von Rechts(Rot) das erste Element welches kleiner gleich das Vergleichselement ist.";
            case 3:
                return "Tausche diese beiden Elemente.";
            case 4:
                return "Neue Grenzen auswählen."
            case 5:
                return "Das Array ist sortiert.";
        }
    };

    /*
	 * Verarbeitet die onClick Events entsprechend des Implementierten Algorithmus
	 */
    this.onClick = function (pSortInfo, pOriginal) {
        switch (pSortInfo.Mode) {
            case 0:
                // Zum Anfang wird this.High mit -1 initialisiert
                // High auf die Arraygrenze 
                if (this.High === -1){
                    this.High = pSortInfo.Array.length - 1;
                }
                // Wenn auf grün geklickt wurde
                if (pSortInfo.click === pSortInfo.Left) {
                    // Setze beide Tauschelemente und das Vergleichselement zurück
                    this.SwapElementOne = -1;
                    this.SwapElementTwo = -1;
                    this.CompareElement = pSortInfo.Array[pSortInfo.Left];
                    // Setze die aktuellen grenzen der Rekursion
                    // und wechsel den Modus
                    pSortInfo.Left = this.Low;
                    pSortInfo.Right = this.High;
                    pSortInfo.Mode++;
                }
                break;

            case 1:
                // Zuerst wird von links das Element gesucht
                if (pSortInfo.click === pSortInfo.Left) {
                    // Wenn auf grün geklickt wurde und der Wert kleiner als das Vergleichselement ist
                    if (pSortInfo.Array[pSortInfo.Left] < this.CompareElement) {
                        // Verschiebe die Markierung um einen nach Rechts
                        pSortInfo.Left++;
                        if (pSortInfo.Left > pSortInfo.Right) {
                            // Wenn wir auf über die rote Markierung sind
                            // müssen wir die Grenzen neu machen
                            // Modus wechseln
                            pSortInfo.Mode = 4;
                        }
                    }
                    else {
                        // Wenn der Wert größer ist haben wir das erste Tauschelement gefunden
                        this.SwapElementOne = pSortInfo.Left;
                        // Wechselt den Modus
                        pSortInfo.Mode++;
                    }
                }
                break;

            case 2:
                // Danach wird von rechts das nächste Element gesucht
                // Wenn auf die rote Umrandung geklickt wurde
                if (pSortInfo.click === pSortInfo.Right) {
                    // Und der rote Wert über dem Vergleichselement liegt
                    if (pSortInfo.Array[pSortInfo.Right] > this.CompareElement) {
                        // dann verschiebe die rote Umrandung ein Element nach links
                        pSortInfo.Right--;
                        if (pSortInfo.Left > pSortInfo.Right) {
                            // wenn dabei das grüne überschritten wird, müssen die Grenzen neu bestimmt werden
                            // daher Modus wechseln
                            pSortInfo.Mode = 4;
                        }
                    }
                    else {
                        // liegt der rote Wert unter dem Vergleichselement wurde das 2. Tauschelement
                        this.SwapElementTwo = pSortInfo.Right;
                        // wechselt den Modus
                        pSortInfo.Mode++;
                    }
                }
                break;

            case 3:
                // Wenn auf rot oder grün geklickt wurde
                if (pSortInfo.click === pSortInfo.Left || pSortInfo.click === pSortInfo.Right) {
                    //Tausche die beiden Elemente
                    var t = pSortInfo.Array[this.SwapElementOne];
                    pSortInfo.Array[this.SwapElementOne] = pSortInfo.Array[this.SwapElementTwo];
                    pSortInfo.Array[this.SwapElementTwo] = t;
                    // verschiebe grün einen nach rechts
                    pSortInfo.Left++;
                    // verschiebe rot einen nach links
                    pSortInfo.Right--;
                    if (pSortInfo.Left <= pSortInfo.Right) {
                        // Wenn links dabei unter bzw. auf rechts bleibt
                        // neues element suchen, also den Modus wechseln
                        pSortInfo.Mode = 1;
                    }
                    else {
                        // kommt links dabei über rechts müssen die Grenzen neu berechnet werden
                        pSortInfo.Mode = 4;
                    }
                }
                break;
            
            case 4:
                // Wenn auf grün oder rot geklickt wurde 
                if (pSortInfo.click === pSortInfo.Left || pSortInfo.click === pSortInfo.Right) {
                    // und grün unter der oberen Grenze liegt
                    if (pSortInfo.Left < this.High) {
                        // speicherere die Grenzen um eine spätere Rekursion durchzuführen
                        // Hinweis: Bei Quicksort werden finden 2 Rekursive aufrufe statt.
                        // den ersten Aufruf arbeiten wir direkt ab. Für den 2. Speichern wir
                        // hier die Parameter zwischen und arbeiten diese ab wenn wir im ersten
                        // Auruf nicht mehr tiefer können
                        this.RecursionArray.unshift(this.High);
                        this.RecursionArray.unshift(pSortInfo.Left);
                    }
                    // wenn rot über der unteren Grenze liegt
                    if (this.Low < pSortInfo.Right)
                    {
                        //setzen wir die Parameter für eine weitere Rekursion
                        this.Low = this.Low;
                        this.High = pSortInfo.Right;
                        pSortInfo.Left = (this.Low + this.High) >> 1;
                        pSortInfo.Right = -1;
                        this.SwapElementOne = -1;
                        this.SwapElementTwo = -1;
                        pSortInfo.Mode = 0;
                    }
                    else {
                        // Die ersten Rekursionsaufrufe wurden alle abgearbeitet
                        // nun arbeiten wir die den 2. aufruf ab.
                        if(this.RecursionArray.length != 0){
                            this.Low = this.RecursionArray[0];
                            this.High = this.RecursionArray[1];
                            // 2 Elemente aus dem Array entfernen
                            this.RecursionArray.shift();
                            this.RecursionArray.shift();
                            pSortInfo.Left = (this.Low + this.High) >> 1;
                            pSortInfo.Right = -1;
                            this.SwapElementOne = -1;
                            this.SwapElementTwo = -1;
                            pSortInfo.Mode = 0;
                        }
                        else {
                            // Der Stack für den 2. Aufruf ist leer
                            // Wir sind am Ende angekommen und das Array ist fertig sortiert
                            pSortInfo.Mode = 5;
                            pSortInfo.Left = -1;
                            pSortInfo.Right = -1;

                        }
                    }
                }
                break;

            case 5:
                //Fertig sortiert
                break;
        }
        return pSortInfo;
    };
    return this;
}