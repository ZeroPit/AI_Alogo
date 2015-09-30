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
    this.sortAll = function (array) {
        _Actions = [];
        _ArrayA = array.slice();
        _ArrayB = array.slice();
        mergesort(0, _ArrayA.length - 1);
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };

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

    this.updateMode = function (pMode) {
        switch (pMode) {
            case 0:
                return "Grün anklicken um Array ins Hilfsarray zu kopieren";
            case 1:
                return "Merge Größe " + this.HelpArraySize + ", Array zusammen kopieren, dafür den größeren der Markierten Werte anklicken";
            case 2:
                return "Hilfs Array löschen";
            case 3:
                return "Fertig";
        }
    };
    this.onClick = function (pSortInfo, pOriginal) {
        switch (pSortInfo.Mode) {
            case 0:
                if (pSortInfo.click === pSortInfo.Left) {
                    for (var i = 0; i < pSortInfo.Array.length; i++) {
                        pSortInfo.ArrayUp[i] = pSortInfo.Array[i];
                        pSortInfo.Array[i] = -1;
                    }
                    pSortInfo.Right = -1;
                    pSortInfo.Left = 0;
                    pSortInfo.UpLeft = 0;
                    pSortInfo.UpRight = pSortInfo.Left + this.HelpArraySize;
                    pSortInfo.Mode = 1;
                }
                break;
            case 1:
                if (!pOriginal) {
                    if (pSortInfo.click === pSortInfo.UpLeft) {
                        if (pSortInfo.ArrayUp[pSortInfo.UpLeft] <= pSortInfo.ArrayUp[pSortInfo.UpRight])
                        {
                            pSortInfo.Array[pSortInfo.Left] = pSortInfo.ArrayUp[pSortInfo.UpLeft];
                            pSortInfo.ArrayUp[pSortInfo.UpLeft] = -1;
                            this.ArrayLeftPosition++;
                            if (this.ArrayLeftPosition < this.HelpArraySize) {
                                pSortInfo.UpLeft++;
                                pSortInfo.Left++;
                            }
                            else {
                                pSortInfo.UpLeft = -1;
                                pSortInfo.Left++;
                            }
                        } else if (this.ArrayRightPosition >= this.HelpArraySize)
                        {
                            pSortInfo.Array[pSortInfo.Left] = pSortInfo.ArrayUp[pSortInfo.UpLeft];
                            pSortInfo.ArrayUp[pSortInfo.UpLeft] = -1;
                            this.ArrayLeftPosition++;
                            if (this.ArrayLeftPosition < this.HelpArraySize) {
                                pSortInfo.UpLeft++;
                                pSortInfo.Left++;
                            }
                            else {
                                pSortInfo.UpLeft = -1;
                            }
                        }
                    }
                    else if (pSortInfo.click === pSortInfo.UpRight) {
                        if (pSortInfo.ArrayUp[pSortInfo.UpLeft] >= pSortInfo.ArrayUp[pSortInfo.UpRight])
                        {
                            pSortInfo.Array[pSortInfo.Left] = pSortInfo.ArrayUp[pSortInfo.UpRight];
                            pSortInfo.ArrayUp[pSortInfo.UpRight] = -1;
                            this.ArrayRightPosition++;
                            if (this.ArrayRightPosition < this.HelpArraySize) {
                                pSortInfo.UpRight++;
                                pSortInfo.Left++;
                            }
                            else {
                                pSortInfo.UpRight = -1;
                                pSortInfo.Left++;
                            }
                        } else if (this.ArrayLeftPosition >= this.HelpArraySize)
                        {
                            pSortInfo.Array[pSortInfo.Left] = pSortInfo.ArrayUp[pSortInfo.UpRight];
                            pSortInfo.ArrayUp[pSortInfo.UpRight] = -1;
                            this.ArrayRightPosition++;
                            if (this.ArrayRightPosition < this.HelpArraySize) {
                                pSortInfo.UpRight++;
                                pSortInfo.Left++;
                            }
                            else {
                                pSortInfo.UpRight = -1;
                            }
                        }
                    }               
                } else if (this.ArrayLeftPosition >= this.HelpArraySize && this.ArrayRightPosition >= this.HelpArraySize) {
                        this.ArrayLeftPosition = 0;
                        this.ArrayRightPosition = 0;
                        if (this.GlobalPosition + this.HelpArraySize * 2 >= pSortInfo.Array.length)
                        {
                            this.GlobalPosition = 0;
                            this.HelpArraySize *= 2;
                            pSortInfo.Mode = 0;
                        }
                        else
                        {
                            this.GlobalPosition += 2 * this.HelpArraySize;
                        }
                        pSortInfo.UpLeft = this.GlobalPosition;
                        pSortInfo.UpRight = this.GlobalPosition + this.HelpArraySize;
                        pSortInfo.Left = this.GlobalPosition;
                }
                if (this.HelpArraySize === pSortInfo.Array.length) {
                    pSortInfo.Mode = 2;
                }
                break;
            case 2:
                for (var i = 0; i < pSortInfo.Array.length; i++) {
                    if (pSortInfo.ArrayUp[i] >= 0) {
                        pSortInfo.Array[pSortInfo.Left] = pSortInfo.ArrayUp[i];
                        pSortInfo.ArrayUp[i] = -1;
                        pSortInfo.Left++;
                    }
                }
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