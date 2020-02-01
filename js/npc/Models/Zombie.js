class Zombie {
    constructor(){
        this.className = "zombie"
        this.cssString = "zombie-cpu-player-area"
        this.cssPlayerPanelString = "zombie-cpu-combat-timeline-panel"
        this.combatStyle = "aggressive"

        this.combatstats = {
            hp: 100,
            currentHp: 100,
            mana: 40,
            currentMana: 40,
            initiation: 50,
            maxMovementPoints: 3,
            currentMovementPoints: 3,
        }

        this.spells = {
            bite: {
                id: "bite",
                name: "Bite",
                cast: (target) => {
                    target.class.combatstats.hp -= this.spells.bite.spellInfo.damage
                },
                spellInfo: {
                    canBeCast: true,
                    aiWeight: 5,
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
                }
            },
            spit: {
                id: "spit",
                name: "Spit",
                cast: () => {

                },
                spellInfo: {
                    canBeCast: true,
                    aiWeight: 1,
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
                }
            },
        }
    }
}