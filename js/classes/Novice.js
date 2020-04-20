class Novice {
    constructor(player){
        this.className = "Novice"
        this.cssString = "novice-player-area"
        this.cssPlayerPanelString = "novice-class-player-panel"
        this.player = player

        this.combatstats = {
            hp: 250,
            currentHp: 250,
            mana: 100,
            currentMana: 100,
            initiation: 100,
            maxMovementPoints: 5,
            currentMovementPoints: 5,
        }

        this.conditions = {
            silenced: false,
            disarmed: false,
        }

        this.damageModifiers = {
            defensive: {
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
            rend:  {...noviceSpellObject.rend, spellInfo: {...noviceSpellObject.rend.spellInfo}},
            slam: {...noviceSpellObject.slam, spellInfo: {...noviceSpellObject.slam.spellInfo}},
            throwStaff:  {...noviceSpellObject.throwStaff, spellInfo: {...noviceSpellObject.throwStaff.spellInfo}},
            conjureFrost: {...noviceSpellObject.conjureFrost, spellInfo: {...noviceSpellObject.conjureFrost.spellInfo}},
            heal:  {...noviceSpellObject.heal, spellInfo: {...noviceSpellObject.heal.spellInfo}},
            defensiveStance:{...noviceSpellObject.defensiveStance, spellInfo: {...noviceSpellObject.defensiveStance.spellInfo}},
            forceStaff: {...noviceSpellObject.forceStaff, spellInfo: {...noviceSpellObject.forceStaff.spellInfo}},
            snowstorm: {...noviceSpellObject.snowstorm, spellInfo: {...noviceSpellObject.snowstorm.spellInfo}},
            inspire: {...noviceSpellObject.inspire, spellInfo: {...noviceSpellObject.inspire.spellInfo}},
        }
    }

    async _addTargetSpellConditions(spell, position){
        if(checkIfSpellIsCastable(this, spell)) return console.log("Cant be cast")
        
        spell.castCounter += 1
        this._checkIfNewSpellIsLearned(spell)
        
        let target = Game._getUnitByPosition(position)
        if(!target && !spell.spellInfo.glyphNumber) return console.log("No target")
        
        this.combatstats.currentMana -= spell.spellInfo.manaCost
        
        let modifiedDamage = spell.castEffect(target ? target : position, spell, this)

        updateCurrentManaBar(this.player)
        
        
        if(noviceSpellAnimations[spell.id]) await noviceSpellAnimations[spell.id](target, this.player)
        
        if(modifiedDamage){
            handleSpellDamageEffectAnimation(target, modifiedDamage, spell.spellInfo.type)
        }

        if(target?.newPosition){
            target.position = {...target.newPosition}
            target.newPosition = false
        }

        this._checkIfPromotionToNewClass()
    }

    _checkIfNewSpellIsLearned(spell){
        let taughtSpell

        if(spell.id == "slam" && spell.castCounter === 10){
            taughtSpell = "defensiveStance"
        } else if (spell.id == "throwStaff" && spell.castCounter === 10){
            taughtSpell = "forceStaff"
        } else if (spell.id == "conjureFrost" && spell.castCounter === 10){
            taughtSpell = "snowstorm"
        } else if (spell.id == "heal" && spell.castCounter === 10){
            taughtSpell = "inspire"
        }
        
        if(taughtSpell){
            this.spells[taughtSpell].spellInfo.learned = true
            this.spells[taughtSpell].spellInfo.canBeCast = true
        }

    }

    _checkIfPromotionToNewClass(){
        let totalCastCounter = 0
        for(let spell in this.spells) {
            totalCastCounter += this.spells[spell].castCounter
        }

        if(totalCastCounter > 2){
            const spellKeys = Object.keys(this.spells)
            spellKeys.sort((a, b) => this.spells[b].castCounter - this.spells[a].castCounter)
            console.log(spellKeys)
            if(spellKeys[0] === "throwStaff" || spellKeys[0] === "forceStaff"){
                
            } else if(spellKeys[0] === "slam" || spellKeys[0] === "defensiveStance"){

            } else if(spellKeys[0] === "conjureFrost" || spellKeys[0] === "snowstorm"){

            } else {

            }
        }
    }
}