// NB: doesn't work with CD or straight line spells

class AggressiveAi {
    constructor(npc) {
        this.npc = npc
        this.activeMap = ""
        this.spellRangeMap = ""
        this.damageMap = ""
        this.movementMap = ""
        this.bestMovementRoute = ""
        this.bestMovementPosition = ""
        this.spellList = JSON.parse(JSON.stringify(this.npc.class.spells))
        this.spellDamageOnPlayer = []
        this.spellWeight = []
        this.movementWeight = []
        this.animationIsRunning = false
    }

    runAi(){
        console.log("RUN AI")
        Game.npcActiveTurn = true

        this.setActiveMap()

        this.fillDamageMap()
        this.updateDamageMapWithReach()

        this.checkIfPlayerCanBeKilled()

        this.calculateAttackWeight()

        this.spellDamageOnPlayer.forEach((player) => {
            this.findMovementPathForAttacking(player)
        })

        this.reCalculationOfTotalWeight()

        this.executeMovementAndActions()

        const checkAnimationActions = setInterval(() => {
            if(!this.animationIsRunning){
                Game.combatTimeline.forEach((ele) =>{
                if(ele.npc) return 
                this.calculateMovementWeight(ele)
                })

                this.movementWeight.sort((a, b) => a.counter - b.counter)

                this.executeNoSpellMovement()

                const checkAnimation = setInterval(() => {
                    if(!this.animationIsRunning){
                        Game.npcActiveTurn = false
                        Game._nextTurn()
                        this.resetAi()
                        clearInterval(checkAnimation)
                    }
                }, 1000)
                clearInterval(checkAnimationActions)
            }
        }, 1000)



    }

    setActiveMap(){
        this.activeMap = Game.activeMap
        this.spellRangeMap = this.activeMap.map((y) => {return y.map(() => { return []})})
        this.damageMap = this.activeMap.map((y) => {return y.map(() => { return 0})})
        this.movementMap = findAvailableMovementArea(this.npc, this.activeMap)
    }

    resetSpellDamageMap(){
        //this.spellDamageMap = this.activeMap.map((y) => {return y.map(() => { return 0})})
    }

    //Pushes an object for each player on the map with where an NPC must stand to cast a spell
    fillDamageMap(){
        Game.combatTimeline.forEach((ele) =>{
            if(ele.npc) return
            let allSpellRangeMap = this.activeMap.map((y) => {return y.map(() => { return 0})})

            let spellDamageOnPlayerObject = {
                player: ele,
                spell: [],
            }

            for(let spell in this.spellList){
                let spellRangeMap = calculateSpellRangeFreeCells(allSpellRangeMap, this.spellList[spell].spellInfo, ele.position)
                spellDamageOnPlayerObject.spell.push({spell: JSON.parse(JSON.stringify(this.spellList[spell]))
                    ,spellRangeMap})
            }

            this.spellDamageOnPlayer.push(spellDamageOnPlayerObject)
        })
    }

    //Overlays the damage map with movementMap to see what spells that can be used on what players
    updateDamageMapWithReach(){
        this.spellDamageOnPlayer.forEach((player) => {
            player.spell.forEach((spell) => {
                for(let y = 0; y < spell.spellRangeMap.length; y++){
                    for(let x = 0; x < spell.spellRangeMap[y].length; x++){
                        if(spell.spellRangeMap[y][x] > 0 && this.movementMap[y][x] > 0){
                            // Add remaining MP equation here: spell.spellRangeMap[y][x] = [spell.spellRangeMap[y][x], this.movementMap[y][x]]
                        } else {
                            spell.spellRangeMap[y][x] = 0
                        }
                    }
                }
            })
        })
    }

    checkIfPlayerCanBeKilled() {
    }
    
    calculateAttackWeight(){

        this.spellDamageOnPlayer.forEach((player) => {
            let currentMana = this.npc.class.combatstats.currentMana
            player.totalAiWeight = 0
            player.castSequence = []

            player.spell.sort((a,b) => {
                return a.spell.spellInfo.canBeCast ? b.spell.spellInfo.aiWeight-a.spell.spellInfo.aiWeight : 
                a.spell.spellInfo.aiWeight - b.spell.spellInfo.aiWeight
            })

            for(let i = 0; i < player.spell.length; i++){
                if(!JSON.stringify(player.spell[i].spellRangeMap).includes(player.spell[i].spell.spellInfo.damage.toString()) ||
                !player.spell[i].spell.spellInfo.canBeCast){
                    // ADD COOLDOWN HERE
                    player.spell.splice(i, 1)
                    i -= 1
                }
            }

            let whileLoopContinue = true
            while(currentMana > 0 && whileLoopContinue){
                let remainingSpells = player.spell.filter((ele) => 
                ele.spell.spellInfo.manaCost <= currentMana && ele.spell.spellInfo.canBeCast)
                // DO I NEED TO SORT SPELLS BY WEIGHT AGAIN HERE?
                // Add for castsPerTurn

                if(remainingSpells.length === 0){
                    whileLoopContinue = false
                    break;
                }

                currentMana -= remainingSpells[0].spell.spellInfo.manaCost
                player.totalAiWeight += remainingSpells[0].spell.spellInfo.aiWeight
                player.castSequence.push(remainingSpells[0])
            }
        })

        this.spellDamageOnPlayer.sort((a,b) => b.totalAiWeight - a.totalAiWeight)

    }

