const noviceSpellObject = {
    rend:  {
        id: "rend",
        name: "Rend",
        cast: (position, player) => {
            player._addTargetSpellConditions(player.spells.rend, position)
        },
        castEffect: (target, spell, player) => {
            let modifiedDamage = Math.floor(spell.spellInfo.damage * calculatePhysicalMeleeDamageModifiers(player, target))
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
        castCounter: 0
    },
    slam: {
        id: "slam",
        name: "Slam",
        cast: (position, player) => {
            player._addTargetSpellConditions(player.spells.slam, position)
        },
        castEffect: (target, spell, player) => {
            let modifiedDamage = Math.floor(spell.spellInfo.damage * calculatePhysicalMeleeDamageModifiers(player, target))
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
            },
            category: "warrior"
        },
        castCounter: 0
    },
    throwStaff: {
        id: "throwStaff",
        name: "Throw Staff",
        cast: (position, player) => {
            player._addTargetSpellConditions(player.spells.throwStaff, position)
        },
        castEffect: (target, spell, player) => {
            let modifiedDamage = Math.floor(spell.spellInfo.damage * calculatePhysicalRangedDamageModifiers(player, target))
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
            },
            category: "ranger"
        },
        castCounter: 0
    },
    conjureFrost: {
        id: "conjureFrost",
        name: "Conjure Frost",
        cast: (position, player) => {
            player._addTargetSpellConditions(player.spells.conjureFrost, position)
        },
        castEffect: (target, spell, player) => {
            let tCombatstats = target.class.combatstats

            let modifiedDamage = Math.floor(spell.spellInfo.damage * calculateMagicalDamageModifiers(player, target, "frost"))
            console.log(calculateMagicalDamageModifiers(player, target, "frost"))
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
            },
            category: "sorcerer"
        },
        castCounter: 0
    },
    heal: {
        id: "heal",
        name: "Heal",
        cast: (position, player) => {
            player._addTargetSpellConditions(player.spells.heal, position)
        },
        castEffect: (target, spell, player) => {
            let modifiedDamage = Math.floor(spell.spellInfo.damage * calculateHealingModifiers(player, target))
            
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
            },
            category: "priest"
        },
        castCounter: 0
    },
    defensiveStance: {
        id: "defensiveStance",
        name: "Defensive Stance",
        cast: (position, player) => {
            player._addTargetSpellConditions(player.spells.defensiveStance, position)
        },
        castEffect: (target, spell, player) => {
            target.class.damageModifiers.defensive.physicalDamage.allDamage -= 0.2
            target.class.damageModifiers.offensive.magicalDamage.allDamage -= 0.2

            Game._addNewCombatEffect(player.player, target, spell, spell.spellInfo.duration)
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
            },
            category: "warrior"
        },
        castCounter: 0
    },
    forceStaff: {
        id: "forceStaff",
        name: "Force Staff",
        cast: (position, player) => {
            player._addTargetSpellConditions(player.spells.forceStaff, position)
        },
        castEffect: (target, spell, player) => {
            const direction = getPushbackDirection(player.player, target)
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
            },
            category: "ranger"
        },
        castCounter: 0
    },
    snowstorm: {
        id: "snowstorm",
        name: "Snowstorm",
        cast: (position, player) => {
            player._addTargetSpellConditions(player.spells.snowstorm, position)
        },
        castEffect: (position, spell, player) => {
            // ADD EFFECT
            const {duration} = spell.spellInfo
            addSquareGlyph(player.player, position.y+1 ? position : position.position, spell)// The ternery is needed because position can sometimes be a player or npc

            Game._addNewCombatEffect(player.player, position, spell, duration)
        },
        applyEffect: (effect) => {
            removeGlyph(effect.player, effect.spell.spellInfo.glyphNumber)
        },
        activateGlyph: (target, player) => {
            const {damage, type} = player.spells.snowstorm.spellInfo
            const modifiedDamage = Math.floor(damage * calculateMagicalDamageModifiers(player, target, "frost"))
            
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
            },
            category: "sorcerer"
        },
        castCounter: 0
    },
    inspire: {
        id: "inspire",
        name: "Inspire",
        cast: (position, player) => {
            player._addTargetSpellConditions(player.spells.inspire, position)
        },
        castEffect: (target, spell, player) => {
            target.class.damageModifiers.offensive.allDamage += 0.2

            for(let i = 1; i <= spell.spellInfo.duration; i++){
                Game._addNewCombatEffect(player.player, target, spell, i)
            }
        },
        applyEffect: (effect, player) => {
            let modifiedDamage = Math.floor(effect.spell.spellInfo.damage * calculateHealingModifiers(player, effect.target))
            
            effect.target.class.combatstats.currentHp += modifiedDamage
            if(effect.target.class.combatstats.currentHp > effect.target.class.combatstats.hp){
                effect.target.class.combatstats.currentHp = effect.target.class.combatstats.hp
            }

            handleSpellDamageEffectAnimation(effect.target, modifiedDamage, effect.spell.spellInfo.type)
            if(effect.executeRound == 2){
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
            },
            category: "priest"
        },
        castCounter: 0
    },
}