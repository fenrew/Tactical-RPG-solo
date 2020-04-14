class GameClass {
    constructor(){
        this.players = []
        this.npc = []
        this.originalMap = removeStartingPositions(mapOne) // Current map UN-modified
        this.activeMap = JSON.parse(JSON.stringify(mapOne)) //Current map modified
        this.mapHighlights = this.activeMap.map((y) => {return y.map(() => { return []})}) // Triple array of all different highlights on the map (movement and spells)
        this.availableMovementMap = ""
        this.glyphMap = this.activeMap.map((y) => {return y.map(() => { return []})})
        this.turn = 0
        this.round = 0
        this.combatTimeline = [] // this.combatTimeline[this.turn]
        this.npcActiveTurn = false
        this.spellToBeCast = ""
        this.combatEffects = []

        this.newRound = () =>{
            addNewNpcToMap(this.round)
        }
    }

    _addPlayerToGame(playerNumber){
        this.players.push(new Player(playerNumber))

        for(let y = 0; y < this.activeMap.length; y++){
            for(let x = 0; x < this.activeMap[y].length; x++){
                if (this.activeMap[y][x] === playerNumber+10) {
                    this.players[playerNumber].position = {y: y, x: x}
                    return this.activeMap[y][x] = playerNumber
                }
            }
        }
    }

    _addPlayersToCombatTimeline(){
        this.players.forEach((ele) =>{
            this.combatTimeline.push(ele)
        })
    }

    _addNpcToGame(npcArrayToBeAdded){
        npcArrayToBeAdded.forEach((npc) => {
            npc._generateRandomPosition()
            this.activeMap[npc.position.y][npc.position.x] = npc.playerNumber
            this.npc.push(npc)
            this.combatTimeline.push(npc)
        })
        this._updateInitiation()
        visualizeNpcs(this.activeMap)
    }

    _getPlayer(playerNumber){
        return this.players[playerNumber]
    }

    _getNpc(position){
        return this.npc.find((npc) => {
            return (npc.position.y === position.y && npc.position.x === position.x)
        })
    }

    _getUnitByPosition(position){
        return this.combatTimeline.find((ele) => ele.position.y == position.y && ele.position.x == position.x)
    }

    _updateInitiation(){
        this.combatTimeline.sort((a,b)=>{
            return b.class.combatstats.initiation - a.class.combatstats.initiation 
        })
        
        updatePlayerPanelCombatTimelineVisuals()
    }

    _nextTurn(){
        //Remove highlights and spell list
        removeHighlightsFromMap()

        let spellElement = document.getElementById("spell-list-tab")
        if(spellElement) document.getElementById("player-area").removeChild(spellElement) 


        // Player ending his turn
        let activePlayer = this.combatTimeline[this.turn]
        let activeCombatstats = activePlayer.class.combatstats

        activeCombatstats.currentMovementPoints = activeCombatstats.maxMovementPoints;

        activeCombatstats.currentMana += 0.5 * activeCombatstats.mana;
        if(activeCombatstats.currentMana > activeCombatstats.mana){
                activeCombatstats.currentMana = activeCombatstats.mana;
        }
        updateCurrentManaBar(activePlayer)

        // Active glyphs
        this.glyphMap[activePlayer.position.y][activePlayer.position.x].forEach((ele) => {
            ele.spell.activateGlyph(activePlayer)
        })

        // Player starting his turn
        this.turn += 1
        
        if(this.turn%this.combatTimeline.length === 0){
            this.round += 1
            this.turn = 0
            
            this.newRound()
        }

        let newActivePlayer = this.combatTimeline[this.turn]

        //Glyphs executed
        this.glyphMap[newActivePlayer.position.y][newActivePlayer.position.x].forEach((ele) => {
            ele.spell.activateGlyph(newActivePlayer)
        })
        
        //Effects executed
        this.combatEffects.forEach(effect => this._checkForCombatEffects(effect))
        this.combatEffects = this.combatEffects.filter(ele => !ele.finished)

        this._checkIfAnyoneHasDied()

        //NPC turn
        if(this.combatTimeline[this.turn].npc){
            this.combatTimeline[this.turn].ai.runAi()
        }

        updatePlayerPanelActiveTurn(this.combatTimeline, this.turn)
    }

    // Takes a matrix (map) wit_removeUnitFromCombat(unit)h numbers and adds the highlightClassNumber to all places that has number > 0
    _addNewHighlightToMap(map, highlightClassNumber) {
        for(let y = 0; y < map.length; y++){
            for(let x = 0; x < map[y].length; x++){
                if(map[y][x] > 0){
                    this.mapHighlights[y][x].push(highlightClassNumber)
                }
            }
        }
    }

    _displayMovementHighlights(player){
        let activePlayerTurn
        this.availableMovementMap = findAvailableMovementArea(player, this.activeMap)
        if(this.combatTimeline[this.turn] === player && !player.npc) activePlayerTurn = true
        addMovementToHighlightMap(this.availableMovementMap, this.mapHighlights, activePlayerTurn)
        displayMapHighlightsVisuals()
    }

    _checkIfAnyoneHasDied(){
        this.combatTimeline.forEach((ele) => {
            if(ele.class.combatstats.currentHp <= 0){
                this._removeUnitFromCombat(ele)
                removeUnitFromPlayerarea(ele)
            }
        })
    }

    _removeUnitFromCombat(unit){
        if(unit.npc){
            Game.npc.splice(Game.npc.indexOf(unit), 1)
        }

        if(Game.combatTimeline.indexOf(this.combatTimeline[this.turn]) >= Game.combatTimeline.indexOf(unit)){
            this.turn -= 1
        }
        
        Game.combatTimeline.splice(Game.combatTimeline.indexOf(unit), 1)

        Game.activeMap[unit.position.y][unit.position.x] = Game.originalMap[unit.position.y][unit.position.x]
    }

    _addNewCombatEffect(player, target, spell, duration){
        let effect = {
            player,
            target,
            spell,
            executeRound: this.round + duration,
            duration,
        }

        this.combatEffects.push(effect)
    }

    _checkForCombatEffects(effect){
        if(this.round == effect.executeRound && effect.player == Game.combatTimeline[this.turn]){
            effect.spell.applyEffect(effect)
            effect.finished = true
        }
    }
}

const Game = new GameClass()