    findMovementPathForAttacking(player){
        // BUG!: When an enemy can not reach anyone at all.. Make an if statement that this function is only run if total AI weight is > 0
        // Also make a "find movement path for attacking for the other spells and see how many MP it takes if a detour is required"
        

        // THIS LINE WILL FIX THE BUG
        if(!player.castSequence[0]){
            return
        }

        let spellRangeMap = player.castSequence[0].spellRangeMap,

        bestMovementPosition = {remainingMovement: 0}

        for(let y = 0; y < spellRangeMap.length; y++){
            for(let x = 0; x < spellRangeMap[y].length; x++){
                if(spellRangeMap[y][x] > 0 && this.movementMap[y][x] > 0){
                    if(bestMovementPosition.remainingMovement < this.movementMap[y][x]){
                        bestMovementPosition = {position:{x, y}, remainingMovement: this.movementMap[y][x]}
                    }
                }
            }
        }

        player.bestMovementRoute = findBestMovementRoute(bestMovementPosition.position, this.movementMap)
        player.bestMovementPosition = bestMovementPosition.position

        player.castSequence.forEach((spell, index) => {
            let castPosition;
            for(let y = 0; y < player.bestMovementRoute.length; y++) {
                for(let x = 0; x < player.bestMovementRoute[y].length; x++) {
                    if(player.bestMovementRoute[y][x] == "path" && spell.spellRangeMap[y][x] > 0){
                        castPosition = {y, x}
                    }
                }
            }
            player.castSequence[index].castPosition = castPosition
        })

        // ABOVE HERE IS WHERE I CAN ADD THE FLEXIBLE ROUTING


        //If the spell can not be cast, then remove it!

        player.castSequence = player.castSequence.filter((ele) => ele.castPosition)

    }

    reCalculationOfTotalWeight(){
        this.spellDamageOnPlayer.forEach((player) => {
            player.totalAiWeight = 0;
            player.castSequence.forEach((ele) =>{
                player.totalAiWeight += ele.spell.spellInfo.aiWeight
            })
        })
        


        this.spellDamageOnPlayer.sort((a,b) => b.totalAiWeight - a.totalAiWeight)
    }

    executeMovementAndActions(){
        let originalPosition = JSON.parse(JSON.stringify(this.npc.position))
        if(this.spellDamageOnPlayer[0].bestMovementPosition){
            confirmMovementToPosition(this.spellDamageOnPlayer[0].bestMovementPosition, this.movementMap)  // BUG: NPC position: 10,12, cannot read property y of undefined (movement.js:47)
            this.executeMovement(JSON.parse(JSON.stringify(this.spellDamageOnPlayer[0].bestMovementRoute)), originalPosition)
        }
    }

    findBestMovementRoute(originalStartPosition, destinationPosition, originalAvailableMovementMap){
        let availableMovementMap = JSON.parse(JSON.stringify(originalAvailableMovementMap))
        let yPos = originalStartPosition.y, xPos = originalStartPosition.x, 
        currentNumber = availableMovementMap[yPos][xPos], originalPosition = false
    
        while (!originalPosition){
            availableMovementMap[yPos][xPos] = "path"
            if(yPos == destinationPosition.y && xPos == destinationPosition.x){
                originalPosition = true
                break
            }
            if(xPos+1 < availableMovementMap[yPos].length && 
                availableMovementMap[yPos][xPos+1] < currentNumber && 
                availableMovementMap[yPos][xPos+1] > 0){
                // It may be a bug here... use xPos+1 <= availableMovementMap[yPos].length instead
                xPos += 1
            } else if(xPos-1 >= 0 && availableMovementMap[yPos][xPos-1] < currentNumber && 
                availableMovementMap[yPos][xPos-1] > 0){ 
                xPos -= 1
            } else if(yPos+1 < availableMovementMap.length && 
                availableMovementMap[yPos+1][xPos] < currentNumber && 
                availableMovementMap[yPos+1][xPos] > 0){
                // It may be a bug here... use yPos+1 <= availableMovementMap.length instead
                yPos += 1
            } else if(yPos-1 >= 0 && availableMovementMap[yPos-1][xPos] < currentNumber && 
                availableMovementMap[yPos-1][xPos] > 0){
                yPos -= 1
            } else {
                originalPosition = true
            }
            currentNumber -= 1;
        }
        return availableMovementMap
    }

