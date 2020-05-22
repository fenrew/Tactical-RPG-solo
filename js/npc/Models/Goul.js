class Goul {
  constructor() {
    this.className = "goul";
    this.cssString = "goul-cpu-player-area";
    this.cssPlayerPanelString = "goul-cpu-combat-timeline-panel";
    this.player = "";

    this.cooldowns = []; // An array of all spells that are on cooldown

    this.ai = new AggressiveAi();

    this.combatstats = {
      hp: 200,
      currentHp: 200,
      mana: 70,
      currentMana: 70,
      initiation: 150,
      maxMovementPoints: 5,
      currentMovementPoints: 5,
    };

    this.conditions = {
      silenced: false,
      disarmed: false,
      onAttack: [],
      onDefense: [],
    };

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
      },
    };

    this.spells = {
      ravege: {
        id: "ravege",
        name: "Ravege",
        cast: (target) => {
          let modifiedDamage = Math.floor(
            this.spells.ravege.spellInfo.damage *
              calculatePhysicalMeleeDamageModifiers(this.player, target)
          );
          target.class.combatstats.currentHp -= modifiedDamage;
          handleSpellDamageEffectAnimation(target, modifiedDamage, "damage");
        },
        spellInfo: {
          canBeCast: true,
          source: "physical-melee",
          aiWeight: 5,
          manaCost: 30,
          damage: 40,
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
      infection: {
        id: "infection",
        name: "Infection",
        cast: (target) => {
          const spell = this.spells.infection;
          let modifiedDamage = Math.floor(
            spell.spellInfo.damage *
              calculatePhysicalRangedDamageModifiers(this.player, target)
          );
          target.class.combatstats.currentHp -= modifiedDamage;

          for (let i = 1; i <= spell.spellInfo.duration; i++) {
            Game._addNewCombatEffect(this.player, target, spell, i);
          }

          handleSpellDamageEffectAnimation(target, modifiedDamage, "damage");
        },
        applyEffect: (effect) => {
          const modifiedDamage = effect.spell.spellInfo.dotDamage;

          effect.target.class.combatstats.currentHp -= modifiedDamage;

          handleSpellDamageEffectAnimation(
            effect.target,
            modifiedDamage,
            effect.spell.spellInfo.type
          );
        },
        spellInfo: {
          canBeCast: true,
          source: "physical-melee",
          aiWeight: 10,
          manaCost: 50,
          damage: 10,
          dotDamage: 20,
          duration: 3,
          freeCells: true,
          straigthLine: false,
          diagonal: false,
          areaOfEffect: 1,
          minRange: 2,
          maxRange: 4,
          modifiableRange: false,
          lineOfSight: false,
          cooldown: 3,
          castsPerTurn: 1,
        },
      },
    };
  }
}
