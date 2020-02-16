class Zombie {
    constructor(){
        this.className = "zombie"
        this.cssString = "zombie-cpu-player-area"
        this.cssPlayerPanelString = "zombie-cpu-combat-timeline-panel"
        this.combatStyle = "aggressive"

        this.combatstats = {
            hp: 100,
            currentHp: 100,
            mana: 55,
            currentMana: 55,
            initiation: 50,
            maxMovementPoints: 4,
            currentMovementPoints: 4,
        }

        this.spells = {
            bite: {
                id: "bite",
                name: "Bite",
                cast: (target) => {
                    target.class.combatstats.currentHp -= this.spells.bite.spellInfo.damage
                    handleSpellDamageEffectAnimation(target, this.spells.bite.spellInfo.damage, "damage")
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
                    minRange: 1,
                    maxRange: 1,
                    modifiableRange: false,
                    lineOfSight: false,
                    cooldown: false,
                    castsPerTurn: 2,
                }
            },
            spit: {
                id: "spit",
                name: "Spit",
                cast: (target) => {
                    target.class.combatstats.currentHp -= this.spells.spit.spellInfo.damage
                    handleSpellDamageEffectAnimation(target, this.spells.spit.spellInfo.damage, "damage")
                },
                spellInfo: {
                    canBeCast: true,
                    aiWeight: 1,
                    manaCost: 15,
                    damage: 10,
                    freeCells: true,
                    straigthLine: false,
                    diagonal: false,
                    areaOfEffect: 1,
                    minRange: 2,
                    maxRange: 4,
                    modifiableRange: false,
                    lineOfSight: false,
                    cooldown: 1,
                    castsPerTurn: 2,
                }
            },
        }
    }
}