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
            _Actions.push({type: "traverse", "traverse": i});
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

    this.updateMode = function (pMode) {
        switch (pMode) {
            case 0:
                return "Grün anklicken";
            case 1:
                return "Grün Fokussieren";
            case 2:
                return "Ist Rot > Grün -1";
            case 3:
                return "Fertig";
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
                    pSortInfo.Up = pSortInfo.Left;
                    pSortInfo.Mode++;
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
                        pSortInfo.Up = pSortInfo.Left;
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
                        pSortInfo.Up = -1;
                        if (pSortInfo.Right === pSortInfo.Array.length) {
                            pSortInfo.Left = -1;
                            pSortInfo.Right = -1;
                            pSortInfo.Mode = 3;
                        }
                        else
                            pSortInfo.Mode = 0;
                    }
                }
                break;
        }
        return pSortInfo;
    };
    return this;
}