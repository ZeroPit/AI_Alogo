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
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        selectionsort();
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
    function swap(i, j) {
        var t = _Array[i];
        _Array[i] = _Array[j];
        _Array[j] = t;
        _Actions.push({type: "swap", i: i, j: j});
    }
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

    /**
     * User Sort
     */

    this.LeftStart = 0;
    this.RightStart = -1;

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
                return "Grün anklicken";
            case 1:
                return "Grün anklicken";
            case 2:
                return "Grün anklicken";
            case 3:
                return "Fertig";
        }
    };
    this.onClick = function (pSortInfo, pOriginal) {
        switch (pSortInfo.Mode) {
            case 0:
                if (pSortInfo.click === pSortInfo.Left) {
                    pSortInfo.Right = pSortInfo.Left + 1;
                    pSortInfo.UpLeft = pSortInfo.Right;
                    pSortInfo.ArrayUp[pSortInfo.Right] = pSortInfo.Array[pSortInfo.click];
                    pSortInfo.Mode++;
                    pSortInfo.Update = true;
                }
                break;
            case 1:
                if (pSortInfo.click === pSortInfo.Right) {
                    pSortInfo.Update = false;
                    if (pOriginal) {
                        if (pSortInfo.ArrayUp[pSortInfo.UpLeft] > pSortInfo.Array[pSortInfo.Right])
                        {
                            pSortInfo.Array[pSortInfo.Left] = pSortInfo.Array[pSortInfo.Right];
                            pSortInfo.Array[pSortInfo.Right] = pSortInfo.ArrayUp[pSortInfo.UpLeft];
                            pSortInfo.ArrayUp[pSortInfo.UpLeft+ 1] = pSortInfo.Array[pSortInfo.Left];                            
                            pSortInfo.ArrayUp[pSortInfo.UpLeft] = -1;
                            pSortInfo.UpLeft++;
                            pSortInfo.Right++;
                        }                       
                    }
                    else {
                        if (pSortInfo.ArrayUp[pSortInfo.UpLeft] <= pSortInfo.Array[pSortInfo.Right]) {
                            pSortInfo.ArrayUp[pSortInfo.UpLeft + 1] = pSortInfo.ArrayUp[pSortInfo.UpLeft];
                            pSortInfo.ArrayUp[pSortInfo.UpLeft] = -1;
                            pSortInfo.UpLeft++;
                            pSortInfo.Right++;
                        }
                    }
                    if (pSortInfo.Right === pSortInfo.Array.length) {
                        pSortInfo.Left++;
                        pSortInfo.Right = -1;
                        pSortInfo.Mode = 0;
                        pSortInfo.Update = true;
                    }
                    if (pSortInfo.Left === pSortInfo.Array.length-1) {
                        pSortInfo.Left = -1;
                        pSortInfo.Mode = 3;
                        pSortInfo.Update = true;
                    }
                }
                break;
        }
        return pSortInfo;
    };
    return this;
}