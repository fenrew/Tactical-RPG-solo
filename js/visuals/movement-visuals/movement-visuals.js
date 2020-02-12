// Adds the available movement map a highlightMap and returns it
function addMovementToHighlightMap(movementMap, movementHighlightMap, playerTurn){
    //This map here is the movementHighlightMap
    let highlightNumber = 1

    if(!playerTurn) highlightNumber = 2

    for(let y = 0; y < movementMap.length; y++){
        for(let x = 0; x < movementMap[y].length; x++){
            if(movementMap[y][x] > 0) {
                movementHighlightMap[y][x].push(highlightNumber)
            }
        }
    }
    
    return movementHighlightMap
}


// Finds the best route for moving to the destination
// After clicking on the square you want to go to, this returns an array of the path your char will take "path"
function findBestMovementRoute(destinationPosition, originalAvailableMovementMap){
    let availableMovementMap = JSON.parse(JSON.stringify(originalAvailableMovementMap))
    let yPos = destinationPosition.y, xPos = destinationPosition.x, 
    currentNumber = availableMovementMap[yPos][xPos], originalPosition = false

    console.log("FINDBESTMOVEMENTROUTE", availableMovementMap, yPos,xPos,currentNumber, originalPosition)

    while (!originalPosition){
        availableMovementMap[yPos][xPos] = "path"
        if(xPos+1 < availableMovementMap[yPos].length && availableMovementMap[yPos][xPos+1] > currentNumber){
            // It may be a bug here... use xPos+1 <= availableMovementMap[yPos].length instead
            xPos += 1
        } else if(xPos-1 >= 0 && availableMovementMap[yPos][xPos-1] > currentNumber){ 
            xPos -= 1
        } else if(yPos+1 < availableMovementMap.length && availableMovementMap[yPos+1][xPos] > currentNumber){
            // It may be a bug here... use yPos+1 <= availableMovementMap.length instead
            yPos += 1
        } else if(yPos-1 >= 0 && availableMovementMap[yPos-1][xPos] > currentNumber){
            yPos -= 1
        } else {
            originalPosition = true
        }
        currentNumber += 1;
    }
    return availableMovementMap
}


// CLEAN UP UNDER HERE!! Also: May not really need the player-{position} id on the players but rather just the id as the player
// Recursive function that runs either xMovementVisuals or yMovementVisuals and visualizes the movement
function movementVisuals(movementRoute, position){
    let y = position.y
    let x = position.x
    let blockElement = document.getElementById("map-grid-block-" + y + "," + x)
    let playerElement = document.getElementById(`player-${y},${x}`)

    blockElement.style.zIndex = "400"

    movementRoute[y][x] = 0
    if(movementRoute[y][x+1] == "path"){
        while(movementRoute[y][x+1] == "path"){
            movementRoute[y][x+1] = 0
            x += 1;
            return xMovementVisuals(x-1, y, x, playerElement, blockElement, movementRoute)
        }
    } else if(movementRoute[y][x-1] == "path"){
        while(movementRoute[y][x-1] == "path"){
            movementRoute[y][x-1] = 0
            x -= 1;
            return xMovementVisuals(x+1, y, x, playerElement, blockElement, movementRoute)
        }
    } else if(y+1 < movementRoute.length && movementRoute[y+1][x] == "path"){
        while(movementRoute[y+1][x] == "path"){
            movementRoute[y+1][x] = 0
            y += 1;
            return yMovementVisuals(y-1, y, x, playerElement, blockElement, movementRoute)
        }
    } else if(y-1 >= 0 && movementRoute[y-1][x] == "path"){
        while(movementRoute[y-1][x] == "path"){
            movementRoute[y-1][x] = 0
            y -= 1;
            return yMovementVisuals(y+1, y, x, playerElement, blockElement, movementRoute)
        }
    } else {
        return //This line is run at the end of the walking animation
    }
}

function yMovementVisuals(yPos, y, x, classElement, blockElement, routeUpdatedMovementMap){
    let marginTop = 0;
    let movementIntervalY = setInterval(function(){
        if(Math.abs(marginTop) >= Math.abs(y-yPos)*77){
            clearInterval(movementIntervalY)
            clearMovementVisuals(classElement, blockElement, x, y)
            return movementVisuals(routeUpdatedMovementMap, position={y, x})
        }
        classElement.style.marginTop = marginTop + "px";
        if(y-yPos > 0) marginTop += 4;
        else marginTop -=4;
    },17)
}

function xMovementVisuals(xPos, y, x, classElement, blockElement, routeUpdatedMovementMap){
    let marginLeft = 0;
    let movementIntervalX = setInterval(function(){
        if(Math.abs(marginLeft) >= Math.abs(x-xPos)*77){
            clearInterval(movementIntervalX)
            clearMovementVisuals(classElement, blockElement, x, y)
            return movementVisuals(routeUpdatedMovementMap, position={y, x})
        }
        classElement.style.marginLeft = marginLeft + "px"
        if(x-xPos > 0) marginLeft += 4
        else marginLeft -= 4
    }, 17)
}

function clearMovementVisuals(classElement, blockElement, x, y){
    classElement.style.margin = 0 + "px";
    blockElement.style.zIndex = 0;
    blockElement.removeChild(blockElement.firstChild)
    classElement.id = "player-" + y + "," + x
    document.getElementById("map-grid-block-" + y + "," + x).appendChild(classElement)
}