    executeMovement(movementRoute, position) {
        this.animationIsRunning = true

        let spellsToCast = this.spellDamageOnPlayer[0].castSequence.filter((spell) => {
            return spell.castPosition.y == position.y && spell.castPosition.x == position.x
        })
        
        if(spellsToCast.length > 0) {
            spellsToCast.forEach((ele) => {
                this.executeSpell(ele.spell)
            })
        }


        let y = position.y
        let x = position.x
        let blockElement = document.getElementById("map-grid-block-" + y + "," + x)
        let playerElement = document.getElementById(`npc-${y},${x}`)
        
        blockElement.style.zIndex = "400"
        
        movementRoute[y][x] = 0
        if(movementRoute[y][x+1] == "path"){
            movementRoute[y][x+1] = 0
            x += 1;
            return this.xMovementVisuals(x-1, y, x, playerElement, blockElement, movementRoute)
        } else if(movementRoute[y][x-1] == "path"){
            movementRoute[y][x-1] = 0
            x -= 1;
            return this.xMovementVisuals(x+1, y, x, playerElement, blockElement, movementRoute)
        } else if(y+1 < movementRoute.length && movementRoute[y+1][x] == "path"){
            movementRoute[y+1][x] = 0
            y += 1;
            return this.yMovementVisuals(y-1, y, x, playerElement, blockElement, movementRoute)
        } else if(y-1 >= 0 && movementRoute[y-1][x] == "path"){
            movementRoute[y-1][x] = 0
            y -= 1;
            return this.yMovementVisuals(y+1, y, x, playerElement, blockElement, movementRoute)
        } else {
            this.animationIsRunning = false
            return //This line is run at the end of the walking animation
        }
        
    }

    yMovementVisuals(yPos, y, x, classElement, blockElement, routeUpdatedMovementMap){
        let marginTop = 0;
        let movementIntervalY = setInterval(() =>{
        if(Math.abs(marginTop) >= Math.abs(y-yPos)*77){
            clearInterval(movementIntervalY)
            this.clearMovementVisuals(classElement, blockElement, x, y)
            return this.executeMovement(routeUpdatedMovementMap, {y, x})
        }
        classElement.style.marginTop = marginTop + "px";
        if(y-yPos > 0) marginTop += 4;
        else marginTop -=4;
        },17)
    }

    xMovementVisuals(xPos, y, x, classElement, blockElement, routeUpdatedMovementMap){
        let marginLeft = 0;
        let movementIntervalX = setInterval(()=>{
        if(Math.abs(marginLeft) >= Math.abs(x-xPos)*77){
            clearInterval(movementIntervalX)
            this.clearMovementVisuals(classElement, blockElement, x, y)
            return this.executeMovement(routeUpdatedMovementMap, {y, x})
        }
        classElement.style.marginLeft = marginLeft + "px"
        if(x-xPos > 0) marginLeft += 4
        else marginLeft -= 4
        }, 17)
    }

    clearMovementVisuals(classElement, blockElement, x, y){
        classElement.style.margin = 0 + "px";
        blockElement.style.zIndex = 0;
        blockElement.removeChild(blockElement.firstChild)
        classElement.id = "npc-" + y + "," + x
        document.getElementById("map-grid-block-" + y + "," + x).appendChild(classElement)
    }

    executeSpell(spell){
        let spells = this.npc.class.spells
        for(let key in spells){
            if(spells[key].id == spell.id){
                spells[key].cast(this.spellDamageOnPlayer[0].player)
            }
        }
    }

