const warriorSpellObject = {
    slash: {
        id: "slash",
        name: "Slash",
        cast: (position, player) => {
          player._addTargetSpellConditions(player.spells.slash, position, 2);
        },
        castEffect: (target, spell, player) => {
          let modifiedDamage = Math.floor(
            spell.spellInfo.damage *
              calculatePhysicalMeleeDamageModifiers(player.player, target)
          );
          target.class.combatstats.currentHp -= modifiedDamage;
          return modifiedDamage;
        },
        spellInfo: {
          learned: true,
          canBeCast: true,
          type: "damage",
          source: "physical-melee",
          manaCost: 30,
          damage: 20,
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
        },
        category: "warrior",
        toLearn: 0,
        castCounter: 0,
      },
};