// returns an array that show where a character is allowed to move and how many movementpoints it requires
function findAvailableMovementArea(player, map){
    let newMovementMap,
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
                    if(checkIfInsideOfMap(newMovementMap, y-1, x) && newMovementMap[y-1][x] < movement){
                        newMovementMap[y-1][x] = movement
                    }
                    if(checkIfInsideOfMap(newMovementMap, y+1, x) && newMovementMap[y+1][x] < movement){
                        newMovementMap[y+1][x] = movement
                    }
                    if(checkIfInsideOfMap(newMovementMap, y, x+1) && newMovementMap[y][x+1] < movement){
                        newMovementMap[y][x+1] = movement
                    }
                    if(checkIfInsideOfMap(newMovementMap, y, x-1) && newMovementMap[y][x-1] < movement){
                        newMovementMap[y][x-1] = movement
                    }
                }
            }
        }
    }

    return newMovementMap
}


// Confirming the movement to position on Click event
function confirmMovementToPosition(position, availableMovementMap){
    let player = Game.combatTimeline[Game.turn]
    Game.activeMap[player.position.y][player.position.x] = Game.originalMap[player.position.y][player.position.x]
    if(player.npc){
        player.class.combatstats.currentMovementPoints = availableMovementMap[position.y][position.x]-1
        //BUG: NPC 7,15. cannot read property "y" of undefined
    } else {
        player.class.combatstats.currentMovementPoints = Game.availableMovementMap[position.y][position.x]-1
    }
    player.position = position
    Game.activeMap[player.position.y][player.position.x] = player.playerNumber

}