
var searchSteps = 0;

function PathNode(parent,x,y) {
   this.parent = parent;
   this.x = x;
   this.y = y;
}

function isRightFree(cursor) {
   if ((cursor[0]+1)>=tableX) {
      return false;
   }
   cs = tableCells[cursor[1]][cursor[0]+1].getAttribute("class");
   if (cs == STYLE_REGULAR || cs == STYLE_FINISH) {
      return true;
   }
   return false;
}

function isLeftFree(cursor) {
   if ((cursor[0]-1)<0) {
      return false;
   }
   cs = tableCells[cursor[1]][cursor[0]-1].getAttribute("class");
   if (cs == STYLE_REGULAR || cs == STYLE_FINISH) {
      return true;
   }
   return false;
}

function isDownFree(cursor) {
   if ((cursor[1]+1)>=tableY) {
      return false;
   }
   cs = tableCells[cursor[1]+1][cursor[0]].getAttribute("class");
   if (cs == STYLE_REGULAR || cs == STYLE_FINISH) {
      return true;
   }
   return false;
}

function isUpFree(cursor) {
   if ((cursor[1]-1)<0) {
      return false;
   }
   cs = tableCells[cursor[1]-1][cursor[0]].getAttribute("class");
   if (cs == STYLE_REGULAR || cs == STYLE_FINISH) {
      return true;
   }
   return false;
}

/* get list of free, not visited nodes of parent node */
function getSurroundingFreeNodes(pathNode) {
    //console.log("getSurroundingFreeNodes ...");
    nodes = new Array();
    actCursor = [parseInt(pathNode.x), parseInt(pathNode.y)];
    if (isRightFree(actCursor)) {
       nodes[nodes.length + 1] = new PathNode(pathNode, pathNode.x + 1, pathNode.y); 
    }
    if (isLeftFree(actCursor)) {
       nodes[nodes.length + 1] = new PathNode(pathNode, pathNode.x - 1, pathNode.y); 
    }
    if (isUpFree(actCursor)) {
       nodes[nodes.length + 1] = new PathNode(pathNode, pathNode.x, pathNode.y - 1); 
    }
    if (isDownFree(actCursor)) {
       nodes[nodes.length + 1] = new PathNode(pathNode, pathNode.x, pathNode.y + 1); 
    }
    //console.log("found " + nodes.length + " free surr. nodes for [" + pathNode.x + "," + pathNode.y + "]");
    return nodes;
}

/* scan surrounding of child nodes */
function scanSurrounding(surroundingNodes) {
   //console.log("scanSurrounding of " + surroundingNodes.length + " nodes !");
   searchSteps++;
   if (surroundingNodes == undefined) {
       return undefined;
   }
   if (surroundingNodes.length == 0) {
       return undefined;
   }
   for (var n in surroundingNodes) {
       if (surroundingNodes[n] == undefined) {
           continue; 
       }
       cellType = tableCells[surroundingNodes[n].y][surroundingNodes[n].x].getAttribute("class");
       if (cellType == STYLE_FINISH) {
          return surroundingNodes[n];
       }
       //console.log("scan surrounding of [" + surroundingNodes[n].x + "," + surroundingNodes[n].y + " ]");
       surroundingNodes[n].type == STYLE_CURSOR;
       tableCells[surroundingNodes[n].y][surroundingNodes[n].x].setAttribute("class", STYLE_CURSOR);
       surrounding = getSurroundingFreeNodes(surroundingNodes[n]);
       finishNode = scanSurrounding(surrounding);
       if (finishNode != undefined) {
           return finishNode;
       }
   }
   return undefined; 
}


/* MAIN search procedure */
function goSearchPath() {
   duration = new Date().getTime();
   searchSteps = 0;
   console.log("goSearchPath ...");
   startNode = new PathNode(undefined, start[0], start[1]);
   console.log("START: [" + startNode.x + "," + startNode.y + "]"); 
   surrounding = getSurroundingFreeNodes(startNode);
   finishNode = scanSurrounding(surrounding);
   duration = new Date().getTime() - duration;
   if (finishNode != undefined) {
      console.log("found finish node: [" + finishNode.x + "," + finishNode.y + "] !");
      pathArray = new Array();
      pathNode = finishNode.parent;
      while(true) {
         pathArray[pathArray.length + 1] = pathNode;
         pathNode = pathNode.parent;
         if (pathNode == undefined) {
             break;
         }
         if (pathNode.parent == undefined) {
             break;
         }
      }
      pathLength = 0;
      for (var n in pathArray) {
         tableCells[pathArray[n].y][pathArray[n].x].setAttribute("class", STYLE_PATH);
         pathLength++;
      } 
      console.log("path is " + pathLength + " elements long.");
      showResults("Target found at [" + finishNode.x + "," + finishNode.y + "]", searchSteps, duration, pathLength); 
   } else {
      console.log("finish node not found ! :(");
      showResults("Path not found ! :)", searchSteps, duration, 0);
   }
   console.log("goSearchPath done in " + duration + " ms in " + searchSteps + " steps");
}




