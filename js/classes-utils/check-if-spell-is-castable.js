// Checks the mana requirement, disarmed etc. returns true if the spell can be cast

const checkIfSpellIsCastable = (player, spell) => {
    let spellInfo = spell.spellInfo

    if(!spellInfo.learned){
        return false
    }

    if(player.combatstats.currentMana < spellInfo.manaCost){
        return true
    }
    
    if(!spellInfo.canBeCast){
        return true
    }

    if(spellInfo.conditionsRequirements.disarmed && player.conditions.disarmed){
        return true
    }

    if(spellInfo.conditionsRequirements.silenced && player.conditions.silenced){
        return true
    }

    return false
}