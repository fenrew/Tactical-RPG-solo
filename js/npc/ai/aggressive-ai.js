// NB: doesn't work with CD or straight line spells

class AggressiveAi {
    constructor(npc) {
        this.npc = npc
        this.activeMap = ""
        this.spellRangeMap = ""
        this.damageMap = ""
        this.movementMap = ""
        this.spellList = JSON.parse(JSON.stringify(this.npc.class.spells))
        this.spellDamageOnPlayer = []
        this.spellWeight = []
    }

    runAi(){
        this.setActiveMap()

        this.fillDamageMap()
        this.updateDamageMapWithReach()

        this.checkIfPlayerCanBeKilled()

        this.calculateAttackWeight()

        this.findMovementPathForAttacking()
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
                let spellRangeMap = calculateSpellRange(allSpellRangeMap, this.spellList[spell].spellInfo, ele.position)
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
        console.log("UPDATED DAMAGE MAP", this.spellDamageOnPlayer)
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
        console.log(this.spellDamageOnPlayer)
    }

    findMovementPathForAttacking(){
        // BUG!: When an enemy can not reach anyone at all.. Make an if statement that this function is only run if total AI weight is > 0
        let spellRangeMap = this.spellDamageOnPlayer[0].spell[0].spellRangeMap,
        bestMovementPosition = {remainingMovement: 0}
        console.log("SPELLDAMAGEONPLAYER",  this.spellDamageOnPlayer[0])

        for(let y = 0; y < spellRangeMap.length; y++){
            for(let x = 0; x < spellRangeMap[y].length; x++){
                if(spellRangeMap[y][x] > 0 && this.movementMap[y][x] > 0){
                    if(bestMovementPosition.remainingMovement < this.movementMap[y][x]){
                        bestMovementPosition = {position:{x, y}, remainingMovement: this.movementMap[y][x]}
                    }
                }
            }
        }
        console.log(bestMovementPosition)
        let bestRouteMap = findBestMovementRoute(bestMovementPosition.position, this.movementMap)
        console.log("BEST ROUTE MAP", bestRouteMap)
    }
}