/* 
    Dateiname  : quicksort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny Lüttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

function Quicksort() {
    var _Actions, _Array;
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        recurse(0, _Array.length - 1);
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
    function swap(i, j) {
        var t = _Array[i];
        _Array[i] = _Array[j];
        _Array[j] = t;
        _Actions.push({type: "swap", i: i, j: j});
    }
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
    this.Low = 0;
    this.High = -1;
    this.CompareElement = 0;
    this.SwapElementOne = 0;
    this.SwapElementTwo = 0;
    this.RecursionArray = [];

    this.updateMode = function (pMode) {
        /*
         Methode:	
         für i=0 bis n-2 wiederhole
         für j=i+1 bis n-1 wiederhole
         wenn a[j] < a[i]
         vertausche a[i] mit a[j]
         */
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
    this.onClick = function (pSortInfo, pOriginal) {
        switch (pSortInfo.Mode) {
            case 0:
                if (this.High === -1){
                    this.High = pSortInfo.Array.length - 1;
                }
                if (pSortInfo.click === pSortInfo.Left) {
                    this.SwapElementOne = -1;
                    this.SwapElementTwo = -1;
                    this.CompareElement = pSortInfo.Array[pSortInfo.Left];
                    pSortInfo.Left = this.Low;
                    pSortInfo.Right = this.High;
                    pSortInfo.Mode++;
                }
                break;

            case 1:
                if (pSortInfo.click === pSortInfo.Left) {
                    if (pSortInfo.Array[pSortInfo.Left] < this.CompareElement) {
                        pSortInfo.Left++;
                        if (pSortInfo.Left > pSortInfo.Right) {
                            pSortInfo.Mode = 4;
                        }
                    }
                    else{
                        this.SwapElementOne = pSortInfo.Left;
                        pSortInfo.Mode++;
                    }
                }
                break;

            case 2:
                if (pSortInfo.click === pSortInfo.Right) {
                    if (pSortInfo.Array[pSortInfo.Right] > this.CompareElement) {
                        pSortInfo.Right--;
                        if (pSortInfo.Left > pSortInfo.Right) {
                            pSortInfo.Mode = 4;
                        }
                    }
                    else {
                        this.SwapElementTwo = pSortInfo.Right;
                        pSortInfo.Mode++;
                    }
                }
                break;

            case 3:
                if (pSortInfo.click === pSortInfo.Left || pSortInfo.click === pSortInfo.Right) {
                    var t = pSortInfo.Array[this.SwapElementOne];
                    pSortInfo.Array[this.SwapElementOne] = pSortInfo.Array[this.SwapElementTwo];
                    pSortInfo.Array[this.SwapElementTwo] = t;
                    pSortInfo.Left++;
                    pSortInfo.Right--;
                    if (pSortInfo.Left <= pSortInfo.Right) {
                        pSortInfo.Mode = 1;
                    }
                    else {
                        pSortInfo.Mode = 4;
                    }
                }
                break;
            
            case 4:
                if (pSortInfo.click === pSortInfo.Left || pSortInfo.click === pSortInfo.Right) {
                    if (pSortInfo.Left < this.High) {
                        this.RecursionArray.unshift(this.High);
                        this.RecursionArray.unshift(pSortInfo.Left);
                    }
                    if (this.Low < pSortInfo.Right)
                    {
                        this.Low = this.Low;
                        this.High = pSortInfo.Right;
                        pSortInfo.Left = (this.Low + this.High) >> 1;
                        pSortInfo.Right = -1;
                        this.SwapElementOne = -1;
                        this.SwapElementTwo = -1;
                        pSortInfo.Mode = 0;
                    }
                    else {
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