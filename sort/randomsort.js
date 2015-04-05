function randomsort1(array, step) {
    var actions = [];
    function swap(i, j) {
        var a = array[j].a;
        array[j].a = array[i].a;
        array[i].a = a;
        var b = array[j].b;
        array[j].b = array[i].b;
        array[i].b = b;
        actions.push({type: "swap", i: i, j: j});
    }
    function random() {
        return   Math.floor(Math.random() * step);
    }
    function randomsort() {

        //Wiederhole
        var Steps = 0;
        var StepsMax = 10000;
        var row, col;        
        do {
            //wähle einen zufälligen Bildpunkt (row, col)
            row = random();
            col = random();
            //wenn a(row, col) > red(row , col +1 )  
            if (col > 0)
            {
                if (array[row * step + col-1].a > array[row * step + col].a)
                    swap(row * step + col-1, row * step + col);
            }
            //wähle einen zufälligen Bildpunkt (row, col)
            row = random();
            col = random();
            if (row > 0)
            {
                //wenn b(row, col) > red(row-1 , col )
                if (array[row * step + col].b > array[(row - 1) * step + col].b)
                    swap(row * step + col, (row - 1) * step + col);
            }
            Steps++;
        }
        while (Steps<=StepsMax);
    }

    randomsort();
    return actions;
}

function randomsort2(array, step) {
    var actions = [];
    function swap(i, j) {
        var a = array[j].a;
        array[j].a = array[i].a;
        array[i].a = a;
        var b = array[j].b;
        array[j].b = array[i].b;
        array[i].b = b;
        actions.push({type: "swap", i: i, j: j});
    }
    function random() {
        return   Math.floor(Math.random() * step);
    }
    function randomsort() {

        //Wiederhole
        var Steps = 0;
        var StepsMax = 10000;
        var row, col;        
        do {
            //wähle einen zufälligen Bildpunkt (row, col)
            row = random();
            col = random();
            //wenn a(row, col) > red(row , col +1 )  
            if (col > 0)
            {
                if (array[row * step + col-1].a > array[row * step + col].a)
                    swap(row * step + col-1, row * step + col);
            }
            //wähle einen zufälligen Bildpunkt (row, col)
            row = random();
            col = random();
            if (row > 0)
            {
                //wenn b(row, col) > red(row-1 , col )
                if (array[row * step + col].b > array[(row - 1) * step + col].b)
                    swap(row * step + col, (row - 1) * step + col);
            }
            Steps++;
        }
        while (Steps<=StepsMax);
    }

    randomsort();
    return actions;
}

function randomsort3(array, step) {
    var actions = [];
    function swap(i, j) {
        var a = array[j].a;
        array[j].a = array[i].a;
        array[i].a = a;
        var b = array[j].b;
        array[j].b = array[i].b;
        array[i].b = b;
        actions.push({type: "swap", i: i, j: j});
    }
    function random() {
        return   Math.floor(Math.random() * step);
    }
    function randomsort() {

        //Wiederhole
        var Steps = 0;
        var StepsMax = 10000;
        var row, col;        
        do {
            //wähle einen zufälligen Bildpunkt (row, col)
            row = random();
            col = random();
            //wenn a(row, col) > red(row , col +1 )  
            if (col > 0)
            {
                if (array[row * step + col-1].a > array[row * step + col].a)
                    swap(row * step + col-1, row * step + col);
            }
            //wähle einen zufälligen Bildpunkt (row, col)
            row = random();
            col = random();
            if (row > 0)
            {
                //wenn b(row, col) > red(row-1 , col )
                if (array[row * step + col].b > array[(row - 1) * step + col].b)
                    swap(row * step + col, (row - 1) * step + col);
            }
            Steps++;
        }
        while (Steps<=StepsMax);
    }

    randomsort();
    return actions;
}