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
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        insertionsort();
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
    function swap(i, j) {
        var t = _Array[i];
        _Array[i] = _Array[j];
        _Array[j] = t;
        _Actions.push({type: "swap", i: i, j: j});
    }
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

    /**
     * User Sort
     */

    this.LeftStart = 0;
    this.RightStart = 1;

    this.init = function (pTarget) {
        pTarget.LeftStart = 0;
        pTarget.RightStart = 1;
    }

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
    this.onClick = function (pSortInfo,pOriginal) {
        switch (pSortInfo.Mode) {
            case 0:
                if (pSortInfo.click === pSortInfo.Left) {
                    pSortInfo.Left = pSortInfo.Right;
                    pSortInfo.Mode++;
                }
                break;
            case 1:
                if (pSortInfo.click === pSortInfo.Left && pSortInfo.click === pSortInfo.Right) {
                    pSortInfo.ArrayUp[pSortInfo.click] = pSortInfo.Array[pSortInfo.click];
                    pSortInfo.Array[pSortInfo.click] = -1;
                    pSortInfo.UpLeft = pSortInfo.Left;
                    pSortInfo.Mode++;
                    pSortInfo.Update = true;
                }
                break;
            case 2:
                if (pSortInfo.Left - 1 === pSortInfo.click) {
                    if (pSortInfo.Array[pSortInfo.click] > pSortInfo.ArrayUp[pSortInfo.Left]) {
                        pSortInfo.ArrayUp[pSortInfo.click] = pSortInfo.ArrayUp[pSortInfo.Left];
                        pSortInfo.ArrayUp[pSortInfo.Left] = -1;
                        pSortInfo.Array[pSortInfo.Left] = pSortInfo.Array[pSortInfo.click];
                        pSortInfo.Array[pSortInfo.click] = -1;
                        pSortInfo.Left--;
                        pSortInfo.UpLeft = pSortInfo.Left;
                        pSortInfo.Update = false;
                    }
                }
                else if (pSortInfo.Left === pSortInfo.click) {
                    var Set = false;
                    if (pSortInfo.click === 0)
                        Set = true;
                    else if (pSortInfo.Array[pSortInfo.click - 1] <= pSortInfo.ArrayUp[pSortInfo.Left])
                        Set = true;
                    if (Set) {
                        pSortInfo.Array[pSortInfo.click] = pSortInfo.ArrayUp[pSortInfo.Left];
                        pSortInfo.ArrayUp[pSortInfo.Left] = -1;
                        pSortInfo.Right++;
                        pSortInfo.UpLeft = -1;
                        if (pSortInfo.Right === pSortInfo.Array.length) {
                            pSortInfo.Left = -1;
                            pSortInfo.Right = -1;
                            pSortInfo.Mode = 3;
                        }
                        else
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