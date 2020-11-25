
var INPUT_OBSTACLES = "obstacles";
var INPUT_START     = "start";
var INPUT_FINISH    = "finish";

var STYLE_REGULAR  = "regular-style";
var STYLE_START    = "start-style";
var STYLE_FINISH   = "finish-style";
var STYLE_OBSTACLE = "obstacle-style";
var STYLE_CURSOR   = "cursor-style";
var STYLE_PATH     = "path-style";

var tableCells;
var inputType = INPUT_OBSTACLES;
var inputsDisabled = false;
var level = "easy";

var obstacles;
var start;
var finish;

function initOnPageLoad() {
    loadLevelData(level);
    createTable("dataTableWrapper");
}

function loadLevelData(levelID) {
    //console.log("loadLevelData 1 start[" + start[0] + "," + start[1] + "]");
    obstacles = levels[levelID]["obstacles"];
    start = levels[levelID]["start"];
    finish = levels[levelID]["finish"];
    level = levelID;
    showStartFinistData();
    console.log("loadLevelData 2 start[" + start[0] + "," + start[1] + "]");
}

function createTable(wrapperId) {
    tableEl = document.getElementById(wrapperId).getElementsByTagName("table");
    if (tableEl.length > 0) {
       document.getElementById(wrapperId).removeChild(tableEl[0]);
    }
    console.log("creating dataTable start[" + start[0] + "," + start[1] + "]");
    wrapperElement = document.getElementById(wrapperId);
    table = document.createElement("table");
    tableBody = document.createElement("tbody");
    tableCells = new Array(tableY);
    for (y=0; y<tableY; y++) {
       //console.log("creating tr element ...");
       tr = document.createElement("tr");
       tableCells[y] = new Array(tableX);
       for (x=0; x<tableX; x++) {
          td = document.createElement("td");
          td.setAttribute("onclick", "onDataGridClick('" + x + "','" + y + "');");
          td.setAttribute("onmouseenter", "onDataGridMouseEnter('" + x + "','" + y + "');"); 
          td.setAttribute("onmouseleave", "onDataGridMouseLeave('" + x + "','" + y + "');"); 
          applyStyle(x,y,td);
          tr.appendChild(td);
          tableCells[y][x] = td;
       }
       tableBody.appendChild(tr);
    }
    table.appendChild(tableBody);
    wrapperElement.appendChild(table);
}

function applyStyle(x, y, tdElement) {
    if (x == start[0] && y == start[1]) {
        tdElement.setAttribute("class", STYLE_START);
        return;
    }
    if (x == finish[0] && y == finish[1]) {
        tdElement.setAttribute("class", STYLE_FINISH);
        return;
    }
    for (var id in obstacles) {
        if (x == obstacles[id][0] && y == obstacles[id][1]) {
           //console.log("creating obstacle at [" + x + "," + y + "]");
           tdElement.setAttribute("class", STYLE_OBSTACLE);
           return;
        }
    }
    //console.log("creating regular at [" + x + "," + y + "]");
    tdElement.setAttribute("class", STYLE_REGULAR);
}

function startAction() {
    console.log("startAction: cursor at [" + start[0] + "," + start[1] + "]");
    button = document.getElementById("startStopBtn");
    button.innerHTML = "Reset";
    button.setAttribute("onclick", "resetAction();");
    button.setAttribute("title", "reset results");
    clearResults();
    disableInputs();
    goSearchPath();
    enableInputs();
}

function resetAction() {
    console.log("resetAction");
    button = document.getElementById("startStopBtn");
    button.innerHTML = "Go !";
    button.setAttribute("onclick", "startAction();");
    button.setAttribute("title", "start searching ...");
    createTable("dataTableWrapper");
    clearResults();
}

function disableInputs() {
    inputTypeSelector = document.getElementById("inputTypeSelector");
    inputTypeSelector.disabled = true;
    inputsDisabled = true;
    button = document.getElementById("startStopBtn");
    button.disabled = true; 
}

function enableInputs() {
    inputTypeSelector = document.getElementById("inputTypeSelector");
    inputTypeSelector.disabled = false;
    inputsDisabled = false;
    button = document.getElementById("startStopBtn");
    button.disabled = false; 
}

