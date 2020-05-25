class Zombie {
  constructor() {
    this.className = "zombie";
    this.cssString = "zombie-npc-player-area";
    this.cssPlayerPanelString = "zombie-npc-combat-timeline-panel";
    this.player = "";

    this.cooldowns = []; // An array of all spells that are on cooldown
    this.taunted = false; // The player class of whoever taunted you

    this.dropTable = {
      coins: [20, 60],
      items: [weaponDropList.boneClub],
    };

    this.ai = new AggressiveAi();

    this.combatstats = {
      hp: 100,
      currentHp: 20,
      mana: 55,
      currentMana: 55,
      initiation: 120,
      maxMovementPoints: 4,
      currentMovementPoints: 4,
    };

    this.conditions = {
      silenced: false,
      disarmed: false,
      onAttack: [],
      onDefense: [],
    };

    this.modifiers = {
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
      },
    };

    this.spells = {
      bite: {
        id: "bite",
        name: "Bite",
        cast: (target) => {
          let modifiedDamage = Math.floor(
            this.spells.bite.spellInfo.damage *
              calculatePhysicalMeleeDamageModifiers(this.player, target)
          );
          target.class.combatstats.currentHp -= modifiedDamage;
          handleSpellDamageEffectAnimation(target, modifiedDamage, "damage");
        },
        spellInfo: {
          canBeCast: true,
          source: "physical-melee",
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
          cooldown: 1,
          castsPerTurn: 2,
        },
      },
      spit: {
        id: "spit",
        name: "Spit",
        cast: (target) => {
          let modifiedDamage = Math.floor(
            this.spells.spit.spellInfo.damage *
              calculatePhysicalRangedDamageModifiers(this.player, target)
          );
          target.class.combatstats.currentHp -= modifiedDamage;
          handleSpellDamageEffectAnimation(target, modifiedDamage, "damage");
        },
        spellInfo: {
          canBeCast: true,
          source: "physical-ranged",
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
        },
      },
    };
  }
}
