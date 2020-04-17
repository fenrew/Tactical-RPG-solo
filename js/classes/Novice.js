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
            slam: {
                id: "slam",
                name: "Slam",
                cast: (position) => {
                    this._addTargetSpellConditions(this.spells.slam, position)
                },
                castEffect: (target, spell) => {
                    let modifiedDamage = Math.floor(spell.spellInfo.damage * calculatePhysicalMeleeDamageModifiers(this, target))
                    target.class.combatstats.currentHp -= modifiedDamage
                    return modifiedDamage
                },
                spellInfo: {
                    learned: true,
                    canBeCast: true,
                    type: "damage",
                    manaCost: 30,
                    damage: 25,
                    freeCells: true,
                    straigthLine: false,
                    diagonal: false,
                    areaOfEffect: 1,
                    minRange: 1,
                    maxRange: 1,
                    modifiableRange: false,
                    lineOfSight: false,
                    cooldown: false,
                    castsPerTurn: 2,
                    conditionsRequirements: {
                        disarmed: true,
                    }
                },
                castCounter: 9
            },
            throwStaff: {
                id: "throwStaff",
                name: "Throw Staff",
                cast: (position) => {
                    this._addTargetSpellConditions(this.spells.throwStaff, position)
                },
                castEffect: (target, spell) => {
                    let modifiedDamage = Math.floor(spell.spellInfo.damage * calculatePhysicalRangedDamageModifiers(this, target))
                    target.class.combatstats.currentHp -= modifiedDamage
                    return modifiedDamage
                },
                spellInfo: {
                    learned: true,
                    canBeCast: true,
                    type: "damage",
                    manaCost: 25,
                    damage: 15,
                    freeCells: true,
                    straigthLine: false,
                    diagonal: false,
                    areaOfEffect: 1,
                    minRange: 1,
                    maxRange: 5,
                    modifiableRange: false,
                    lineOfSight: false,
                    cooldown: 1,
                    castsPerTurn: 1,
                    conditionsRequirements: {
                        disarmed: true,
                    }
                },
                castCounter: 0
            },
            conjureFrost: {
                id: "conjureFrost",
                name: "Conjure Frost",
                cast: (position) => {
                    this._addTargetSpellConditions(this.spells.conjureFrost, position)
                },
                castEffect: (target, spell) => {
                    let tCombatstats = target.class.combatstats

                    let modifiedDamage = Math.floor(spell.spellInfo.damage * calculateMagicalDamageModifiers(this, target, "frost"))
                    console.log(calculateMagicalDamageModifiers(this, target, "frost"))
                    tCombatstats.currentHp -= modifiedDamage

                    tCombatstats.currentMovementPoints -= 1
                    if(tCombatstats.currentMovementPoints < 0) tCombatstats.currentMovementPoints = 0

                    return modifiedDamage
                },
                spellInfo: {
                    learned: true,
                    canBeCast: true,
                    type: "damage",
                    manaCost: 30,
                    damage: 10,
                    freeCells: true,
                    straigthLine: false,
                    diagonal: false,
                    areaOfEffect: 1,
                    minRange: 1,
                    maxRange: 5,
                    modifiableRange: false,
                    lineOfSight: false,
                    cooldown: 1,
                    castsPerTurn: 1,
                    conditionsRequirements: {
                        silenced: true,
                    }
                },
                castCounter: 0
            },
            heal: {
                id: "heal",
                name: "Heal",
                cast: (position) => {
                    this._addTargetSpellConditions(this.spells.heal, position)
                },
                castEffect: (target, spell) => {
                    let modifiedDamage = Math.floor(spell.spellInfo.damage * calculateHealingModifiers(this, target))
                    
                    target.class.combatstats.currentHp += modifiedDamage
                    if(target.class.combatstats.currentHp > target.class.combatstats.hp){
                        target.class.combatstats.currentHp = target.class.combatstats.hp
                    }

                    return modifiedDamage
                },
                spellInfo: {
                    learned: true,
                    canBeCast: true,
                    type: "healing",
                    manaCost: 30,
                    damage: 30,
                    freeCells: true,
                    straigthLine: false,
                    diagonal: false,
                    areaOfEffect: 1,
                    minRange: 1,
                    maxRange: 5,
                    modifiableRange: false,
                    lineOfSight: false,
                    cooldown: 1,
                    castsPerTurn: 1,
                    conditionsRequirements: {
                        silenced: true,
                    }
                },
                castCounter: 0
            },
            defensiveStance: {
                id: "defensiveStance",
                name: "Defensive Stance",
                cast: (position) => {
                    this._addTargetSpellConditions(this.spells.defensiveStance, position)
                },
                castEffect: (target, spell) => {
                    target.class.damageModifiers.defensive.physicalDamage.allDamage -= 0.2
                    target.class.damageModifiers.offensive.magicalDamage.allDamage -= 0.2

                    Game._addNewCombatEffect(this.player, target, spell, spell.spellInfo.duration)
                },
                applyEffect: (effect) => {
                    effect.target.class.damageModifiers.defensive.physicalDamage.allDamage += 0.2
                    effect.target.class.damageModifiers.offensive.magicalDamage.allDamage += 0.2
                },
                spellInfo: {
                    learned: true,
                    canBeCast: true,
                    type: "buff",
                    manaCost: 40,
                    duration: 3,
                    damage: 1,
                    freeCells: true,
                    straigthLine: false,
                    diagonal: false,
                    areaOfEffect: 1,
                    minRange: 0,
                    maxRange: 0,
                    modifiableRange: false,
                    lineOfSight: false,
                    cooldown: 4,
                    castsPerTurn: 1,
                    conditionsRequirements: {
                    }
                },
                castCounter: 0
            },
            forceStaff: {
                id: "forceStaff",
                name: "Force Staff",
                cast: (position) => {
                    this._addTargetSpellConditions(this.spells.forceStaff, position)
                },
                castEffect: (target, spell) => {
                    const direction = getPushbackDirection(this.player, target)
                    const pushbackDamage = pushBackInStraightLine(target, direction, 2) * spell.spellInfo.pushbackDamage // Distance: 2
                    const modifiedDamage = spell.spellInfo.damage + pushbackDamage
                    
                    target.class.combatstats.currentHp -= modifiedDamage
                    
                    return modifiedDamage
                },
                spellInfo: {
                    learned: true,
                    canBeCast: true,
                    type: "damage",
                    manaCost: 40,
                    damage: 10,
                    pushbackDamage: 10,
                    freeCells: false,
                    straigthLine: true,
                    diagonal: false,
                    areaOfEffect: 1,
                    minRange: 1,
                    maxRange: 3,
                    modifiableRange: false,
                    lineOfSight: false,
                    cooldown: 1,
                    castsPerTurn: 1,
                    conditionsRequirements: {
                        disarmed: true,
                    }
                },
                castCounter: 0
            },
            snowstorm: {
                id: "snowstorm",
                name: "Snowstorm",
                cast: (position) => {
                    this._addTargetSpellConditions(this.spells.snowstorm, position)
                },
                castEffect: (position, spell) => {
                    // ADD EFFECT
                    const {duration} = spell.spellInfo
                    addSquareGlyph(this.player, position.y+1 ? position : position.position, spell)// The ternery is needed because position can sometimes be a player or npc

                    Game._addNewCombatEffect(this.player, position, spell, duration)
                },
                applyEffect: (effect) => {
                    removeGlyph(this.player, effect.spell.spellInfo.glyphNumber)
                },
                activateGlyph: (target) => {
                    const {damage, type} = this.spells.snowstorm.spellInfo
                    const modifiedDamage = Math.floor(damage * calculateMagicalDamageModifiers(this, target, "frost"))
                    
                    target.class.combatstats.currentHp -= modifiedDamage

                    handleSpellDamageEffectAnimation(target, modifiedDamage, type)
                },
                spellInfo: {
                    learned: true,
                    canBeCast: true,
                    type: "damage",
                    manaCost: 40,
                    damage: 25,
                    size: 1,
                    glyphNumber: 1,
                    duration: 2,
                    freeCells: true,
                    straigthLine: false,
                    diagonal: false,
                    minRange: 1,
                    maxRange: 3,
                    modifiableRange: false,
                    lineOfSight: false,
                    cooldown: 1,
                    castsPerTurn: 1,
                    conditionsRequirements: {
                        silenced: true,
                    }
                },
                castCounter: 0
            },
            inspire: {
                id: "inspire",
                name: "Inspire",
                cast: (position) => {
                    this._addTargetSpellConditions(this.spells.inspire, position)
                },
                castEffect: (target, spell) => {
                    target.class.damageModifiers.offensive.allDamage += 0.2

                    for(let i = 1; i <= spell.spellInfo.duration; i++){
                        Game._addNewCombatEffect(this.player, target, spell, i)
                    }
                },
                applyEffect: (effect) => {
                    let modifiedDamage = Math.floor(effect.spell.spellInfo.damage * calculateHealingModifiers(this, effect.target))
                    
                    effect.target.class.combatstats.currentHp += modifiedDamage
                    if(effect.target.class.combatstats.currentHp > effect.target.class.combatstats.hp){
                        effect.target.class.combatstats.currentHp = effect.target.class.combatstats.hp
                    }

                    handleSpellDamageEffectAnimation(effect.target, modifiedDamage, effect.spell.spellInfo.type)
                    if(effect.executeEffect == 2){
                        effect.target.class.damageModifiers.offensive.allDamage -= 0.2
                    }
                },
                spellInfo: {
                    learned: true,
                    canBeCast: true,
                    type: "healing",
                    duration: 2,
                    manaCost: 40,
                    damage: 25,
                    freeCells: true,
                    straigthLine: false,
                    diagonal: false,
                    areaOfEffect: 1,
                    minRange: 1,
                    maxRange: 3,
                    modifiableRange: false,
                    lineOfSight: false,
                    cooldown: 1,
                    castsPerTurn: 1,
                    conditionsRequirements: {
                        silenced: true,
                    }
                },
                castCounter: 0
            },
        }
    }

    _addTargetSpellConditions(spell, position){
        if(checkIfSpellIsCastable(this, spell)) return console.log("Cant be cast")
        
        spell.castCounter += 1
        this._checkIfNewSpellIsLearned(spell)
        
        let target = Game._getUnitByPosition(position)
        if(!target && !spell.spellInfo.glyphNumber) return console.log("No target")
        
        this.combatstats.currentMana -= spell.spellInfo.manaCost
        
        let modifiedDamage = spell.castEffect(target ? target : position, spell)

        if(modifiedDamage){
            handleSpellDamageEffectAnimation(target, modifiedDamage, spell.spellInfo.type)
        }
        updateCurrentManaBar(this.player)

        if(target?.newPosition){
            target.position = {...target.newPosition}
            target.newPosition = false
        }

        if(noviceSpellAnimations[spell.id]) noviceSpellAnimations[spell.id](target, this.player)
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
        } else {
            return // THIS IS IMPORTANT!!!!
        }

        this.spells[taughtSpell].spellInfo.learned = true
        this.spells[taughtSpell].spellInfo.canBeCast = true
    }
}