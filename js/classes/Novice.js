class Novice {
    constructor(){
        this.className = "Novice"
        this.cssString = "novice-player-area"
        this.cssPlayerPanelString = "novice-class-player-panel"

        this.combatstats = {
            hp: 400,
            currentHp: 400,
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
                cast: (target) => {
                    if(!checkIfSpellIsCastable(this)) return console.log("Cant be cast")
                    target.class.combatstats.hp -= this.spells.slam.spellInfo.damage
                },
                spellInfo: {
                    canBeCast: true,
                    manaCost: 20,
                    damage: 25,
                    freeCells: true,
                    straigthLine: false,
                    diagonal: false,
                    areaOfEffect: 1,
                    maxRange: 1,
                    minRange: 1,
                    modifiableRange: false,
                    lineOfSight: false,
                    cooldown: false,
                    castsPerTurn: 2,
                    conditionsRequirements: {
                        disarmed: true,
                    }
                }
            },
            throwStaff: {
                id: "throwStaff",
                name: "Throw Staff",
                cast: (target) => {
                    if(checkIfSpellIsCastable(this)) return console.log("Cant be cast")

                    target.class.combatstats.hp -= this.spells.throwStaff.spellInfo.damage
                },
                spellInfo: {
                    canBeCast: true,
                    manaCost: 20,
                    damage: 10,
                    freeCells: true,
                    straigthLine: false,
                    diagonal: false,
                    areaOfEffect: 1,
                    maxRange: 1,
                    minRange: 1,
                    modifiableRange: false,
                    lineOfSight: false,
                    cooldown: 1,
                    castsPerTurn: 1,
                    conditionsRequirements: {
                        disarmed: true,
                    }
                }
            },
        }
    }
}