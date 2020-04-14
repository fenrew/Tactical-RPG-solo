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

                displayCurrentHealthBar(Game._getPlayer(map[y][x]))
                displayCurrentManaBar(Game._getPlayer(map[y][x]))
            }
        }
    }
}

function visualizeNpcs(map, npcToBeAdded){
    npcToBeAdded.forEach((npc) => {
        const {y, x} = npc.position

        let npcBlockElement = document.createElement("div")
        //const npc = Game._getNpc({y, x})
        
        parentDiv = document.getElementById("map-grid-block-"+y+","+x)
        removeAllChilds(parentDiv)
        
        npcClassName = "npc" + map[y][x] +"-playerarea"
        classClassName = npc.class.cssString
        
        
        npcBlockElement.classList.add(npcClassName, classClassName, "npc-area")
        npcBlockElement.id = "npc-" + y + "," + x
        
        addOnClickToNpc(npcBlockElement, npc)

        parentDiv.appendChild(npcBlockElement)

        displayCurrentHealthBar(Game._getNpc({y, x}))
        displayCurrentManaBar(Game._getNpc({y, x}))
    })

    //=======================================
    for(let y = 0; y < map.length; y++){
        for(let x = 0; x < map[y].length; x++){
            if(map[y][x] >= 70 && map[y][x] < 91){
                // let npcBlockElement = document.createElement("div")
                // const npc = Game._getNpc({y, x})
                
                // parentDiv = document.getElementById("map-grid-block-"+y+","+x)
                // removeAllChilds(parentDiv)
                
                // npcClassName = "npc" + map[y][x] +"-playerarea"
                // classClassName = npc.class.cssString
                
                
                // npcBlockElement.classList.add(npcClassName, classClassName, "npc-area")
                // npcBlockElement.id = "npc-" + y + "," + x
                
                // addOnClickToNpc(npcBlockElement, npc)

                // parentDiv.appendChild(npcBlockElement)

                // displayCurrentHealthBar(Game._getNpc({y, x}))
                // displayCurrentManaBar(Game._getNpc({y, x}))
            }
        }
    }
}