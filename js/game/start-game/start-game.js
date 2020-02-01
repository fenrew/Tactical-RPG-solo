function setupGame(amountOfPlayers){
    let map = Game.activeMap

    for(let i = 0; i <= amountOfPlayers; i++){
        Game._addPlayerToGame(i)
    }

    visualizeMap(map)

    map = removeStartingPositions(map)

    visualizePlayers(map)

    Game._addPlayersToCombatTimeline()
    Game._updateInitiation()

    addOnClickPlayers()
}


// This is the first time visualization of the map
function visualizeMap(map){
    let className, newElement, parentDiv

    parentDiv = document.getElementById("player-area")

    for(let y = 0; y < map.length; y++){
        for(let x = 0; x < map[y].length; x++){
            if(map[y][x] >= 0 && map[y][x] < 20){
                className = returnMapBlockClass(21) //Returns grass when there is a player starting position
            } else {
                className = returnMapBlockClass(map[y][x])
            }
            gridBlockElement = document.createElement("div")

            gridBlockElement.classList.add(className, "map-grid-block")
            gridBlockElement.id = "map-grid-block-" + y + "," + x

            parentDiv.appendChild(gridBlockElement)
        }
    }
}

function updateVisualizeMap(){
    let map = Game.activeMap, parentDiv

    parentDiv = document.getElementById("player-area")

    removeAllChilds(parentDiv)

    visualizeMap() // This function doesn't work when the players are already set. If they stand on sand it'll return grass
}

function visualizePlayers(map) {
    let playerClassName, classClassName, newElement, parentDiv

    for(let y = 0; y < map.length; y++){
        for(let x = 0; x < map[y].length; x++){
            if(map[y][x] >= 0 && map[y][x] < 10){
                parentDiv = document.getElementById("map-grid-block-"+y+","+x)

                playerBlockElement = document.createElement("div")

                playerClassName = "player" + map[y][x] +"-playerarea"
                classClassName = Game._getPlayer(map[y][x]).class.cssString

    
                playerBlockElement.classList.add(playerClassName, classClassName)
                playerBlockElement.id = "player-" + y + "," + x
    
                parentDiv.appendChild(playerBlockElement)
            }
        }
    }
}

function visualizeNpcs(map){
    for(let y = 0; y < map.length; y++){
        for(let x = 0; x < map[y].length; x++){
            if(map[y][x] >= 70 && map[y][x] < 91){
                let npcBlockElement = document.createElement("div")
                
                parentDiv = document.getElementById("map-grid-block-"+y+","+x)
                removeAllChilds(parentDiv)

                npcClassName = "npc" + map[y][x] +"-playerarea"
                classClassName = Game._getNpc({y, x}).class.cssString


                npcBlockElement.classList.add(npcClassName, classClassName)
                npcBlockElement.id = "npc-" + y + "," + x
    
                parentDiv.appendChild(npcBlockElement)
            }
        }
    }
}