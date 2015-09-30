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
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        bubblesort();
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
    function swap(i, j) {
        var t = _Array[i];
        _Array[i] = _Array[j];
        _Array[j] = t;
        _Actions.push({type: "swap", i: i, j: j});
    }
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

    this.init = function (pTarget) {
        pTarget.LeftStart = 0;
        pTarget.RightStart = 1;
    }

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
                return "Wenn das 1. Vergleichselement (Grün) größer ist als das 2. Vergleichselement (Rot) dann klicke Grün ansonsten Rot";          
            case 3:
                return "Das Array ist sortiert";
        }
    };
    this.onClick = function (pSortInfo, pOriginal) {
        switch (pSortInfo.Mode) {
            case 0:
                if (pSortInfo.click === pSortInfo.Left) {
                    if (pSortInfo.Array[pSortInfo.Left] > pSortInfo.Array[pSortInfo.Right]) {
                        var t = pSortInfo.Array[pSortInfo.Left];
                        pSortInfo.Array[pSortInfo.Left] = pSortInfo.Array[pSortInfo.Right];
                        pSortInfo.Array[pSortInfo.Right] = t;
                        pSortInfo.Right++;
                        pSortInfo.Left++;
                        pSortInfo.Up = -1;
                    }
                }
                else if (pSortInfo.click === pSortInfo.Right) {
                    if (pSortInfo.Array[pSortInfo.Left] <= pSortInfo.Array[pSortInfo.Right]) {
                        pSortInfo.Right++;
                        pSortInfo.Left++;
                    }
                }
                
                if (pSortInfo.Right === pSortInfo.Array.length) {

                    if (pSortInfo.Up === -2) {
                        pSortInfo.Left = -1;
                        pSortInfo.Right = -1;
                        pSortInfo.Mode = 3;
                    }
                    else {
                        pSortInfo.Left = 0;
                        pSortInfo.Right = 1;
                        pSortInfo.Up = -2;
                    }
                }
                break;
        }
        return pSortInfo;
    };
    return this;
}