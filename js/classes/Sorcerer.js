class Sorcerer {
    constructor(player){
        this.className = "Sorcerer"
        this.cssString = "sorcerer-player-area"
        this.cssPlayerPanelString = "sorcerer-class-player-panel"
        this.player = player

        this.combatstats = {
            hp: 300,
            currentHp: 300,
            mana: 350,
            currentMana: 350,
            initiation: 150,
            maxMovementPoints: 4,
            currentMovementPoints: 4,
        }

        this.conditions = {
            silenced: false,
            disarmed: false,
        }

        this.damageModifiers = {
            defensive: {
                allDamage: 1,
                magicalDamage: {
                    allDamage: 0.8,
                    elementalMagic: {
                        fire: 1,
                        frost: 1,
                        arcane: 1,
                        holy: 1,
                        nature: 1,
                        darkness: 1,
                    },
                },
                physicalDamage: {
                    allDamage: 1.2,
                    rangedDamage: 1,
                    meleeDamage: 1,
                    bleeds: 1,
                },
            },
            offensive: {
                allDamage: 1,
                magicalDamage: {
                    allDamage: 1,
                    elementalMagic: {
                        fire: 1,
                        frost: 1,
                        arcane: 1,
                        holy: 1,
                        nature: 1,
                        darkness: 1,
                    },
                },
                physicalDamage: {
                    allDamage: 1,
                    rangedDamage: 1,
                    meleeDamage: 1,
                    bleeds: 1,
                },
            },
            healing: {
                recieved: 1,
                casterModifier: 1,
            }
        }

        this.spells = {
            
        }
    }


    async _addTargetSpellConditions(spell, position){
        if(checkIfSpellIsCastable(this, spell)) return console.log("Cant be cast")
        
        let target = Game._getUnitByPosition(position)
        if(!target && !spell.spellInfo.glyphNumber) return console.log("No target")
        
        this.combatstats.currentMana -= spell.spellInfo.manaCost

        spell.castCounter += 1
        this.castCounter[spell.category] += 1
        this._checkIfNewSpellIsLearned(spell)
        
        if(noviceSpellAnimations[spell.id]) await noviceSpellAnimations[spell.id](target, this.player)
       
        let modifiedDamage = await spell.castEffect(target ? target : position, spell, this)

        updateCurrentManaBar(this.player)
        
        if(target?.newPosition){
            target.position = {...target.newPosition}
            target.newPosition = false
        }

        
        if(modifiedDamage){
            console.log(modifiedDamage,"modifieddamage")
            handleSpellDamageEffectAnimation(target, modifiedDamage, spell.spellInfo.type)
        }

        this._checkIfPromotionToNewClass()
    }

    _checkIfNewSpellIsLearned(spell){
        let taughtSpell

        for(let key in this.spells){
            if(this.category === spell.category && this.spells){}
        }
        
        if(taughtSpell){
            this.spells[taughtSpell].spellInfo.learned = true
            this.spells[taughtSpell].spellInfo.canBeCast = true
        }

    }

    _checkIfPromotionToNewClass(){
    }
}