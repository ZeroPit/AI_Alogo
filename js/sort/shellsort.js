/* 
    Dateiname  : shellsort.js
    Erstellt   : 2015
    Authoren   : Peter Steensen (550020) and Denny L�ttschwager (343709)
    Projekt    : JavaScript anstelle Java-Applet
    Professor  : Prof. Lang
*/

function ShellSort() {
    var _Actions, _Array;
    this.sortAll = function (array) {
        _Actions = [];
        _Array = array.slice();
        shellsort();
        _Actions.push({type: "done", "done": 0});
        return _Actions;
    };
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
    /**
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
    this.onClick = function (pSortInfo, pOriginal) {
        switch (pSortInfo.Mode) {
            case 0:
                if (pSortInfo.click === pSortInfo.Left) {
                    this.h = this.cols[0];
                    this.i = this.cols[0];
                    pSortInfo.Left = this.i - this.h;
                    pSortInfo.Right = this.i;
                    pSortInfo.Mode++;
                }
                break;

            case 1:
                if (pSortInfo.click === pSortInfo.Left || pSortInfo.click === pSortInfo.Right) {
                    if (this.i < pSortInfo.Array.length) {
                        this.j = this.i;
                        this.t = pSortInfo.Array[this.j];
                        pSortInfo.Left = this.i - this.h;
                        pSortInfo.Right = this.j;

                        if (this.j >= this.h && pSortInfo.Array[this.j - this.h] > this.t)
                        {
                            pSortInfo.Mode++;
                        }
                        else {
                            this.i += 1;
                            pSortInfo.Left++;
                            pSortInfo.Right++;
                        }
                    }
                    else {
                        this.cols.shift();
                        if (this.cols.length == 0) {
                            pSortInfo.Left = -1;
                            pSortInfo.Right = -1;
                            pSortInfo.Mode = 3;
                        }
                        else{
                            pSortInfo.Mode = 0;
                        }
                    }
                }
                break;

            case 2:
                if (pSortInfo.click === pSortInfo.Left || pSortInfo.click === pSortInfo.Right) {
                    if (this.j >= this.h && pSortInfo.Array[this.j - this.h] > this.t) {
                        pSortInfo.Array[this.j] = pSortInfo.Array[this.j - this.h];
                        this.j = this.j - this.h;
                        pSortInfo.Array[this.j] = this.t;

                        if (this.j >= this.h && pSortInfo.Array[this.j - this.h] > this.t) {
                            pSortInfo.Left -= this.h;
                            pSortInfo.Right -= this.h;
                        }
                        else {
                            pSortInfo.Mode = 1;
                            pSortInfo.Left++;
                            pSortInfo.Right++;
                            this.i += 1;
                        }
                    }
                    else {
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