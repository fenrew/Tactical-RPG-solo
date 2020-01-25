// returns an array that show where a character is allowed to move
function findAvailableMovementArea(player, map){
    let newMovementMap, movementHighlightMap, currentMovementPoints
    remainingMovementPoints = player.class.combatstats.currentMovementPoints + 1
    
    // Creates a map array of where im allowed to move (0) and where there are obstacles ("obstacle")
    newMovementMap = map.map((y) => {return y.map((x) => {
        if(x > 20 && x < 30){
            return 0
        } else {
            return "obstacle"
        }
    })})

    newMovementMap[player.position.y][player.position.x] = remainingMovementPoints

    for(let movement = remainingMovementPoints-1; movement > 0; movement--){
        for(let y = 0; y < newMovementMap.length; y++){
            for(let x = 0; x < newMovementMap[y].length; x++){
                if(newMovementMap[y][x] === movement+1){
                    if(newMovementMap[y-1][x] < movement){
                        newMovementMap[y-1][x] = movement
                    }
                    if(newMovementMap[y+1][x] < movement){
                        newMovementMap[y+1][x] = movement
                    }
                    if(newMovementMap[y][x+1] < movement){
                        newMovementMap[y][x+1] = movement
                    }
                    if(newMovementMap[y][x-1] < movement){
                        newMovementMap[y][x-1] = movement
                    }
                }
            }
        }
    }

    console.log(newMovementMap)

    return newMovementMap
}