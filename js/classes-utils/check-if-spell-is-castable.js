// Checks the mana requirement, disarmed etc. returns true if the spell can be cast

const checkIfSpellIsCastable = (player) => {
    let spellInfo = this.spells.slam.spellInfo

    if(player.combatstats.currentMana < spellInfo.manaCost){
        return false
    }
    
    if(!spellInfo.canBeCast){
        return false
    }

    if(spellInfo.conditionsRequirements.disarmed && player.conditions.disarmed){
        return false
    }

    if(spellInfo.conditionsRequirements.silenced && player.conditions.silenced){
        return false
    }

    return true
}