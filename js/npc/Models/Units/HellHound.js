class HellHound extends BaseClass {
  constructor() {
    super();
    this.className = "hellHound";
    this.cssString = "hell-hound-npc-player-area";
    this.cssPlayerPanelString = "hell-hound-npc-combat-timeline-panel";
    this.player = "";

    this.cooldowns = []; // An array of all spells that are on cooldown
    this.taunted = false; // The player class of whoever taunted you

    this.ai = new NewAggressiveAi();

    this.dropTable = {
      coins: [70, 90],
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
      hp: 600,
      currentHp: 600,
      mana: 90,
      currentMana: 90,
      initiation: 380,
      maxMovementPoints: 8,
      currentMovementPoints: 8,
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
      fireball: {
        id: "fireball",
        name: "Fireball",
        cast: (position, player) => {
          player._addTargetSpellConditions(player.spells.fireball, position);
        },
        castEffect: (target, spell, player) => {
          const { damage, duration } = spell.spellInfo;

          let modifiedDamage = Math.floor(
            damage *
              calculateMagicalDamageModifiers(player.player, target, "fire")
          );
          target.class.combatstats.currentHp -= modifiedDamage;

          for (let i = 1; i <= duration; i++) {
            Game._addNewCombatEffect(this.player, target, spell, i);
          }

          return modifiedDamage;
        },
        applyEffect: (effect) => {
          const { dotDamage, type } = effect.spell.spellInfo;
          const { player, target } = effect;
          const modifiedDamage = Math.floor(
            dotDamage *
              calculateMagicalDamageModifiers(player.player, target, "fire")
          );

          target.class.combatstats.currentHp -= modifiedDamage;

          handleSpellDamageEffectAnimation(target, modifiedDamage, type);
        },
        spellInfo: {
          aiWeight: 5,
          type: "damage",
          source: "fire",
          manaCost: 40,
          damage: 50,
          dotDamage: 20,
          duration: 2,
          freeCells: true,
          straigthLine: false,
          diagonal: false,
          areaOfEffect: 1,
          minRange: 1,
          maxRange: 10,
          modifiableRange: false,
          lineOfSight: false,
          cooldown: 1,
          castsPerTurn: 1,
          castsPerTarget: 1,
          conditionsRequirements: {
            silenced: true,
          },
        },
        userSpellInfo: {
          learned: true,
          canBeCast: true,
          currentCooldown: 0,
          currentCastsPerTurn: 0,
        },
        category: "fireball",
        toLearn: 0,
        castCounter: 0,
      },
      hellBite: {
        id: "hellBite",
        name: "Hell Bite",
        cast: (position, player) => {
          player._addTargetSpellConditions(player.spells.hellBite, position);
        },
        castEffect: (target, spell, player) => {
          const { combatstats } = target.class;
          let modifiedDamage = Math.floor(
            ((combatstats.currentHp * spell.spellInfo.damagePercent) / 100) *
              calculateMagicalDamageModifiers(player.player, target, "fire")
          );
          combatstats.currentHp -= modifiedDamage;

          return modifiedDamage;
        },
        spellInfo: {
          aiWeight: 10,
          type: "damage",
          source: "fire",
          manaCost: 30,
          damage: 55,
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
        category: "hellBite",
        toLearn: 0,
        castCounter: 0,
      },
      leaderOfThePack: {
        id: "leaderOfThePack",
        name: "Leader of the Pack",
        cast: (position, player) => {
          player._addTargetSpellConditions(
            player.spells.leaderOfThePack,
            position
          );
        },
        castEffect: (target, spell, player) => {
          // Add a damage buff or something to all enemies
        },
        spellInfo: {
          aiWeight: 10,
          type: "damage",
          source: "fire",
          manaCost: 30,
          damage: 55,
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
        category: "leaderOfThePack",
        toLearn: 0,
        castCounter: 0,
      },
    };
  }

  _checkIfPromotionToNewClass = () => {};
}
