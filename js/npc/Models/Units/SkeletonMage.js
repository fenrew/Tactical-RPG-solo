class SkeletonMage extends BaseClass {
  constructor() {
    super();
    this.className = "skeleton mage";
    this.cssString = "skeleton-mage-npc-player-area";
    this.cssPlayerPanelString = "skeleton-mage-npc-combat-timeline-panel";
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
      hp: 150,
      currentHp: 150,
      mana: 140,
      currentMana: 140,
      initiation: 80,
      maxMovementPoints: 3,
      currentMovementPoints: 3,
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
      fireBolt: {
        id: "fireBolt",
        name: "Fire Bolt",
        cast: (position, player) => {
          player._addTargetSpellConditions(player.spells.fireBolt, position);
        },
        castEffect: (target, spell, player) => {
          let modifiedDamage = Math.floor(
            spell.spellInfo.damage *
              calculateMagicalDamageModifiers(player.player, target, "fire")
          );
          target.class.combatstats.currentHp -= modifiedDamage;
          return modifiedDamage;
        },
        spellInfo: {
          aiWeight: 5,
          type: "damage",
          source: "fire",
          manaCost: 40,
          damage: 40,
          freeCells: true,
          straigthLine: false,
          diagonal: false,
          areaOfEffect: 1,
          minRange: 1,
          maxRange: 8,
          modifiableRange: false,
          lineOfSight: false,
          cooldown: 1,
          castsPerTurn: 2,
          castsPerTarget: 2,
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
        category: "fireBolt",
        toLearn: 0,
        castCounter: 0,
      },

      permaFrost: {
        id: "permaFrost",
        name: "Perma Frost",
        cast: (position, player) => {
          player._addTargetSpellConditions(player.spells.permaFrost, position);
        },
        castEffect: (target, spell, player) => {
          const { mpRemoval, damage } = spell.spellInfo;
          const { combatstats } = target.class;

          let modifiedDamage = Math.floor(
            damage *
              calculateMagicalDamageModifiers(this.player, target, "frost")
          );
          combatstats.currentHp -= modifiedDamage;
          combatstats.currentMovementPoints -= mpRemoval;

          handleSpellDamageEffectAnimation(target, mpRemoval, "mp");

          return modifiedDamage;
        },
        spellInfo: {
          aiWeight: 15,
          mpRemoval: 3,
          type: "damage",
          source: "frost",
          manaCost: 30,
          damage: 5,
          freeCells: false,
          straigthLine: true,
          diagonal: false,
          areaOfEffect: 1,
          minRange: 3,
          maxRange: 5,
          modifiableRange: false,
          lineOfSight: false,
          cooldown: 3,
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
        category: "permaFrost",
        toLearn: 0,
        castCounter: 0,
      },
    };
  }

  _checkIfPromotionToNewClass = () => {};
}
