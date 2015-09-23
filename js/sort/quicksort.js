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
        // Vergleichs�element x           
        var x = _Array[ (left + right)>> 1 ];
        _Actions.push({type: "partition", pivot: x});
        //  Aufteilung
        while (i <= j) {
            while (_Array[i] < x)
                i++;
            while (_Array[j] > x)
                j--;
            if (i <= j)
                swap(i++, j--);
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
    this.onClick = function (pSortInfo, pOriginal) {
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