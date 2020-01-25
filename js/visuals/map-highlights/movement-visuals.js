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