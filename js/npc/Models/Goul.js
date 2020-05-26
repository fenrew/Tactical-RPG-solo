class Goul extends BaseClass {
  constructor() {
    super();
    this.className = "goul";
    this.cssString = "goul-npc-player-area";
    this.cssPlayerPanelString = "goul-npc-combat-timeline-panel";
    this.player = "";

    this.cooldowns = []; // An array of all spells that are on cooldown
    this.taunted = false; // The player class of whoever taunted you

    this.dropTable = {
      coins: [20, 60],
      items: [weaponDropList.boneClub],
    };

    this.ai = new NewAggressiveAi();

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
      ravege: {
        id: "ravege",
        name: "Ravege",
        cast: (position, player) => {
          player._addTargetSpellConditions(player.spells.ravege, position);
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
          aiWeight: 10,
          type: "damage",
          source: "physical-melee",
          manaCost: 25,
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
          castsPerTarget: 2,
          conditionsRequirements: {
            disarmed: true,
          },
        },
        userSpellInfo: {
          learned: true,
          canBeCast: true,
          currentCooldown: 0,
          currentCastsPerTurn: 0,
        },
        category: "ravege",
        toLearn: 0,
        castCounter: 0,
      },

      infection: {
        id: "infection",
        name: "Infection",
        cast: (position, player) => {
          player._addTargetSpellConditions(player.spells.infection, position);
        },
        castEffect: (target, spell, player) => {
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
          aiWeight: 5,
          type: "damage",
          source: "physical-melee",
          manaCost: 30,
          damage: 15,
          dotDamage: 20,
          duration: 4,
          freeCells: false,
          straigthLine: true,
          diagonal: false,
          areaOfEffect: 1,
          minRange: 1,
          maxRange: 5,
          modifiableRange: false,
          lineOfSight: false,
          cooldown: 2,
          castsPerTurn: 2,
          castsPerTarget: 2,
          conditionsRequirements: {
            disarmed: true,
          },
        },
        userSpellInfo: {
          learned: true,
          canBeCast: true,
          currentCooldown: 0,
          currentCastsPerTurn: 0,
        },
        category: "infection",
        toLearn: 0,
        castCounter: 0,
      },
    };
  }

  _checkIfPromotionToNewClass = () => {};
}
