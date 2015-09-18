function RandomSort(pSortArtID) {
    var _Actions, _Array, _Step,_Lenght;
    var SortArtID = pSortArtID;
    var _Mode, _ShowRGB;  
    
    var SortArt = [{mode:[0,1,2,3],showRGB:[0,1,2]},
        {mode:[0,1],showRGB:[0,1,2]},
        {mode:[0,1],showRGB:[0]},
        {mode:[0,1],showRGB:[1]},
        {mode:[0,1],showRGB:[2]},
        
        {mode:[2,3],showRGB:[0,1,2]},
        {mode:[2,3],showRGB:[0]},
        {mode:[2,3],showRGB:[1]},
        {mode:[2,3],showRGB:[2]},
        
        {mode:[0,2],showRGB:[0,1]},
        {mode:[0,2],showRGB:[1,2]},
        {mode:[1,3],showRGB:[0,1]},
        {mode:[1,3],showRGB:[1,2]}
    ];
      
    
    
    this.sort = function (pArray,pStep) {
        _Actions = [];
        _Array = pArray.slice();
        _Step = pStep;
        _Lenght = (pStep *pStep ) -1;  
        _Mode = SortArt[SortArtID].mode;       
        _ShowRGB = SortArt[SortArtID].showRGB;
        
        randomsort();
        return  _Actions;
    };    
    function swap(i, j) {
        var v = _Array[j].v;
        _Array[j].v = _Array[i].v;
        _Array[i].v = v;       
        _Actions.push({type: "swap", i: i, j: j});
    }
    function random(pMax) {
        return   Math.floor(Math.random() * pMax);
    }
    function randomsort() {
        //Wiederhole
        var Steps = 0;
        var StepsMax = 1000;
        var lRow, lCol, lMode, lShowRGB;
        do {
            //w�hle einen zuf�lligen Bildpunkt (row, col)
            lRow = random(_Step);
            lCol = random(_Step);  
            lMode = _Mode[random(2)]; 
            lShowRGB = _ShowRGB[random(2)]; 
                       
            show(lRow, lCol, lMode, lShowRGB);
            Steps++;
        }
        while (Steps <= StepsMax);
    }
    function show(pRow, pCol, pMode, pShowRGB) {
        var lIndex1, lIndex2;
        lIndex1 = pRow * _Step + pCol;      
        switch (pMode) {           
            case 1:
                lIndex2 = (pRow - 1) * _Step + pCol;
                break;
            case 2:
                lIndex2 = (pRow - 1) * _Step + pCol + 1;
                break;
            case 3:
                lIndex2 = pRow * _Step + pCol + 1;
                break;
            case 4:
                lIndex2 = (pRow+1) * _Step + pCol + 1;
                break;
            case 5:
                lIndex2 = (pRow + 1) * _Step + pCol;
                break;
            case 6:
                lIndex2 = (pRow + 1) * _Step + pCol - 1;
                break;
            case 7:
                lIndex2 = pRow * _Step + pCol - 1;
                break;
             case 0:
                lIndex2 = (pRow -1)  * _Step + pCol - 1;
                break;
        }                
        if(!(0 <= lIndex2 && lIndex2 < _Lenght))
            return ;
        switch (pShowRGB) {
            case 0:               
                    if (_Array[lIndex1].v.r > _Array[lIndex2].v.r)
                        swap(lIndex1, lIndex2);             
                break;
            case 1:             
                    if (_Array[lIndex1].v.g > _Array[lIndex2].v.g)
                        swap(lIndex1, lIndex2);           
                break;
            case 2:              
                    if (_Array[lIndex1].v.b > _Array[lIndex2].v.b)
                        swap(lIndex1, lIndex2);           
                break;
        }
    }
    return this;
}