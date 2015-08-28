/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var eArrayTyp = {
    Random: 0,
    Up: 1,
    Down: 2,
    RandomOneToHundred: 3
};

var eSort = {
    bubblesort: 0,
    selectionsort: 1,
    insertionsort: 2,
    shellsort: 3,
    quicksort: 4,
    heapsorter: 5,
    mergesort: 6,
    bitonicsorter: 7,
    oddeventranspositionsort: 8,
    oddevenmergesorter: 9,
    bogosort: 10
};


function includeAll() {
    //D3js für die verarbeitung
    include('d3/d3.min.js');

    //Sortier Anzeigen
    include('sort/animate-sort-new.js');
    include('sort/animate-sort-old.js');
    include('sort/animate-sort2.js');

    //Sortierverfahren
    include('sort/bubblesort.js');
    include('sort/selectionsort.js');
    include('sort/insertionsort.js');
    include('sort/shellsort.js');
    include('sort/quicksort.js');
    include('sort/heapsorter.js');
    include('sort/mergesort.js');
    include('sort/bitonicsorter.js');
    include('sort/oddeventranspositionsort.js');
    include('sort/oddevenmergesorter.js');
    include('sort/bogosort.js');
}
function include(file) {
    document.write('<script type="text/javascript" src="' + file + '"></script>');
}

function getSortClass(pSortID) {
    switch (pSortID) {
        case eSort.bubblesort:
            return new BubbleSort();
            break;
        case eSort.selectionsort:
            return new SelectionSort();
            break;
        case eSort.insertionsort:
            return new InsertionSort();
            break;
        case eSort.shellsort:
            return new ShellSort();
            break;
        case eSort.quicksort:
            return new Quicksort();
            break;
        case eSort.heapsorter:
            return new Heapsort();
            break;
        case eSort.mergesort:
            return new MergeSorter();
            break;
        case eSort.bitonicsorter:
            return new BitonicSorter();
            break;
        case eSort.oddeventranspositionsort:
            return new OddEvenTranspositionSort();
            break;
        case eSort.oddevenmergesorter:
            return new OddEvenMergeSorter();
            break;
        case eSort.bogosort:
            return new Bogosort();
            break;
    }
}


// Erstellung eines Array für die Sortierung
//
// pArrayTyp siehe eArrayTyp
//
// pMaxSteps Sollte immer ein Vierfaches von 2 sein zum Beispiel: 64 oder 128
// Anderefals Laufen die Sortieverfahren bitonicsorter und oddevenmergesorter nicht zufrieden stellend 
function creatArray(pArrayTyp, pMaxSteps) {
    var index = d3.range(pMaxSteps);
    switch (pArrayTyp) {
        case eArrayTyp.Random:
            return shuffleRandom(index.slice());
            break;
        case eArrayTyp.Up:
            return index.slice();
            break;
        case eArrayTyp.Down:
            return index.slice().sort(function(a, b){return b-a});
            break;
        case eArrayTyp.RandomOneToHundred:          
            return randomOneToHundred(index.slice());
            break;
    }
}

function shuffleRandom(array) {
    var i = array.length, j, t;
    while (--i > 0) {
        j = ~~(Math.random() * (i + 1));
        t = array[j];
        array[j] = array[i];
        array[i] = t;
    }
    return array;
}
function randomOneToHundred(array) {
    var i = array.length, j;
    var lmax = Math.min(100,i);
    while (--i > 0) {
        j = ~~(Math.random() * (lmax + 1));      
        array[i] = j;       
    }
    return array;
}
/*
 * Benutzungs Hild für die Anzeige der Neuen Sortier Anzeige
 * initSortNew
 * Generiert die Auszugebene Klasse mit dem enstrechendem Array
 * 
 * addToSortNew
 * Fügt einen Sortierverfahren hinzu
 * 
 * startSortNew
 * Startet alle hinzugefügten Sortiervefarhen mit dem aktuellen Array
 */
var SortNewDic = {};
var SortNew = null;
function initSortNew(pArrayTyp, pMaxSteps) {
    if (SortNew !== null) {
        for (var key in SortNewDic) {
            d3.select(key).select("svg").remove();
        }
    }
    SortNew = new SortingAnimationNew(creatArray(pArrayTyp, pMaxSteps),pMaxSteps);   
    for (var key in SortNewDic) {
        d3.select(key).on("click", function () {
            var pSortAreaID = "#" + this.id;
            d3.select(pSortAreaID).select("svg").remove();
            SortNew.add(SortNewDic[pSortAreaID].sortAll, pSortAreaID);            
        });
        SortNew.add(SortNewDic[key].sortAll, key);
    }
    SortNew.reset();
    SortNew.start(1000);    
}
function addToSortNew(pSortAreaID, pSortID) {
    SortNewDic[pSortAreaID] = getSortClass(pSortID);
}
function startSortNew() {
    if (SortNew !== null) {
        for (var key in SortNewDic) {
            d3.select(key).select("svg").remove();
            SortNew.add(SortNewDic[key].sortAll, key);
        }
        SortNew.start(1000);
    }
}

/*
 * Benutzungs Hild für die Anzeige der Alten Sortier Anzeige
 * initSortOld
 * Generiert die Auszugebene Klasse mit dem enstrechendem Array
 * 
 * addToSortOld
 * Fügt einen Sortierverfahren hinzu
 * 
 * startSortOld
 * Startet alle hinzugefügten Sortiervefarhen mit dem aktuellen Array
 */
var SortOldDic = {};
var SortOld = null;
function initSortOld(pArrayTyp, pMaxSteps) {
    if (SortOld !== null) {
        for (var key in SortOldDic) {
            d3.select(key).select("svg").remove();
        }
    }
    SortOld = new SortingAnimationOld(creatArray(pArrayTyp, pMaxSteps),pMaxSteps);   
    for (var key in SortOldDic) {
        d3.select(key).on("click", function () {
            var pSortAreaID = "#" + this.id;
            d3.select(pSortAreaID).select("svg").remove();
            SortOld.add(SortOldDic[pSortAreaID].sortAll, pSortAreaID);
        });
        SortOld.add(SortOldDic[key].sortAll, key);       
    }
    SortOld.reset();
    SortOld.start(1000);
}
function addToSortOld(pSortAreaID, pSortID) {
    SortOldDic[pSortAreaID] = getSortClass(pSortID);
}
function startSortOld() {
    if (SortOld !== null) {
        for (var key in SortOldDic) {
            d3.select(key).select("svg").remove();
            SortOld.add(SortOldDic[key].sortAll, key);
        }
        SortOld.start(1000);
    }
}


