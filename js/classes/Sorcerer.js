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
}