    calculateMovementWeight(player){
        let movementMap = findAvailableMovementArea(this.npc, this.activeMap)
        
        // Removes all the current available movements
        for(let y = 0; y < movementMap.length; y++){
            for(let x = 0; x < movementMap[y].length; x++){
                if(movementMap[y][x] > 0){
                    movementMap[y][x] = 0
                }
            }
        }

        movementMap[player.position.y][player.position.x] = 1

        let continueSearching = true, counter = 1

        while(continueSearching){
            for(let y = 0; y < movementMap.length; y++){
                for(let x = 0; x < movementMap[y].length; x++){
                    if(movementMap[y][x] == counter){
                        if(checkIfInsideOfMap(movementMap, y-1, x) && movementMap[y-1][x] === 0){
                            movementMap[y-1][x] = counter+1
                            if(this.npc.position.y == y-1 && this.npc.position.x == x){
                                continueSearching = false
                                break
                            }
                        }
                        if(checkIfInsideOfMap(movementMap, y+1, x) && movementMap[y+1][x] === 0){
                            movementMap[y+1][x] = counter+1
                            if(this.npc.position.y == y+1 && this.npc.position.x == x){
                                continueSearching = false
                                break
                            }
                        }
                        if(checkIfInsideOfMap(movementMap, y, x+1) && movementMap[y][x+1] === 0){
                            movementMap[y][x+1] = counter+1
                            if(this.npc.position.y == y && this.npc.position.x == x+1){
                                continueSearching = false
                                break
                            }
                        }
                        if(checkIfInsideOfMap(movementMap, y, x-1) && movementMap[y][x-1] === 0){
                            movementMap[y][x-1] = counter+1
                            if(this.npc.position.y == y && this.npc.position.x == x-1){
                                continueSearching = false
                                break
                            }
                        }
                    }
                }
            }
            counter += 1
        }

        this.movementWeight.push({player, movementMap, counter})
    }

    
    executeNoSpellMovement(){
        this.spellDamageOnPlayer.forEach((player) => {
            player.castSequence = []
        })

        let remainingMovement = this.npc.class.combatstats.currentMovementPoints
        let destinationPosition, iterationPosition = {y: this.npc.position.y, x: this.npc.position.x}
        let currentNumber = this.movementWeight[0].movementMap[this.npc.position.y][this.npc.position.x]
        let startCurrentNumber = currentNumber
    
        if(remainingMovement <= 0) return

        //!destinationPosition ||
        if(currentNumber > remainingMovement){
            remainingMovement = currentNumber - remainingMovement

            while(!destinationPosition){
                if(this.movementWeight[0].movementMap[iterationPosition.y][iterationPosition.x] == remainingMovement ||
                    currentNumber == 2) {
                        destinationPosition = iterationPosition
                        break
                    }
                if(iterationPosition.x+1 < this.movementWeight[0].movementMap[iterationPosition.y].length && 
                    this.movementWeight[0].movementMap[iterationPosition.y][iterationPosition.x+1] < currentNumber && 
                    this.movementWeight[0].movementMap[iterationPosition.y][iterationPosition.x+1] > 0){
                    // It may be a bug here... use iterationPosition.x+1 <= this.movementWeight[0].movementMap[iterationPosition.y].length instead
                    iterationPosition.x += 1
                } else if(iterationPosition.x-1 >= 0 && 
                    this.movementWeight[0].movementMap[iterationPosition.y][iterationPosition.x-1] < currentNumber
                    && this.movementWeight[0].movementMap[iterationPosition.y][iterationPosition.x-1] > 0){ 
                    iterationPosition.x -= 1
                } else if(iterationPosition.y+1 < this.movementWeight[0].movementMap.length && 
                    this.movementWeight[0].movementMap[iterationPosition.y+1][iterationPosition.x] < currentNumber &&
                    this.movementWeight[0].movementMap[iterationPosition.y+1][iterationPosition.x] > 0){
                    // It may be a bug here... use iterationPosition.y+1 <= this.movementWeight[0].movementMap.length instead
                    iterationPosition.y += 1
                } else if(iterationPosition.y-1 >= 0 && 
                    this.movementWeight[0].movementMap[iterationPosition.y-1][iterationPosition.x] < currentNumber &&
                    this.movementWeight[0].movementMap[iterationPosition.y-1][iterationPosition.x] > 0){
                    iterationPosition.y -= 1
                }
    
                currentNumber -= 1
            }
        }

        // If you're not going anywhere
        if(!destinationPosition) {
            this.animationIsRunning = false
            return
        }


        // THE BUG SEEMS TO BE IN findBestMovementRoute...
        let bestMovementRoute = this.findBestMovementRoute(this.npc.position, destinationPosition, this.movementWeight[0].movementMap)
        
        JSON.parse(JSON.stringify(this.npc.position))
        this.executeMovement(bestMovementRoute, JSON.parse(JSON.stringify(this.npc.position)))

        confirmMovementToPosition(destinationPosition, this.movementWeight[0].movementMap)  // BUG: NPC position: 10,12, cannot read property y of undefined (movement.js:47)
    }

    resetAi(){
        this.activeMap = ""
        this.spellRangeMap = ""
        this.damageMap = ""
        this.movementMap = ""
        this.bestMovementRoute = ""
        this.bestMovementPosition = ""
        this.spellList = JSON.parse(JSON.stringify(this.npc.class.spells))
        this.spellDamageOnPlayer = []
        this.spellWeight = []
        this.movementWeight = []
        this.animationIsRunning = false
    }
}
    
    
