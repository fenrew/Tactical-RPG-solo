class DemonHound extends BaseClass {
  constructor() {
    super();
    this.className = "demonHound";
    this.cssString = "demon-hound-npc-player-area";
    this.cssPlayerPanelString = "demon-hound-npc-combat-timeline-panel";
    this.player = "";

    this.cooldowns = []; // An array of all spells that are on cooldown
    this.taunted = false; // The player class of whoever taunted you

    this.ai = new NewAggressiveAi();

    this.dropTable = {
      coins: [40, 60],
      items: [
        weaponDropList.swordOfTheBrotherhood,
        weaponDropList.staffOfFire,
        legsDropList.raggedPants,
        legsDropList.leggingsOfTheOld,
        helmetDropList.coifOfTheOld,
        helmetDropList.boneStrapedBoots,
        chestDropList.bonePlate,
        shoulderDropList.plaguedPauldrons,
      ],
    };

    this.combatstats = {
      hp: 400,
      currentHp: 400,
      mana: 60,
      currentMana: 60,
      initiation: 300,
      maxMovementPoints: 6,
      currentMovementPoints: 6,
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
      poisonousBite: {
        id: "poisonousBite",
        name: "Poisonous Bite",
        cast: (position, player) => {
          player._addTargetSpellConditions(
            player.spells.poisonousBite,
            position
          );
        },
        castEffect: (target, spell, player) => {
          const { damage, duration } = spell.spellInfo;

          let modifiedDamage = Math.floor(
            damage *
              calculatePhysicalMeleeDamageModifiers(player.player, target)
          );
          target.class.combatstats.currentHp -= modifiedDamage;

          for (let i = 1; i <= duration; i++) {
            Game._addNewCombatEffect(this.player, target, spell, i);
          }

          return modifiedDamage;
        },
        applyEffect: (effect) => {
          const { dotDamage, type } = effect.spell.spellInfo;
          const modifiedDamage = dotDamage * effect.executeRound;

          effect.target.class.combatstats.currentHp -= modifiedDamage;

          handleSpellDamageEffectAnimation(effect.target, modifiedDamage, type);
        },
        spellInfo: {
          aiWeight: 10,
          type: "damage",
          source: "physical-melee",
          manaCost: 25,
          damage: 25,
          dotDamage: 20,
          duration: 3,
          freeCells: true,
          straigthLine: false,
          diagonal: false,
          areaOfEffect: 1,
          minRange: 1,
          maxRange: 1,
          modifiableRange: false,
          lineOfSight: false,
          cooldown: 2,
          castsPerTurn: 1,
          castsPerTarget: 1,
          conditionsRequirements: {},
        },
        userSpellInfo: {
          learned: true,
          canBeCast: true,
          currentCooldown: 0,
          currentCastsPerTurn: 0,
        },
        category: "poisionousClaw",
        toLearn: 0,
        castCounter: 0,
      },
      demonClaws: {
        id: "demonClaws",
        name: "Demon Claws",
        cast: (position, player) => {
          player._addTargetSpellConditions(player.spells.demonClaws, position);
        },
        castEffect: (target, spell, player) => {
          const { combatstats } = target.class;
          let modifiedDamage = Math.floor(
            ((combatstats.currentHp * spell.spellInfo.damagePercent) / 100) *
              calculatePhysicalMeleeDamageModifiers(this.player, target)
          );
          combatstats.currentHp -= modifiedDamage;

          return modifiedDamage;
        },
        spellInfo: {
          aiWeight: 5,
          type: "damage",
          source: "physical-melee",
          manaCost: 40,
          damage: 1,
          damagePercent: 20,
          freeCells: true,
          straigthLine: false,
          diagonal: false,
          areaOfEffect: 1,
          minRange: 1,
          maxRange: 1,
          modifiableRange: false,
          lineOfSight: false,
          cooldown: 1,
          castsPerTurn: 1,
          castsPerTarget: 1,
          conditionsRequirements: {},
        },
        userSpellInfo: {
          learned: true,
          canBeCast: true,
          currentCooldown: 0,
          currentCastsPerTurn: 0,
        },
        category: "demonClaws",
        toLearn: 0,
        castCounter: 0,
      },
    };
  }

  _checkIfPromotionToNewClass = () => {};
}