function onDataGridClick(x,y) {
    console.log("onDataGridClick: [" + x + "," + y + "] inputType=" + inputType + ", inputsDisabled=" + inputsDisabled);
    if (!inputsDisabled) {
       inputTypeSelector = document.getElementById("inputTypeSelector");
       inputType = inputTypeSelector.options[inputTypeSelector.selectedIndex].value; 
       tableCell = tableCells[y][x];
       styleClass = tableCell.getAttribute("class");
       if (inputType == INPUT_OBSTACLES) {
         if (styleClass == STYLE_REGULAR) {
             tableCell.setAttribute("class", STYLE_OBSTACLE);
             exportObstacles();
         } else if (styleClass == STYLE_OBSTACLE) {
             tableCell.setAttribute("class", STYLE_REGULAR);
         } 
       } else if (inputType == INPUT_START) {
         if ((styleClass == STYLE_REGULAR || styleClass == STYLE_OBSTACLE) && styleClass != STYLE_FINISH) {
             tableCells[start[1]][start[0]].setAttribute("class", STYLE_REGULAR);
             start[0] = parseInt(x); start[1] = parseInt(y);
             tableCell.setAttribute("class", STYLE_START);
             console.log("onDataGridClick: start[" + start[0] + ","+ start[1] + "]");
         }
       } else if (inputType == INPUT_FINISH) {
         if ((styleClass == STYLE_REGULAR || styleClass == STYLE_OBSTACLE) && styleClass != STYLE_START) {
             tableCells[finish[1]][finish[0]].setAttribute("class", STYLE_REGULAR);
             finish[0] = parseInt(x); finish[1] = parseInt(y);
             tableCell.setAttribute("class", STYLE_FINISH);
             console.log("onDataGridClick: finish[" + finish[0] + ","+ finish[1] + "]");
         }
       }
       showStartFinistData(); 
    }
}

function onDataGridMouseEnter(x,y) {
    //console.log("onDataGridMouseEnter: [" + x + "," + y + "]");
    posX = document.getElementById("ppositionX");
    posY = document.getElementById("ppositionY");
    cellType = document.getElementById("pcellType");
    if (x<10) {
      posX.innerHTML = "0" + x;
    } else {
      posX.innerHTML = x;
    }
    if (y<10) {
      posY.innerHTML = "0" + y;
    } else {
      posY.innerHTML = y;
    }
    cellTypeStr = tableCells[y][x].getAttribute("class");
    if (cellTypeStr == STYLE_REGULAR) {
       cellType.innerHTML = "Empty";
    } else if (cellTypeStr == STYLE_START) {
       cellType.innerHTML = "START";
    } else if (cellTypeStr == STYLE_FINISH) {
       cellType.innerHTML = "FINISH";
    } else if (cellTypeStr == STYLE_OBSTACLE) {
       cellType.innerHTML = "Obstacle";
    } else if (cellTypeStr == STYLE_CURSOR) {
       cellType.innerHTML = "Visited";
    } else if (cellTypeStr == STYLE_PATH) {
       cellType.innerHTML = "Path element";
    }
    tableCells[y][x].style.opacity = "0.5"; 
}

function loadLevel() {
    inputSelector = document.getElementById("difficultyLevelSelector");
    levelID = inputSelector.options[inputSelector.selectedIndex].value;
    if (levels[levelID] != undefined) {
        console.log("selecting level: " + levelID);
        loadLevelData(levelID);
        createTable("dataTableWrapper");
        resetAction();
    } else {
        console.log("no data for level: " + levelID);
    }    
}

function onDataGridMouseLeave(x,y) {
    //console.log("onDataGridMouseLeave: [" + x + "," + y + "]");
    tableCells[y][x].style.opacity = "1";
}

function showResults(text, steps, time, pathlength) {
   resultElement = document.getElementById("resultMessage");
   resultElement.innerHTML = text;
   resultElement = document.getElementById("stepsTaken");
   resultElement.innerHTML = steps;
   resultElement = document.getElementById("timeSpend");
   resultElement.innerHTML = time;
   resultElement = document.getElementById("pathNodes");
   resultElement.innerHTML = pathlength;
   resultElement = document.getElementById("levelName");
   resultElement.innerHTML = level;
}

function clearResults() {
   resultElement = document.getElementById("resultMessage");
   resultElement.innerHTML = "NA";
   resultElement = document.getElementById("stepsTaken");
   resultElement.innerHTML = "0";
   resultElement = document.getElementById("timeSpend");
   resultElement.innerHTML = "0";
   resultElement = document.getElementById("pathNodes");
   resultElement.innerHTML = "0";
   resultElement = document.getElementById("levelName");
   resultElement.innerHTML = level;
}

function showStartFinistData() {
   document.getElementById("spositionX").innerHTML = start[0];
   document.getElementById("spositionY").innerHTML = start[1];
   document.getElementById("fpositionX").innerHTML = finish[0];
   document.getElementById("fpositionY").innerHTML = finish[1];
}

function exportObstacles() {
   obstacles = [];
   for (var y in tableCells) {
       for (var x in tableCells[y]) {
           if (tableCells[y][x].getAttribute("class") == STYLE_OBSTACLE) {
               obstacles[obstacles.length + 1] = [x,y];
           }
       } 
   }
}

function exportLevelDataToJSONStr() {
   console.log("\"levelName\": {");
   console.log("      \"start\": [" + start[0] + "," + start[1] + "],");
   console.log("      \"finish\": [" + finish[0] + "," + finish[1] + "],");
   console.log("      \"obstacles\": [");
   strData = "";
   for (var y in tableCells) {
       for (var x in tableCells[y]) {
           if (tableCells[y][x].getAttribute("class") == STYLE_OBSTACLE) {
               strData = strData + " [" + x + "," + y + "], ";
           }
       } 
   }
   console.log("          " + strData);
   console.log("       ]");
   console.log("}");
}

 
