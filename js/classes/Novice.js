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
            weapon: {
                twoHandedSword: true,
                mace: false,
                dualWield: false,
                shield: false,
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
                    target.class.combatstats.currentHp -= spell.spellInfo.damage
                },
                spellInfo: {
                    learned: true,
                    canBeCast: true,
                    type: "damage",
                    manaCost: 20,
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
                    target.class.combatstats.currentHp -= spell.spellInfo.damage
                },
                spellInfo: {
                    learned: true,
                    canBeCast: true,
                    type: "damage",
                    manaCost: 30,
                    damage: 20,
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
                    target.class.combatstats.currentHp -= spell.spellInfo.damage
                    target.class.combatstats.currentMovementPoints -= 1
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
                    target.class.combatstats.currentHp += spell.spellInfo.damage
                    if(target.class.combatstats.currentHp > target.class.combatstats.hp){
                        target.class.combatstats.currentHp = target.class.combatstats.hp
                    }
                },
                spellInfo: {
                    learned: true,
                    canBeCast: true,
                    type: "healing",
                    manaCost: 20,
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
                    //ADD EFFECT
                },
                spellInfo: {
                    learned: false,
                    canBeCast: false,
                    type: "buff",
                    manaCost: 40,
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

                    // ADD PUSHBACK
                    target.class.combatstats.currentHp -= spell.spellInfo.damage
                },
                spellInfo: {
                    learned: false,
                    canBeCast: false,
                    type: "damage",
                    manaCost: 40,
                    damage: 25,
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
                castEffect: (target, spell) => {
                    // ADD EFFECT
                },
                spellInfo: {
                    learned: false,
                    canBeCast: false,
                    type: "damage",
                    manaCost: 40,
                    damage: 25,
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
            inspire: {
                id: "inspire",
                name: "Inspire",
                cast: (position) => {
                    this._addTargetSpellConditions(this.spells.inspire, position)
                },
                castEffect: (target, spell) => {
                    // ADD EFFECT
                },
                spellInfo: {
                    learned: false,
                    canBeCast: false,
                    type: "healing",
                    manaCost: 40,
                    damage: 25,
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
        }
    }

    _addTargetSpellConditions(spell, position){
        if(checkIfSpellIsCastable(this, spell)) return console.log("Cant be cast")
        
        spell.castCounter += 1
        this._checkIfNewSpellIsLearned(spell)
        
        let target = Game._getUnitByPosition(position)
        if(!target) return console.log("No target")
        
        this.combatstats.currentMana -= spell.spellInfo.manaCost

        spell.castEffect(target, spell)

        handleSpellDamageEffectAnimation(target, spell.spellInfo.damage, spell.spellInfo.type)
        updateCurrentManaBar(this.player)
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
        console.log("TAuIGHT",this.spells[taughtSpell].spellInfo.learned)
    }
}