// Make sure that the position given is on an unoccupied cell
function generateRandomSpawnLocation(iteration = 0){
    if(iteration > 100) {
        return console.log("GAME OVER: 100 attempts has been made to try and find an available spot without any luck....")
    }
    let yPosition = Math.floor(Math.random() * Game.activeMap.length)
    let xPosition = Math.floor(Math.random() * Game.activeMap[yPosition].length)
    let availableMapGrid = checkIfMapGridIsAvailable(Game.activeMap, {y: yPosition, x: xPosition})
    if(availableMapGrid){
        return {y: yPosition, x: xPosition}
    } else {
        iteration += 1
        return generateRandomSpawnLocation(iteration)
    }
}