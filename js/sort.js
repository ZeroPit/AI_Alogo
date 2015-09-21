/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * ArrayTyp Enum
 * @type int
 */
var eArrayTyp = {
    Random: 0,
    Up: 1,
    Down: 2,
    RandomOneToHundred: 3
};
/*
 * Sort Enum
 * @type type
 */
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

/*
 * Läde alle benötigten JS Datei nach 
 * sodass sie nicht in der HTML gesetzt werden müssen
 * @returns {undefined}
 */
function includeAll() {
    //D3js für die verarbeitung
    include('js/d3/d3.min.js');

    //Sortier Anzeigen
    include('js/animate/animate-sort-new.js');
    include('js/animate/animate-sort-old.js');
    include('js/animate/animate-randomsort.js');  
    include('js/animate/animate-heapsort.js');
    include('js/animate/animate-usersort.js');
    include('js/animate/animate-usersort-2.js');
   

    //Sortierverfahren
    include('js/sort/bubblesort.js');
    include('js/sort/selectionsort.js');
    include('js/sort/insertionsort.js');
    include('js/sort/shellsort.js');
    include('js/sort/quicksort.js');
    include('js/sort/heapsort.js');
    include('js/sort/mergesort.js');
    include('js/sort/bitonicsort.js');
    include('js/sort/oddeventranspositionsort.js');
    include('js/sort/oddevenmergesort.js');
    include('js/sort/bogosort.js');
    
    include('js/randomsort.js');
    
}
/*
 * Schreibt die JS Datei an die position 
 * an der die  sort.js Datei ausgeführt wird
 * @param {string} pFile
 * @returns {undefined}
 */
function include(pFile) {
    document.write('<script type="text/javascript" src="' + pFile + '"></script>');
}
includeAll();

/*
 * Erzeugt die entsprechende Klasse
 * @param {type} pSortID
 * @returns {Bogosort|SelectionSort|Quicksort|ShellSort|BubbleSort|OddEvenTranspositionSort|MergeSorter|BitonicSorter|InsertionSort|Heapsort|OddEvenMergeSorter}
 */
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

/*
 * Erstellung eines Array für die Sortierung
 * @param {int} pArrayTyp
 * siehe eArrayTyp
 * @param {int} pMaxSteps
 * Sollte immer ein Vierfaches von 2 sein zum Beispiel: 64 oder 128
 * Anderefals Laufen die Sortieverfahren bitonicsorter und oddevenmergesorter nicht zufrieden stellend
 * @returns {lArray}
 */
function creatArray(pArrayTyp, pMaxSteps) {   
    var lArray = d3.range(pMaxSteps);
    switch (pArrayTyp) {
        case eArrayTyp.Random:
            return shuffleRandom(lArray.slice());
            break;
        case eArrayTyp.Up:
            return lArray.slice();
            break;
        case eArrayTyp.Down:
            return lArray.slice().sort(function(a, b){return b-a});
            break;
        case eArrayTyp.RandomOneToHundred:          
            return randomOneToHundred(lArray.slice());
            break;
    }
    return lArray.slice();
}
/*
 * Mischt das Array zufällig durch
 * @param {type} pArray
 * @returns {pArray}
 */
function shuffleRandom(pArray) {
    var i = pArray.length, j, t;
    while (--i > 0) {
        j = ~~(Math.random() * (i + 1));
        t = pArray[j];
        pArray[j] = pArray[i];
        pArray[i] = t;
    }
    return pArray;
}
/*
 * Setzt neue Eintrage in das Array 
 * zwischen 1 und max 100
 * @param {type} pArray
 * @returns {pArray}
 */
function randomOneToHundred(pArray) {
    var i = pArray.length, j;
    var lmax = Math.min(100,i);
    while (--i > 0) {
        j = ~~(Math.random() * (lmax + 1));      
        pArray[i] = j;       
    }
    return pArray;
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

/*
 * Heapsort Baumdarstellung
 * 
 * initHeapsortTree
 * Generiert die Auszugebene Klasse
 */
var HeapsortTree = null;
function initHeapsortTree(pSortAreaID){
     HeapsortTree = new heapsortTree(pSortAreaID);
}

/*
 * Usersort Grafische Darstellung
 * 
 * initHeapsortTree
 * Generiert die Auszugebene Klasse
 */
var UserSortAll = null;
function initUserSort(pSortAreaID) {
    UserSortAll = new UserSorting2(pSortAreaID);
}
/*
 * Random Sort Züfallige Bild Erzeugung
 * 
 * initRandomSort
 * Generiert die Auszugebene Klasse
 */
var SortRandomDic = {};
var SortRandom = null;
function initSortRandom(pWidth,pStep) {
    if (SortRandom !== null) {
        for (var key in SortRandomDic) {
            d3.select(key).select("svg").remove();
        }
    }
    SortRandom = new SortingAnimationRandom(pWidth,pStep,creatRGB((pStep*pStep)-1));   
    for (var key in SortRandomDic) {
        d3.select(key).on("click", function () {
            var pSortAreaID = "#" + this.id;
            d3.select(pSortAreaID).select("svg").remove();
            SortRandom.add(SortRandomDic[pSortAreaID].sort, pSortAreaID);
            SortRandom.restart();
        });
        SortRandom.add(SortRandomDic[key].sort, key);       
    }
    SortRandom.reset();
    SortRandom.start(1000);
}

function addToSortRandom(pSortAreaID, pSortID) {    
    SortRandomDic[pSortAreaID] = new RandomSort(pSortID);
}
function startSortRandom() {
    if (SortRandom!== null) {
        for (var key in SortRandomDic) {
            d3.select(key).select("svg").remove();
            SortRandom.add(SortRandomDic[key].sort, key);          
        }
        SortRandom.start(1000);
    }
}
function stopSortRandom() {
    if (SortRandom!== null) {       
        SortRandom.reset();
    }
}

